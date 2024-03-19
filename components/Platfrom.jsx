import React from "react";

const Platfrom = () => {
  return (
      <div className="platfrom" id="about">
        <div className="bg">
          <img src="/assets/img/platfrom.png" alt=""/>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12" >
              <div className="content">
                <div className="row justify-content-center">
                  <div className="col-lg-9 text-center wow fadeInUp"
                       data-wow-duration="0.5s" data-wow-delay="0.3s">
                    <div className="section-head">
                      <h4 className="lasthead">About Us</h4>
                      <h2 className="title">The Online exchange platform</h2>
                      <p className="text">Our mission is to democratize access to the digital economy.
                        We believe in the transformative power of cryptocurrencies and blockchain technology
                        to redefine the future of finance. Our platform is designed to empower individuals,
                        investors, and businesses to navigate the crypto landscape with confidence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Platfrom;
