import React from 'react';
import ComingSoonGif from "../../assets/images/comingsoon.gif";
import '../freelancer-hub/FreelancerHub.scss';

const FreelancerHub = () => {
  return (
    <div className="comingsoon">
      <div className="comingsoon__banner">
        <img src={ComingSoonGif} alt="Banner" className="comingsoon__banner-image" />
      </div>
    </div>
  );
};

export default FreelancerHub;
