import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./css/About.css";

const About = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="fw-bold fs-3 mt-2">Latest news</h1>
            <h1 className="fw-bold fs-1">Verizon to offer <br /> new iPad Mini.</h1>
            <p className="fs-5">The ultraportable iPad mini is available to order <br /> starting October 23.</p>
            <div className="d-flex gap-2">
              <a className="btn btn-primary" href='https://www.verizon.com/about/news/verizon-offer-new-ipad-mini' target="_blank" rel="noopener noreferrer">
                Read article
              </a>
              <a className="btn btn-secondary" href='https://www.verizon.com/tablets/apple-ipad-mini-a17-pro/?CMP=ini_b_x_pr_oth_pr1_24_10_nc_ipma17p' target="_blank" rel="noopener noreferrer">
                Shop now
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <img src="../assets/image_1.png" alt='Main part' className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <img src='../assets/image_2.png' alt='About' className="img-fluid mt-3" />
          </div>
          <div className="col-lg-6">
            <h1 className="fs-5 text-danger">Our Company</h1>
            <h1 className="fw-bold fs-2">Powering how you live, work<br />and play.</h1>
            <p className="fs-5">We're all about connecting everything and everyone in totally new and exciting ways.</p>
            <a className="btn btn-primary" href="https://www.verizon.com/about/our-company" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <img src='../assets/image_3.png' alt='About' className="img-fluid mt-3" />
          </div>
          <div className="col-lg-6">
            <h1 className="fs-5 text-danger">Our Responsibility</h1>
            <h1 className="fw-bold fs-2">Citizen Verizon. When the<br />world thrives, we all win.</h1>
            <p className="fs-5">Our plan to expand digital access, protect the climate, and prepare people for the jobs of the future.</p>
            <a className="btn btn-primary" href="https://www.verizon.com/about/responsibility" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <img src='../assets/image_3.png' alt='About' className="img-fluid mt-3" />
          </div>
          <div className="col-lg-6">
            <h1 className="fs-5 text-danger">Our Shareowners</h1>
            <h1 className="fw-bold fs-2">Delivering strong results.</h1>
            <p className="fs-5">Not a lot of companies can transform their business in a time of accelerating change. But we have, and will continue to do so.</p>
            <a className="btn btn-primary" href="https://www.verizon.com/about/investors" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <img src='../assets/image_4.png' alt='About' className="img-fluid mt-3" />
          </div>
          <div className="col-lg-6">
            <h1 className="fs-5 text-danger">Our Employees</h1>
            <h1 className="fw-bold fs-2">Fueled by purpose.</h1>
            <p className="fs-5">From finance and tech retail and beyond. See what it's like as a V Teamer, working with good people, doing good things.</p>
            <a className="btn btn-primary" href='https://mycareer.verizon.com/' target='_blank' rel="noopener noreferrer">
              Learn More
            </a>
            <a className="btn btn-secondary ms-2" href='https://www.verizon.com/about/news-category/inside-verizon' target='_blank' rel="noopener noreferrer">
              Inside Verizon
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
