import "./Header.css";

const Header3 = () => {
    return <div>
    <nav className="navbar navbar-expand-lg fixed-top my-navbar">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!">˚₊‧꒰აDEAREST໒꒱ ‧₊˚</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item active"><a className="nav-link" href="#!">HOME</a></li>

                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#!">SHOP ALL</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">TOP</a></li>
                                    <li><a className="dropdown-item" href="#">BOTTOM</a></li>
                                    <li><a className="dropdown-item" href="#">Dresses</a></li>
                                </ul>
                            
                            </li>

                        <li className="nav-item"><a className="nav-link" href="#!">BEST</a></li>

                        <li className="nav-item"><a className="nav-link" href="#!">CONTACT</a></li>

                    </ul>
                </div>
            </div>
        </nav>

    </div>
};

export default Header3;
