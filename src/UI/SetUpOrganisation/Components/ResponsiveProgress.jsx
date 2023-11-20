import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

const OrganizationSetupSteps = ({ steps }) => {
  return (
    <div>
      <h3 className="org-basic-info-div-right-h3">Set up your organisation</h3>
      <div className="org-numbers-in-circle-div">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="org-arrow-div">
              <BsFillTriangleFill
                className={`triangle${step.status === 'done'|| step.status === 'inactive' ? '' : '-active'}`}
              />
              <div
                className={`org-numbers-in-circle org-numbers-${step.status === 'done' ? 'done' : step.status}`}
              >
                <p className="org-numbers-in-circle-p">{index + 1}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`org-numbers-in-circle-span org-span-${step.status}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div>
        {steps.map((step, index) => (
          <h3
            key={index}
            className={`org-basic-info-div-right-h3 org-h3-${step.status}`}
          >
            {step.label}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default OrganizationSetupSteps;
