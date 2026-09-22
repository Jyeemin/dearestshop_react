import { useEffect, useState, useContext } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import "./Products.css";
import { Link, useSearchParams } from "react-router-dom";
import api from "../axios/api";
import { AuthContext } from "../context/AuthContext";

const Products = () => {

    const [searchParams] = useSearchParams();

    // URL의 ?keyword= 값을 가져온다.
    // 예: /products?keyword=ribbon
    // keyword → "ribbon"
    const keyword = searchParams.get("keyword");
    const categoryId = searchParams.get("categoryId");
    const sort = searchParams.get("sort");

    const { isLogin } = useContext(AuthContext);

    // --------------------------------
    // ① 상품 전체 저장
    // --------------------------------
    const [products, setProducts] = useState([]);

    // --------------------------------
    // ② 상품을 불러오는 중인지 확인
    // --------------------------------
    const [loading, setLoading] = useState(true);

    // --------------------------------
    // ③ 현재 페이지
    // --------------------------------
    const [currentPage, setCurrentPage] = useState(1);

    // 한 페이지에 9개
    const productsPerPage = 9;


    // --------------------------------
    // ④ 현재 페이지의 시작 위치
    // --------------------------------
    const startIndex =
        (currentPage - 1) * productsPerPage;


    // --------------------------------
    // ⑤ 현재 페이지에서 보여줄 상품
    // --------------------------------
    const currentProducts = products.slice(
        startIndex,
        startIndex + productsPerPage
    );


    // --------------------------------
    // ⑥ 전체 페이지 개수
    // --------------------------------
    const totalPages = Math.ceil(
        products.length / productsPerPage
    );


    // --------------------------------
    // ⑦ Spring에서 상품 가져오기
    // --------------------------------
    useEffect(() => {

        const getProducts = async () => {

            // 새로운 검색을 시작할 때
            setLoading(true);

            try {

                const response = await api.get(
                    "http://localhost:8080/api/products",
                    {
                        params: {
                            keyword: keyword || undefined,
                            categoryId: categoryId || undefined,
                            sort:sort || undefined
                        }
                    }
                );

                console.log("검색어:", keyword);
                console.log("상품 목록:", response.data);

                setProducts(response.data.data);

                // 검색어가 바뀌면 다시 1페이지부터
                setCurrentPage(1);

            } catch (error) {

                console.error(
                    "상품 목록 조회 실패:",
                    error
                );

                // 에러가 발생하면 상품을 비운다.
                setProducts([]);

            } finally {

                // API 요청이 끝났다는 뜻
                setLoading(false);

            }

        };

        getProducts();

    }, [keyword, categoryId, sort]);


    // --------------------------------
    // ⑧ 위시리스트 추가 / 삭제
    // --------------------------------
    const handleWishlist = async (product) => {

        // 로그인하지 않은 경우
        if (!isLogin) {
            alert("로그인 후 이용해주세요.");
            return;
        }

        try {

            // 아직 찜하지 않은 상품 → 추가
            // 이미 찜한 상품 → 삭제
            await api.post(
                `http://localhost:8080/api/wishlist/${product.productId}`
            );


            // 화면의 isWishlist 변경
            setProducts((prevProducts) =>
                prevProducts.map((item) =>
                    item.productId === product.productId
                        ? {
                            ...item,
                            isWishlist: !item.isWishlist
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(
                "위시리스트 처리 실패:",
                error
            );

            if (error.response) {

                alert(error.response.data.message);

            }

        }

    };


    return (

        <div className="products-container">

            <h1 className="products-title">
                SHOP ALL
            </h1>


            {/* --------------------------------
                ⑨ 상품 출력
            -------------------------------- */}

            <div className="product-grid">

                {/* 상품을 불러오는 중 */}
                {loading ? (

                    <div className="product-message">
                        <p>상품을 불러오는 중입니다.</p>
                    </div>

                ) : products.length === 0 ? (

                    /* 상품이 없는 경우 */
                    <div className="product-message">

                        <p className="no-product-title">
                            검색 결과가 없습니다.
                        </p>

                        {keyword && (
                            <p className="no-product-keyword">
                                '{keyword}'에 대한 상품을 찾을 수 없습니다.
                            </p>
                        )}

                        <p className="no-product-guide">
                            다른 검색어로 다시 검색해보세요.
                        </p>

                    </div>

                ) : (

                    /* 상품이 있는 경우 */
                    currentProducts.map((product) => (

                        <div
                            className="product-card"
                            key={product.productId}
                        >

                            {/* 하트 */}
                            <button
                                className="wishlist-button"
                                onClick={() =>
                                    handleWishlist(product)
                                }
                            >

                                <FiHeart
                                    fill={
                                        product.isWishlist
                                            ? "currentColor"
                                            : "none"
                                    }
                                />

                            </button>


                            {/* 상품 사진 */}
                            <Link
                                to={`/products/${product.productId}`}
                            >

                                <img
                                    className="product-image"
                                    src={`http://localhost:8080${product.thumbnail}`}
                                    alt={product.productName}
                                />

                            </Link>


                            {/* 상품 정보 */}
                            <div className="product-info">

                                <p className="product-name">
                                    {product.productName}
                                </p>

                                <p className="product-price">
                                    ₩{product.price.toLocaleString()}
                                </p>


                                {/* 장바구니 */}
                                <Link
                                    to="/cart"
                                    className="cart-button"
                                >
                                    <FiShoppingBag />
                                </Link>

                            </div>

                        </div>

                    ))

                )}

            </div>


            {/* --------------------------------
                ⑩ 페이지 버튼
                상품이 있을 때만 보여준다.
            -------------------------------- */}

            {!loading && products.length > 0 && (

                <div className="pagination">

                    {Array.from(
                        { length: totalPages },
                        (_, index) => (

                            <button
                                key={index}
                                className={
                                    currentPage === index + 1
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentPage(index + 1)
                                }
                            >
                                {index + 1}
                            </button>

                        )
                    )}

                </div>

            )}

        </div>

    );
};

export default Products;