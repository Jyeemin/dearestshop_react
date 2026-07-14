import banner1 from "../assets/mainimage/main2.jpg";
import banner2 from "../assets/mainimage/main4.jpg";
import banner4 from "../assets/mainimage/main5.jpg";
import banner5 from "../assets/mainimage/main1.jpg";

import "./MainBanner.css";

const MainBanner = () => {
    return <div>
 <section className="container-fluid px-5 mt-5 pt-5">
            <div className="row g-0">

                <div className="col-md-6">
                    <img
                        src={banner1}
                        className="banner-image"
                        alt="banner1"
                    />
                </div>

                    <div className="col-md-6">
                    <img
                        src={banner5}
                        className="banner-image"
                        alt="banner5"
                    />
                </div>

                <div className="col-md-6">
                    <img
                        src={banner2}
                        className="banner-image"
                        alt="banner2"
                    />
                </div>

                    <div className="col-md-6">
                    <img
                        src={banner4}
                        className="banner-image"
                        alt="banner4"
                    />
                </div>

            </div>

        </section>

    </div>  
};


export default MainBanner;