import "./Footer.css";

const Footer = () => {
         return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-column">
                    <h5>Company</h5>

                    <a href="#">About</a>
                    <a href="#">Terms</a>
                    <a href="#">Privacy Policy</a>
                </div>


                <div className="footer-column">
                    <h5>Social</h5>

                    <a href="#">Instagram</a>
                    <a href="#">Github</a>
                </div>


                <div className="footer-column">
                    <h5>Community</h5>

                    <a href="#">Notice</a>
                    <a href="#">FAQ</a>
                    <a href="#">Review</a>
                </div>


                <div className="footer-column">

                    <h5>Newsletter</h5>

                    <div className="newsletter">

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                        <button>SUBSCRIBE</button>

                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    COMPANY : DEAREST | PERSONAL SHOPPING MALL PROJECT
                </p>

                <p>
                    EMAIL : dearest@email.com
                </p>

                <p>
                    © 2026 DEAREST. All rights reserved.
                </p>

            </div>

        </footer>
    );
  
};

export default Footer;