import React from "react";

import logo from "../images/img/icon-above-font.png";

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className=" footer-content">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <img src={logo} alt="Groupomania logo" width="100" height="100" />
                </h6>
                <p>Votre agence qui bouge au delà !!</p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3" /> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  Groupomania@mania.com
                </p>
                <p>
                  <i className="fas fa-phone me-3" /> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3" /> + 01 234 567 89
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <a href="facebook.com" className="me-4 text-reset"  aria-label="facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true" title="facebook" />
                </a>
                <a href="twitter.com" className="me-4 text-reset"  aria-label="twitter">
                  <i className="fab fa-twitter" aria-hidden="true" title="twitter" />
                </a>
                <a href="google.com" className="me-4 text-reset"  aria-label="google">
                  <i className="fab fa-google" aria-hidden="true"  title="google"/>
                </a>
                <a href="instagram.com" className="me-4 text-reset"  aria-label="instagram">
                  <i className="fab fa-instagram" aria-hidden="true" title="instagram"/>
                </a>
                <a href="linkedin.com" className="me-4 text-reset"  aria-label="linkedin">
                  <i className="fab fa-linkedin" aria-hidden="true" title="linkedin" />
                </a>
                <a href="Github.com" className="me-4 text-reset" aria-label="github">
                  <i className="fab fa-github"  aria-hidden="true" title="github" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4 copyright" >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="http://localhost:3000/">
            Groupomania
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
