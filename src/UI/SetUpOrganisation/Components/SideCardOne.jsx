import React from "react";
import { BsFillTriangleFill } from "react-icons/bs";

const OrgSetupProgress = ({ activeStep }) => {
  const steps = [
    "Set up your organisation",
    "Organisation's Basic information",
    "Organisation's KYC",
    "Organisation's Address and Social Media Presence",
    "Contact Admin",
  ];

  return (
    <div>
      <h3 className="org-basic-info-div-right-h3">{steps[0]}</h3>
      <div className="org-numbers-in-circle-div">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`org-arrow-div${index <= activeStep ? " org-arrow-div-active" : ""}`}>
              <BsFillTriangleFill
                className={`triangle${index === activeStep ? "-active" : ""}`}
              />
              <div className={`org-numbers-in-circle${index === activeStep ? " org-numbers-active" : ""}`}>
                <p className="org-numbers-in-circle-p">{index + 1}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`org-numbers-in-circle-span${index === activeStep ? " org-span-active" : ""}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div>
        {steps.map((step, index) => (
          <h3
            key={index}
            className={`org-basic-info-div-right-h3 ${
              index < activeStep
                ? "org-h3-done"
                : index === activeStep
                ? "org-h3-active"
                : "org-h3-inactive"
            }`}
          >
            {step}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default OrgSetupProgress;
