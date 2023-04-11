
import React from "react"
import "../../styles/Footer.css"
import Githubicon from "../../images/footer/Githubicon.png";


const Footer = () => {
    return (
        <footer class="bg-dark text-center text-white">
        <div class="container p-4">
            <section class="mb-4">

                <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/zMag33z" role="button">
                <img className="icon" src={Githubicon} alt="github icon" />
                </a>

                <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/itsvictorg" role="button">
                <img className="icon" src={Githubicon} alt="github icon" />
                </a>

                <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/christian1512-FE" role="button">
                <img className="icon" src={Githubicon} alt="github icon" />
                </a>

                <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/christian1512-FE" role="button">
                <img className="icon" src={Githubicon} alt="github icon" />
                </a>

                <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/christian1512-FE" role="button">
                <img className="icon" src={Githubicon} alt="github icon" />
                </a>

            </section>

            <section class="mb-4">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                    repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                    eum harum corrupti dicta, aliquam sequi voluptate quas.
                </p>
            </section>

            <section class="links">

                <div class="row">

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Links</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text-white">Link 1</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Link 2</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Link 3</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Link 4</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <small className="text-center mt-5">&copy; (Whatever the name of the application goes here, 2023). All rights reserved.</small>
        </div>
    </footer >
    )
}

export default Footer;

