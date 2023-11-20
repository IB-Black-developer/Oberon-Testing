import React from "react";
import Dots from "../../../assets/AuthAssets/Dots.png";

const AuthBackGroundGreenDiv = () => {
  return (
    <div className="auth-first-div">
      <div className="auth-background-green-div">
        <div className="auth-full-height">
          <div>
            <div>
              <h2 className="auth-brown-oberon-heading">Oberon.</h2>
            </div>
            <div className="auth-div-dots">
              <div>
                <img className="auth-dots" src={Dots} alt="Dots" />
              </div>
            </div>
            <div
              style={{
                marginTop: 120,
              }}
            >
              <h2 className="auth-heading-oberon-heading">
                Simplify Staff Management with{" "}
                <span className="auth-span-oberon-heading">Oberon.</span>
              </h2>
            </div>
          </div>

          <div>
            <div>
              <img className="auth-dots" src={Dots} alt="Dots" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBackGroundGreenDiv;
