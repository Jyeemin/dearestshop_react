import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import "./ProductDetail.css";

const ProductDetail = () => {

    // URL에서 상품 id 가져오기
    const { id } = useParams();

    // 상품 정보
    const [product, setProduct] = useState(null);

    // 선택한 사이즈
    const [selectedSize, setSelectedSize] = useState("");

    // 수량
    const [quantity, setQuantity] = useState(1);


    // 상품 상세 조회
    useEffect(() => {

        const getProduct = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:8080/api/products/${id}`
                );

                console.log("상품 상세:", response.data);

                setProduct(response.data.data);

            } catch (error) {

                console.error("상품 상세 조회 실패:", error);

            }

        };

        getProduct();

    }, [id]);


    // 상품을 아직 불러오지 않았을 때
    if (!product) {
        return (
            <div className="product-detail-loading">
                상품을 불러오는 중...
            </div>
        );
    }


    // 수량 감소
    const decreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };


    // 수량 증가
    const increaseQuantity = () => {

        setQuantity(quantity + 1);

    };


    // 총 가격
    const totalPrice = product.price * quantity;


    return (

        <div className="product-detail">


            {/* =================================
                왼쪽 : 상품 이미지
            ================================= */}

            <div className="product-detail-image">

                {product.Urls.map((url, index) => (

                    <img
                        key={index}
                        src={`http://localhost:8080${url}`}
                        alt={product.productName}
                    />

                ))}

            </div>



            {/* =================================
                오른쪽 : 상품 정보
            ================================= */}

            <div className="product-detail-info">


                {/* 상품명 + 하트 */}

                <div className="product-detail-title">

                    <h1>
                        {product.productName}
                    </h1>

                    <button className="detail-wishlist">
                        <FiHeart />
                    </button>

                </div>


                {/* 가격 */}

                <p className="detail-price">

                    ₩{product.price.toLocaleString()}

                </p>



                {/* =================================
                    상품 설명
                ================================= */}

                <div className="detail-description">

                    <p>
                        {product.detailDescription}
                    </p>

                </div>



                {/* =================================
                    사이즈
                ================================= */}

                <div className="detail-option">

                    <p className="option-title">
                        size
                    </p>


                    <div className="size-options">

                        {product.size.map((size) => (

                            <button
                                key={size}
                                className={
                                    selectedSize === size
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedSize(size)
                                }
                            >
                                {size}
                            </button>

                        ))}

                    </div>

                </div>



                {/* =================================
                    수량
                ================================= */}

                <div className="quantity-option">

                    <p className="option-title">
                        quantity
                    </p>


                    <div className="quantity-box">

                        <button
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>


                        <span>
                            {quantity}
                        </span>


                        <button
                            onClick={increaseQuantity}
                        >
                            +
                        </button>

                    </div>

                </div>



                {/* =================================
                    총 가격
                ================================= */}

                <div className="total-price">

                    <span>
                        TOTAL
                    </span>

                    <strong>
                        ₩{totalPrice.toLocaleString()}
                    </strong>

                </div>



                {/* =================================
                    버튼
                ================================= */}

                <div className="detail-buttons">

                    <button className="add-cart-button">
                        ADD TO CART
                    </button>


                    <button className="buy-button">
                        BUY NOW
                    </button>

                </div>



                {/* =================================
                    상품 안내
                ================================= */}

                <div className="product-guide">


                    <div className="guide-item">

                        <span>
                            PRODUCT INFO
                        </span>

                        <span>
                            +
                        </span>

                    </div>


                    <div className="guide-item">

                        <span>
                            SHIPPING INFO
                        </span>

                        <span>
                            +
                        </span>

                    </div>


                    <div className="guide-item">

                        <span>
                            EXCHANGE & RETURN
                        </span>

                        <span>
                            +
                        </span>

                    </div>


                </div>


            </div>

        </div>

    );

};

export default ProductDetail;