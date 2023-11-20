import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const StaffCard = ({ name, role, image, position, userRole }) => {
  return (
    <div className="all-staff-style">
      <div className="all-staff-div-flex">
        <div className="all-staff-div-main-left-contents">
          <div className="all-staff-div-img-and-text">
            <img className="all-staff-img" src={image} alt="verify" />
            <div className="all-staff-texts-contents">
              <span className="all-staff-texts-contents-span-name">{name}</span>
              <span className="all-staff-texts-contents-span-p">{role}</span>
              <span className="all-staff-texts-contents-span-p">{position}</span>
            </div>
          </div>
          <div className="all-staff-div-img-and-text">
            <span className="all-staff-texts-contents-span-p hide">{userRole}</span>
            <MdKeyboardArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
