import React, { useState } from "react";
import "../../../assets/css/OrgBasicInfo.css";
import { BsFillTriangleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import { nigerianStates } from "../../Components/NigerianStates";
import OrganizationSetupProgress from "../../SetUpOrganisation/Components/Progress";

const AddStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps = [
    { label: "Staff Details", status: "active" },
    { label: "Job Details", status: "inactive" },
    {
      label: "Login Details",
      status: "inactive",
    },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [permission, setPermission] = useState("");

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [dateOfBirthErr, setDateOfBirthErr] = useState("");
  const [countryErr, setCountryErr] = useState("");
  const [houseAddressErr, setHouseAddressErr] = useState("");
  const [streetAddressErr, setStreetAddressErr] = useState("");
  const [stateErr, setStateErr] = useState("");
  const [permissionErr, setPermissionErr] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isNameValid = (name) => {
    return name.trim().length >= 2;
  };

  const handleChangeState = (event) => {
    setStateErr("");
    setError("");
    const selectedState = event.target.value;

    if (selectedState === "") {
      setStateErr("Select a State");
    } else {
      setState(selectedState);
      console.log(selectedState, "Selected State");
    }
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      setCountryErr("Please select a country");
    } else {
      setCountryErr("");
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleChangeGender = (event) => {
    const selectedGender = event.target.value;
    console.log(selectedGender, "Selected State");
    setGender(selectedGender);
    if (selectedGender === "") {
      setGenderErr("Please select a gender");
    } else {
      setGenderErr("");
    }
  };

  const handleChangeFirstName = (event) => {
    setFirstNameErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    if (isNameValid(capitalizedValue)) {
      setFirstName(capitalizedValue);
    } else {
      setFirstNameErr("First name should have at least two characters");
      setFirstName(event.target.value);
    }
  };

  const handleChangeLastName = (event) => {
    setLastNameErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    if (isNameValid(capitalizedValue)) {
      setLastName(capitalizedValue);
    } else {
      setLastNameErr("Last name should have at least two characters");
      setLastName(event.target.value);
    }
  };

  const [dateFormat, setDateFormat] = useState("");
  const isDateMoreThan16YearsAgo = (selectedDate) => {
    const currentDate = new Date();
    const inputDate = new Date(selectedDate);
    const ageDifferenceMilliseconds = currentDate - inputDate;
    const ageDifferenceYears =
      ageDifferenceMilliseconds / (1000 * 60 * 60 * 24 * 365);

    return ageDifferenceYears >= 16;
  };

  const handleChangeDateOfBirth = (event) => {
    const selectedDateOfBirth = event.target.value;
    console.log(selectedDateOfBirth, "Selected State");
    setDateFormat(selectedDateOfBirth);
    if (selectedDateOfBirth === "") {
      setDateOfBirthErr("Please select a date of birth");
      setDateOfBirth(selectedDateOfBirth);
      setDateFormat(selectedDateOfBirth);
    } else if (!isDateMoreThan16YearsAgo(selectedDateOfBirth)) {
      const formattedDateOfBirth = new Date(selectedDateOfBirth).toISOString();
      setDateOfBirth(formattedDateOfBirth);
      setDateOfBirthErr("Must be at least 16 years old");
      setDateFormat(selectedDateOfBirth);
    } else {
      const formattedDateOfBirth = new Date(selectedDateOfBirth).toISOString();
      setDateOfBirthErr("");
      setDateOfBirth(formattedDateOfBirth);
      console.log(formattedDateOfBirth, "Selected State");
      setDateFormat(selectedDateOfBirth);
    }
  };

  const handleChangePermission = (event) => {
    const selectedPermissionValue = event.target.value;
    // alert(event.target.value);
    setPermission(selectedPermissionValue);
    if (!selectedPermissionValue) {
      setPermissionErr("Please select a user right");
    } else {
      setPermissionErr("");
    }
  };

  const handleChangeHouseAddress = (event) => {
    setHouseAddressErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setHouseAddress(capitalizedValue);
  };

  const handleChangeStreetAddress = (event) => {
    setStreetAddressErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setStreetAddress(capitalizedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName) {
      setFirstNameErr("Enter a First Name");
    }
    if (!lastName) {
      setLastNameErr("Enter a Last Name");
    }
    if (!gender) {
      setGenderErr("Choose a Gender");
    }
    if (!dateOfBirth) {
      setDateOfBirthErr("Choose a valid date of Birth");
    }
    if (!country) {
      setCountryErr("Choose a country of nationality");
    }
    if (!state) {
      setStateErr("Choose a state");
    }
    if (!streetAddress) {
      setStreetAddressErr("Choose a city of residence");
    }
    if (!permission) {
      setPermissionErr("Choose a permission");
    }
    if (!houseAddress) {
      setHouseAddressErr("Choose a House address");
    }

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !country ||
      !houseAddress ||
      !streetAddress ||
      !state ||
      !permission
    ) {
      setError("Fill in all the required fields to proceed");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin-Job-details", {
        state: {
          firstName,
          lastName,
          gender,
          dateOfBirth,
          country,
          houseAddress,
          streetAddress,
          state,
          permission,
        },
      });
    }, 6000);
  };

  return (
    <>
      <section className="forms-kyc-org">
        <section className="org-forms-section">
          <div className="org-forms-kyc">
            <form onSubmit={handleSubmit} className="org-forms-forms">
              <div
                className="org-forms-inputs"
                style={{
                  paddingTop: 24,
                }}
              >
                <label className="org-forms-label">
                  First Name{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  style={
                    firstNameErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  value={firstName}
                  onChange={handleChangeFirstName}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {firstNameErr ? (
                  <p
                    style={firstNameErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {firstNameErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Last Name <span className="org-forms-label required">**</span>
                </label>
                <input
                  value={lastName}
                  style={
                    lastNameErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeLastName}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {lastNameErr ? (
                  <p
                    style={lastNameErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {lastNameErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Gender <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    genderErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={gender}
                  onChange={handleChangeGender}
                >
                  <option value="">Select a Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {genderErr ? (
                  <p style={genderErr ? { color: "red", marginTop: 0 } : null}>
                    {genderErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Date of Birth{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  type="date"
                  style={
                    dateOfBirthErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                          padding: "8px", // Adjust as needed
                        }
                      : null
                  }
                  className="forms-org-input"
                  value={dateFormat}
                  onChange={handleChangeDateOfBirth}
                />
                {dateOfBirthErr ? (
                  <p
                    style={
                      dateOfBirthErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {dateOfBirthErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Country of Nationality
                  <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    countryErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={country}
                  onChange={handleChangeCountry}
                >
                  <option value="">Select a Country</option>
                  <option value="nigeria">Nigeria</option>
                </select>
                {countryErr ? (
                  <p style={countryErr ? { color: "red", marginTop: 0 } : null}>
                    {countryErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  State <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    stateErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeState}
                  className="forms-org-select"
                >
                  {nigerianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {stateErr ? (
                  <p style={stateErr ? { color: "red", marginTop: 0 } : null}>
                    {stateErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  City <span className="org-forms-label required">**</span>
                </label>
                <input
                  value={streetAddress}
                  style={
                    streetAddressErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeStreetAddress}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {streetAddressErr ? (
                  <p
                    style={
                      streetAddressErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {streetAddressErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  House Address{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  value={houseAddress}
                  style={
                    houseAddressErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeHouseAddress}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {houseAddressErr ? (
                  <p
                    style={
                      houseAddressErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {houseAddressErr}
                  </p>
                ) : null}
              </div>
              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  User Rights{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    permissionErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={permission}
                  onChange={handleChangePermission}
                >
                  <option value="">Select User Rights</option>
                  <option value="general_user_non_line_manager">
                    General User (Non-Line Manager)
                  </option>
                  <option value="general_user_line_manager">
                    General User (Line Manager)
                  </option>
                  <option value="admin_non_hr">Admin (Non-HR) - Specify</option>
                  <option value="admin_hr">Admin (HR) - Specify</option>
                  {/* Add more user rights options as needed */}
                </select>
                {permissionErr ? (
                  <p
                    style={
                      permissionErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {permissionErr}
                  </p>
                ) : null}
              </div>

              <div className="forms-org-submit-button">
                {error ? (
                  <p className="auth-error auth-full">
                    {" "}
                    <BiSolidError className="error-icon-auth" />
                    {error}
                  </p>
                ) : null}
                <button disabled={loading ? true : false} type="submit">
                  {" "}
                  {loading ? (
                    <div className="spinner-container"> </div>
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="org-flex-second">
          <section className="width-org-resize">
            <section className="org-basic-info-div-right">
              <OrganizationSetupProgress
                setupHeading="Add a Staff"
                steps={steps}
              />
            </section>
          </section>
          <section className="width-org-resize-div">
            <div className="org-width-vw">
              <section className="org-basic-info-div-right-div-div">
                <OrganizationSetupProgress
                  setupHeading="Add a Staff"
                  steps={steps}
                />
              </section>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default AddStaff;
