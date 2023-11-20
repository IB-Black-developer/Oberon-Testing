import React, { useState } from "react";
import "../../assets/css/OrgBasicInfo.css";
import {  useNavigate } from "react-router-dom";


const QuickLinks = () => {
 const navigate = useNavigate();


  

  const reduxState = localStorage.getItem("reduxState");
  const userLoaded = JSON.parse(reduxState)?.auth?.user;
  console.log(userLoaded, JSON.parse(reduxState), "yeah");

  return (
    <>
      <>
        <section className="org-flex-first">
          <section className="width-org-resize">
            <section className="org-basic-info-div-right">
              <div>
                <h3 className="org-basic-info-div-right-h3">Quick Links</h3>
              </div>

              <div>
                <h3 className="org-basic-info-div-right-h3 org-h3-active">
                  Start Poll
                </h3>
                <h3 className="org-basic-info-div-right-h3 org-h3-inactive">
                  Allocate Leave
                </h3>
                <h3 className="org-basic-info-div-right-h3 org-h3-inactive">
                  Start Poll
                </h3>
                <h3 className="org-basic-info-div-right-h3 org-h3-inactive">
                  Setup your IPR
                </h3>
              </div>
            </section>
          </section>

          {/* <section className="full-fix">
            <section className="width-full-fix">
              <section className="org-basic-info-div-right-div">
                <div>
                  <h3 className="org-basic-info-div-right-h3">Quick Links</h3>
                </div>

                <div>
                  <h3 className="org-basic-info-div-right-h3 org-h3-active">
                    Run Payroll
                  </h3>
                  <h3 className="org-basic-info-div-right-h3 org-h3-inactive">
                    Allocate Leave
                  </h3>
                  <h3 className="org-basic-info-div-right-h3 org-h3-inactive">
                    Run Payroll
                  </h3>
                  <h3 className="org-basic-info-div-right-h3 org-h3-inactive">
                    Setup your IPR
                  </h3>
                </div>
              </section>
            </section>
          </section> */}
        </section>
        {/* <div className="mid-space"></div> */}
      </>
    </>
  );
};

export default QuickLinks;
