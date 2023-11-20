import React, { useState, useEffect } from "react";
import "../../../assets/css/OrgBasicInfo.css";
import { BsFillTriangleFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import { nigerianStates } from "../../Components/NigerianStates";
import { getStaff, updateStaff } from "../../../redux/profile/Profile";
import Loader from "../../Components/AuthComponents/Loader";
import OrganizationSetupProgress from "../../SetUpOrganisation/Components/Progress";
import OrgErrorNotification from "../components/OrgErrorNotification";
import LoadingButton from "../components/LoadingButton";

const EditAddStaff = () => {
  const steps = [
    { label: "Staff Details", status: "active" },
    { label: "Job Details", status: "inactive" },
    {
      label: "Login Details",
      status: "inactive",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [isLoading, setIsLoading] = useState(false);
  const [staff, setStaff] = useState("");

  const { user_id } = useParams();
  console.log(user_id, "user_id");

  useEffect(() => {
    setIsLoading(true);
    dispatch(getStaff(user_id))
      .then((response) => {
        setIsLoading(false);
        console.log("Staff data:", response?.payload?.data);
        setStaff(response?.payload?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error fetching staff data:", error);
      });
  }, [dispatch, user_id]);

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

  const originalDate = new Date(staff?.date_of_birth);
  const day = originalDate.getUTCDate();
  const month = originalDate.getUTCMonth() + 1;
  const year = originalDate.getUTCFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  console.log(formattedDate);

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
    // if (selectedDateOfBirth === "") {
    //   setDateOfBirthErr("Please select a date of birth");
    //   setDateOfBirth(selectedDateOfBirth);
    //   setDateFormat(selectedDateOfBirth);
    // } else

    if (!isDateMoreThan16YearsAgo(selectedDateOfBirth)) {
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
    // if (!selectedPermissionValue) {
    //   setPermissionErr("Please select a user right");
    // } else {
    //   setPermissionErr("");
    // }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const user_id = staff?.id;
    console.log(staff?.permissions?.[0]?.text, "ssss");
    const formData = {
      first_name: firstName || staff?.first_name,
      last_name: lastName || staff?.last_name,
      gender: gender || staff?.gender,
      date_of_birth: dateOfBirth || staff?.date_of_birth,
      nationality: country || staff?.nationality,
      address_3: houseAddress || staff?.address_3,
      address_2: streetAddress || staff?.address_2,
      address_1: state || staff?.address_1,
      permissions: permission || staff?.permissions[0]?.text,
    };

    try {
      const response = await dispatch(updateStaff({ user_id, formData }));
      setLoading(false);
      console.log("Update Staff Response:", response.payload?.data === 200);
      navigate(`/admin-edit-job-details/${user_id}`);
    } catch (error) {
      setLoading(false);
      console.log("Error updating staff:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                    placeholder={firstName ? firstName : staff?.first_name}
                    onChange={handleChangeFirstName}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {firstNameErr ? (
                    <p
                      style={
                        firstNameErr ? { color: "red", marginTop: 0 } : null
                      }
                    >
                      {firstNameErr}
                    </p>
                  ) : null}
                </div>

                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Last Name{" "}
                    <span className="org-forms-label required">**</span>
                  </label>
                  <input
                    placeholder={lastName ? lastName : staff?.last_name}
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
                      style={
                        lastNameErr ? { color: "red", marginTop: 0 } : null
                      }
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
                    <option value="male" selected={gender === "male"}>
                      Male
                    </option>
                    <option value="female" selected={gender === "female"}>
                      Female
                    </option>
                  </select>
                  {genderErr ? (
                    <p
                      style={genderErr ? { color: "red", marginTop: 0 } : null}
                    >
                      {genderErr}
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
                    value={country || staff?.nationality}
                    onChange={handleChangeCountry}
                  >
                    <option value="">Select a Country</option>
                    <option value="nigeria" selected={country === "nigeria"}>
                      Nigeria
                    </option>
                  </select>
                  {countryErr ? (
                    <p
                      style={countryErr ? { color: "red", marginTop: 0 } : null}
                    >
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
                    <option value="">Select a State</option>
                    {nigerianStates.map((state, index) => (
                      <option
                        key={index}
                        value={state}
                        selected={state === staff?.address_1}
                      >
                        {state ? state : staff?.address_1}
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
                    placeholder={
                      streetAddress ? streetAddress : staff?.address_2
                    }
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
                    placeholder={houseAddress ? houseAddress : staff?.address_3}
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


                <div className="forms-org-submit-button">
                  {error ? <OrgErrorNotification error={error} /> : null}
                  <LoadingButton
                    loading={loading}
                    onClick={handleSubmit}
                    buttonText="Save"
                  />
                </div>
              </form>
            </div>
          </section>
          <section className="org-flex-second">
            <section className="width-org-resize">
              <section className="org-basic-info-div-right">
                <OrganizationSetupProgress
                  setupHeading="Edit a Staff"
                  steps={steps}
                />
              </section>
            </section>
            <section className="width-org-resize-div">
              <div className="org-width-vw">
                <section className="org-basic-info-div-right-div-div">
                  <OrganizationSetupProgress
                    setupHeading="Edit a Staff"
                    steps={steps}
                  />
                </section>
              </div>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default EditAddStaff;
