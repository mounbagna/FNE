import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/index-styles.css";
import fnelogo from "../assets/fne-logo.png"
import job1 from "../assets/job1.jpg"
import job2 from "../assets/job2.jpg"
import job3 from "../assets/job3.jpg"
import job4 from "../assets/job4.jpg"
import job5 from "../assets/job5.jpg"
import job6 from "../assets/job6.jpg"

import "@fortawesome/fontawesome-free/css/all.min.css";


const Index = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.name) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            NFE
          </a>
          <button
            className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/login">
                  Sign-In
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/register">
                  Sign-Up
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#portfolio">
                  DashBoard
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1 bg-danger">
                <span className="nav-link py-3 px-0 px-lg-3 rounded">{user?.name}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Masthead */}
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <img className="masthead-avatar mb-5" src={fnelogo} alt="NFE" />
          <h1 className="masthead-heading text-uppercase mb-0">Welcome To National Employment Fund</h1>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <p className="masthead-subheading font-weight-light mb-0">Secure - Reliable - Fast</p>
        </div>
      </header>

      {/* Portfolio Section */}
      <section className="page-section portfolio" id="portfolio">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">DashBoard</h2>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <div className="row justify-content-center">
            {[
              { title: "job1", href: "/createAccountMsg", img: job1 },
              { title: "job2", href: "/createAccountMsg", img:job2 },
              { title: "job3", href: "/createAccountMsg", img: job3 },
              { title: "job4", href: "/createAccountMsg", img: job4 },
              { title: "job5", href: "/createAccountMsg", img: job5},
              { title: "job6", href: "/createAccountMsg", img: job6 },
            ].map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto">
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">
                      <a href={item.href}>
                        <i className="fas fa-plus fa-3x"></i>
                      </a>
                    </div>
                  </div>
                  <img className="img-fluid" src={item.img} alt={item.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="page-section bg-primary text-white mb-0" id="about">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-white">About</h2>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-4 ms-auto">
              <p className="lead">
                The National Employment Fund (NEF) App helps job seekers find employment opportunies, access training programs, 
                and connect with employers. It promotes skill development, supports inclusive employment, and provides government-backed resources
                to empower individuals and strengthen the workforce.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                L'application Fonds National de l'Emploi (FNE) aide les chercheurs d'emploi à trouver des opportunités, accéder à des programmes
                 de formation et se connecter avec les employeurs. Elle favorise le development des compétences, soutient l'emploi inclusif et offre des
                 resources gouvernementales pour renforcer la main-d'oeuvre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="page-section" id="contact">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Contact Us</h2>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <form action="/EmailSend" method="post">
                <div className="form-floating mb-3">
                  <input className="form-control" name="name" type="text" placeholder="Enter your name..." required />
                  <label>Full name</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="email" type="email" placeholder="name@example.com" required />
                  <label>Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="phone" type="tel" placeholder="(123) 456-7890" required />
                  <label>Phone number</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="subject" type="text" placeholder="Enter a subject..." required />
                  <label>Subject</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" name="message" placeholder="Enter your message here..." style={{ height: "10rem" }} required></textarea>
                  <label>Message</label>
                </div>
                <button className="btn btn-primary btn-xl" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Central & Littoral</h4>         
                <ul>Yaounde</ul>
                <ul>Mvolye</ul>
                <ul>Douala Bali</ul>
                <ul>Douala Bassa</ul>
                <ul>Bonabéri</ul>
              <h4 className="text-uppercase mb-4">Western & Northwest</h4>
                <ul>Bafoussam</ul>
                <ul>Bamenda</ul>
                <ul>Ngongsamba</ul>
              <h4 className="text-uppercase mb-4">Northern Regions</h4>
                <ul>Ngaoundéré</ul>
                <ul>Garoua</ul>
                <ul>Maroua</ul>
              <h4 className="text-uppercase mb-4">Eastern & Southern Regions</h4>
                <ul>Bertoa</ul>
                <ul>Ebolowa</ul>
                <ul>Kribi</ul>
                <ul>Limbé</ul>
                <ul>Sangmélima</ul>
                <ul>Bafia</ul>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Around the Web</h4>
              <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/mounbagna/"><i className="fab fa-linkedin-in"></i></a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-dribbble"></i></a>
            </div>
            <div className="col-lg-4">
              <h4 className="text-uppercase mb-4">About Author</h4>
              <p className="lead mb-0">
                 <a href="https://www.linkedin.com/mounbagna/">Mounbagna Abdella Abasse</a>.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright py-4 text-center text-white">
        <div className="container">
          <small>Copyright &copy; fne@Tech 2025</small>
        </div>
      </div>
    </>
  );
};

export default Index;
