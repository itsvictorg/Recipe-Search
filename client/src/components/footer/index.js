
import React from "react"
import "../../styles/Footer.css"

import { Link } from "react-router-dom";
import { generateUID } from "../../utils/helpers";

function importAll(imgContext) {
    return imgContext.keys().map(imgContext);
};
const images = importAll(require.context('../../images/footer', false, /\.(png|jpe?g|svg)$/));
const githublinks = [
    "https://github.com/christian1512-FE",
    "https://github.com/zMag33z",
    "https://github.com/christian1512-FE",
    "https://github.com/eugerald",
    "https://github.com/itsvictorg",
]


const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white">
            <div className="container p-4">
                <section className="mb-4">
                    {images.map((image, index) => {
                        return (
                            <a key={generateUID()} className="btn btn-outline-light btn-floating m-1" href={githublinks[index]} role="button">
                                <img className="icon" src={image} alt="github icon" />
                            </a>

                        )
                    })}
                </section>



                <section className="links">

                    <div className="row">
                        {/* <div className="col-lg-3 col-md-6 mb-4 mb-md-0"> */}

                        <div className="col-links">
                            <h5 className="text-uppercase p-2">Links</h5>

                            <ul className="list-unstyled mb-0 foot-links">
                                <li>
                                    <Link to="about">About</Link>
                                </li>
                                <li>
                                    <Link to="advice">Advice</Link>
                                </li>
                                <li>
                                    <Link to="contact">Contact</Link>
                                </li>
                                <li>
                                    <Link to="donate">Donate</Link>
                                </li>
                                <li>
                                    <Link to="terms">Terms</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <div className="container p-4">
                <small className="text-center mt-5">&copy; Recipe Blog. {new Date().getFullYear()} All rights reserved.</small>
            </div>
        </footer >
    )
}

export default Footer;

