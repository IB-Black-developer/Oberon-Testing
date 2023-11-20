import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrganisation, updateOrganisation } from "../../../redux/profile/Profile";

const useOrgAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [postCode, setPostCode] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const [countryErr, setCountryErr] = useState("");
  const [stateErr, setStateErr] = useState("");
  const [townErr, setTownErr] = useState("");
  const [postCodeErr, setPostCodeErr] = useState("");
  const [businessPhoneNumberErr, setBusinessPhoneNumberErr] = useState("");
  const [websiteErr, setWebsiteErr] = useState("");
  const [socialMediaErr, setSocialMediaErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeCountry = (event) => {
    setCountryErr("");
    setError("");
    const selectedCountry = event.target.value;

    if (selectedCountry === "") {
      setCountryErr("Select a Country");
    } else {
      setCountry(selectedCountry);
    }
  };

  const handleChangeState = (event) => {
    setStateErr("");
    setError("");
    const selectedState = event.target.value;

    if (selectedState === "") {
      setStateErr("Select a State");
    } else {
      setState(selectedState);
    }
  };

  const handleChangeTown = (event) => {
    setTownErr("");
    setError("");
    if (event.target.value === "") {
      setTownErr("Enter a Town");
    } else {
      setTown(event.target.value);
    }
  };

  const handleChangePostCode = (event) => {
    setPostCodeErr("");
    setError("");
    if (event.target.value === "") {
      setPostCodeErr("Enter your Post Code");
    } else {
      setPostCode(event.target.value);
    }
  };

  const handleChangeBusinessPhoneNumber = (event) => {
    setBusinessPhoneNumberErr("");
    setError("");
    if (event.target.value === "") {
      setBusinessPhoneNumberErr("Enter your business Phone Number");
    } else {
      setBusinessPhoneNumber(event.target.value);
    }
  };

  const handleChangeWebsite = (event) => {
    setWebsiteErr("");
    setError("");
    if (event.target.value === "") {
      setWebsiteErr("Enter a valid website URL");
    } else {
      setWebsite(event.target.value);
    }
  };

  const handleChangeSocialMedia = (event) => {
    setSocialMediaErr("");
    setError("");
    if (event.target.value === "") {
      setSocialMediaErr("Enter a valid URL");
    } else {
      setSocialMedia(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCountryErr("");
    setStateErr("");
    setTownErr("");
    setPostCodeErr("");
    setBusinessPhoneNumberErr("");
    setWebsiteErr("");
    setSocialMediaErr("");
    setError("");

    if (!country) {
      setCountryErr("Choose a country");
    }
    if (!state) {
      setStateErr("Choose a State");
    }
    if (!town) {
      setTownErr("Choose a Town");
    }

    if (!postCode) {
      setPostCodeErr("Enter your Post Code");
    }
    if (!businessPhoneNumber) {
      setBusinessPhoneNumberErr("Enter your business Phone Number");
    }
    if (!website) {
      setWebsiteErr("Enter a valid website URL");
    }
    if (!socialMedia) {
      setSocialMediaErr("Enter a valid URL");
    }
    if (
      country &&
      state &&
      town &&
      postCode &&
      businessPhoneNumber &&
      website &&
      socialMedia
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("country ", country);
      formData.append("state", state);
      formData.append("city", town);
      formData.append("post_code", postCode);
      formData.append("phone_number", businessPhoneNumber);
      formData.append("website", website);
      formData.append("social_url", socialMedia);
      try {
        const response = await dispatch(updateOrganisation(formData));
        setLoading(false);
        console.log("whwhhwh", response);
        if (response?.payload?.status === 200) {
          navigate("/admin-setup-contact-admin");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error:", error);
      }
    } else {
      setError("Fill all forms to proceed");
    }
  };

  useEffect(() => {
    dispatch(getOrganisation())
      .then((response) => {
        console.log("Organisation data:", response.payload.data);
        setOrg(response?.payload?.data);
      })
      .catch((error) => {
        console.log("Error fetching organisation data:", error);
      });
  }, [dispatch]);

  return {
    country,
    state,
    town,
    postCode,
    businessPhoneNumber,
    website,
    socialMedia,
    countryErr,
    stateErr,
    townErr,
    postCodeErr,
    businessPhoneNumberErr,
    websiteErr,
    socialMediaErr,
    loading,
    error,
    handleChangeCountry,
    handleChangeState,
    handleChangeTown,
    handleChangePostCode,
    handleChangeBusinessPhoneNumber,
    handleChangeWebsite,
    handleChangeSocialMedia,
    handleSubmit,
  };
};

export default useOrgAddressForm;
