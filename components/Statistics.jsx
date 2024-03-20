import React from "react";

const Statistics = () => {
  return (
      <div className="statistic">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-sm-6 wow fadeInUp"
                     data-wow-duration="0.3s" data-wow-delay="0.3s">
                    <div className="platfrom-box text-center">
                        <div className="icon">
                            <img src="/assets/img/offer-icon-1.png" alt=""/>
                            <p className="text">Extra Fast <br/> Transaction</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 wow fadeInUp"
                     data-wow-duration="0.4s" data-wow-delay="0.4s">
                    <div className="platfrom-box text-center">
                        <div className="icon">
                            <img src="/assets/img/offer-icon-2.png" alt=""/>
                            <p className="text">Secure<br/>Transaction</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 wow fadeInUp"
                     data-wow-duration="0.5s" data-wow-delay="0.5s">
                    <div className="platfrom-box text-center">
                        <div className="icon">
                            <img src="/assets/img/offer-icon-3.png" alt=""/>
                            <p className="text"> No Limits on <br/> Transaction </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 wow fadeInUp"
                     data-wow-duration="0.6s" data-wow-delay="0.6s">
                    <div className="platfrom-box text-center">
                        <div className="icon">
                            <img src="/assets/img/offer-icon-4.png" alt=""/>
                            <p className="text"> We Have The Best <br/> Exchange Rate </p>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="content">
                        <div className="bg-pic">
                            <img src="/assets/img/stasictic-bg.png"/>
                        </div>
                        <div className="section-head text-center wow fadeInUp"
                             data-wow-duration="0.5s" data-wow-delay="0.5s">
                            <h4 className="lasthead">Our stats say more than any words</h4>
                            <h2 className="text">Today's Statistics</h2>
                            <p className="text justify-content-center">Explore today's statistics and discover insights that speak volumes
                                about our progress and achievements. From user engagement metrics to performance
                                indicators, our stats provide valuable insights into our success story. Dive into the
                                numbers and see the impact we're making!</p>

                        </div>

                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-lg-6 wow fadeInUp"
                                 data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <div className="statis-boxx">
                                    <div className="icon">
                                        <img src="/assets/img/stasictic-icon-1.png" alt=""/>
                                    </div>
                                    <div className="statis-content">
                                        <h3 className="subtitle">396</h3>
                                        <p className="text">Transaction Made</p>
                                    </div>
                                </div>

                                <div className="statis-boxx">
                                    <div className="icon">
                                        <img src="/assets/img/stasictic-icon-1.png" alt=""/>
                                    </div>
                                    <div className="statis-content">
                                        <h3 className="subtitle">ETH/BCH</h3>
                                        <p className="text">Today's Champion Pair</p>
                                    </div>
                                </div>

                                <div className="statis-boxx">
                                    <div className="icon">
                                        <img src="/assets/img/stasictic-icon-1.png" alt=""/>
                                    </div>
                                    <div className="statis-content">
                                        <h3 className="subtitle">12 Mins</h3>
                                        <p className="text">Average Processing Time</p>
                                    </div>
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

export default Statistics;
