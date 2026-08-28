import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import "./ProductDetail.css";

const ProductDetail = () => {

    // URL에서 상품 id 가져오기
    const { id } = useParams();

    const [product, setProduct] = useState(null);

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


if (!product) {
    return (
        <div className="product-detail-loading">
            상품을 불러오는 중...
        </div>
    );
}

    return (

        <div className="product-detail">

            {/* 왼쪽 */}
            <div className="product-detail-image">

                <img
                    src={`http://localhost:8080${product.thumbnail}`}
                    alt={product.productName}
                />

            </div>


            {/* 오른쪽 */}
            <div className="product-detail-info">

                <div className="product-detail-title">

                    <h1>
                        {product.productName}
                    </h1>

                    <button className="detail-wishlist">
                        <FiHeart />
                    </button>

                </div>


                <p className="detail-price">
                    ₩{product.price.toLocaleString()}
                </p>


                <div className="detail-description">
                    <p>
                        {product.detailDescription}
                    </p>
                </div>


                {/* 색상 */}
                <div className="detail-option">

                    <p>color</p>

                    <div className="color-options">

                        <button>white</button>
                        <button>pink</button>
                        <button>black</button>

                    </div>

                </div>


                {/* 사이즈 */}
                <div className="detail-option">

                    <p>size</p>

                    <div className="size-options">

                        <button>S</button>
                        <button>M</button>

                    </div>

                </div>


                {/* 장바구니 */}
                <button className="add-cart-button">
                    ADD TO CART
                </button>

            </div>

        </div>

    );

};

export default ProductDetail;