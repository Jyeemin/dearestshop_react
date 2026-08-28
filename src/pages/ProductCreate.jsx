import { useState } from "react";
import api from "../axios/api";
import "./ProductCreate.css";

const ProductCreate = () => {
  // -----------------------------
  // 상품 기본 정보
  // -----------------------------
  const [productName, setProductName] = useState("");
  const [detailDescription, setDetailDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sizes, setSizes] = useState("");

  // -----------------------------
  // 이미지 파일
  // -----------------------------
  const [images, setImages] = useState([]);

  // 대표 이미지의 index
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // -----------------------------
  // 이미지 선택
  // -----------------------------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    //배열처럼 생긴것은 진짜 배열로 바꿔주는것 Array.from

    setImages((prevImages) => [
      ...prevImages,
      ...files,
    ]);

    // 아무것도 선택하지 않았을 때
    if (images.length === 0 && files.length > 0) {
      setThumbnailIndex(0);
    }

    // 같은 파일을 다시 선택할 수 있도록 초기화
    e.target.value = "";
  };

  // -----------------------------
  // 이미지 삭제
  // -----------------------------
  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter(
        (_, imageIndex) => imageIndex !== index
      );
      // filter는 각 배열 요소를 검사하면서 값을 두개 알려준다 현재요소,index
      //fiter는 true인 요소만 남기고 false인 요소는 제거한다.

      return newImages;
    });

    // 삭제한 이미지가 썸네일이면
    if (index === thumbnailIndex) {
      setThumbnailIndex(0);
    }

    // 삭제된 이미지보다 뒤에 있던 썸네일
    // index를 하나 줄여준다.
    if (index < thumbnailIndex) {
      setThumbnailIndex((prev) => prev - 1);
    }
  };

  // -----------------------------
  // 대표 이미지 선택
  // -----------------------------
  const handleThumbnail = (index) => {
    setThumbnailIndex(index);
  };

  // -----------------------------
  // 상품 등록
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기본 검사
    if (!productName.trim()) {
      alert("상품명을 입력해주세요.");
      return;
    }

    if (!price) {
      alert("가격을 입력해주세요.");
      return;
    }

    if (!stockQuantity) {
      alert("재고를 입력해주세요.");
      return;
    }

    if (!categoryId) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (images.length === 0) {
      alert("상품 이미지를 등록해주세요.");
      return;
    }

    if(!sizes){
        alert("사이즈를 선택해주세요.");
        return;
    }

    // -----------------------------------------
    // 1. ProductCreateDto에 들어갈 데이터
    // -----------------------------------------
    const product = {
      productName: productName,
      detailDescription: detailDescription,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      sizes:sizes,
      categoryId: Number(categoryId),
    };

    console.log("상품 데이터:", product);
    console.log("categoryId:", categoryId);
    // -----------------------------------------
    // 2. 이미지 정보 생성
    // -----------------------------------------
    //
    // images[0] ↔ productInfoDtos[0]
    // images[1] ↔ productInfoDtos[1]
    //
    // 같은 index끼리 연결한다.
    //
    const productInfoDtos = images.map((_, index) => ({
      imageType:
        index === thumbnailIndex
          ? "THUMBNAIL"
          : "DETAIL",
      sortOrder: index,
    }));

    // -----------------------------------------
    // 3. FormData 생성
    // -----------------------------------------
    const formData = new FormData();

    // 상품 JSON
    formData.append(
      "product",
      new Blob(
        [JSON.stringify(product)],
        {
          type: "application/json",
        }
      )
    );

    // 이미지 파일 여러 개
    images.forEach((image) => {
      formData.append("images", image);
    });

    // 이미지 정보 JSON
    formData.append(
      "productInfoDtos",
      new Blob(
        [JSON.stringify(productInfoDtos)],
        {
          type: "application/json",
        }
      )
    );

    // -----------------------------------------
    // 4. Spring으로 전송
    // -----------------------------------------
    try {
      const response = await api.post(
        "http://localhost:8080/api/admin/product/new",
        formData
      );

      console.log("상품 등록 결과:", response.data);

      alert(
        `상품 등록 성공!\n상품 ID: ${response.data.data}`
      );

      // 입력값 초기화
      setProductName("");
      setDetailDescription("");
      setPrice("");
      setStockQuantity("");
      setSizes("");
      setCategoryId("");
      setImages([]);
      setThumbnailIndex(0);
    } catch (error) {
      console.error("상품 등록 실패:", error);

      if (error.response) {
        console.error(
          "서버 응답:",
          error.response.data
        );
      }

      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div className="product-create-page">

      <div className="product-create-container">

        {/* 페이지 제목 */}
        <div className="product-create-header">
          <h1>PRODUCT ADD</h1>
          <p>Add a new product</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* =========================
              상품 기본 정보
          ========================== */}
          <section className="product-section">

            <h2>PRODUCT INFO</h2>

            <div className="form-group">
              <label>PRODUCT NAME</label>

              <input
                type="text"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                placeholder="상품명을 입력해주세요"
              />
            </div>

            <div className="form-group">
              <label>DESCRIPTION</label>

              <textarea
                value={detailDescription}
                onChange={(e) =>
                  setDetailDescription(e.target.value)
                }
                placeholder="상품 설명을 입력해주세요"
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>PRICE</label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="39000"
                />
              </div>

              <div className="form-group">
                <label>STOCK</label>

                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) =>
                    setStockQuantity(e.target.value)
                  }
                  placeholder="10"
                />
              </div>

            </div>

            <div className="form-group">
              <label>CATEGORY</label>

              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value)
                }
              >
                <option value="">
                  카테고리를 선택해주세요
                </option>

                {/* 
                  현재는 테스트용으로 직접 작성.
                  나중에 Category API로 가져오면 된다.
                */}
                <option value="1">TOP</option>
                <option value="2">DRESS</option>
                <option value="3">BOTTOM</option>
                <option value="4">BAG</option>
              </select>
            </div>

          </section>

          <div className="product-size">

            

    <label>SIZE</label>

    <div className="size-buttons">

        <button
            type="button"
            className={sizes.includes("S") ? "selected" : ""}
            onClick={() => {
                if (sizes.includes("S")) {
                    setSizes(sizes.filter((size) => size !== "S"));
                } else {
                    setSizes([...sizes, "S"]);
                }
            }}
        >
            S
        </button>


        <button
            type="button"
            className={sizes.includes("M") ? "selected" : ""}
            onClick={() => {
                if (sizes.includes("M")) {
                    setSizes(sizes.filter((size) => size !== "M"));
                } else {
                    setSizes([...sizes, "M"]);
                }
            }}
        >
            M
        </button>


        <button
            type="button"
            className={sizes.includes("L") ? "selected" : ""}
            onClick={() => {
                if (sizes.includes("L")) {
                    setSizes(sizes.filter((size) => size !== "L"));
                } else {
                    setSizes([...sizes, "L"]);
                }
            }}
        >
            L
        </button>

    </div>

</div>


          {/* =========================
              이미지
          ========================== */}
          <section className="product-section">

            <h2>PRODUCT IMAGE</h2>

            <div className="image-upload-box">

              <label
                htmlFor="product-images"
                className="image-upload-button"
              >
                SELECT IMAGES
              </label>

              <input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              <p>
                JPG, PNG 이미지 여러 장을 선택할 수 있습니다.
              </p>

            </div>


            {/* 이미지 미리보기 */}
            {images.length > 0 && (
              <div className="image-list">
                //map을 이용해서 이미지 배열을 돌면서 각 이미지를 보여준다.
                {images.map((image, index) => (

                  <div
                    className={`image-card ${
                      index === thumbnailIndex
                        ? "thumbnail"
                        : ""
                    }`}
                    key={`${image.name}-${index}`}
                  >

                    <div className="image-preview">

                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                      />

                    </div>

                    <div className="image-card-info">

                      <p className="image-name">
                        {image.name}
                      </p>

                      {index === thumbnailIndex ? (
                        <span className="thumbnail-label">
                          THUMBNAIL
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="thumbnail-button"
                          onClick={() =>
                            handleThumbnail(index)
                          }
                        >
                          SET THUMBNAIL
                        </button>
                      )}

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() =>
                          handleRemoveImage(index)
                        }
                      >
                        REMOVE
                      </button>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </section>


          {/* =========================
              등록 버튼
          ========================== */}
          <button
            type="submit"
            className="product-submit-button"
          >
            ADD PRODUCT
          </button>

        </form>

      </div>

    </div>
  );
};

export default ProductCreate;