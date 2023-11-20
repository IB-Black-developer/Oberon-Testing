import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrganisation,
  updateOrganisation,
} from "../../../redux/profile/Profile";

const useOrganizationAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [org, setOrg] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeCountry = (event) => {
    setError("");
    setCountryErr("");
    setCountry(event.target.value);
  
  };

  const handleChangeState = (event) => {
    setError("");
    setStateErr("");
    setState(event.target.value);
  };

  const handleChangeTown = (event) => {
    setError("");
    setTownErr("");
    setTown(event.target.value);
  };

  const handleChangePostCode = (event) => {
    setError("");
    setPostCodeErr("");
    setPostCode(event.target.value);
  };

  const handleChangeBusinessPhoneNumber = (event) => {
    setError("");
    setBusinessPhoneNumberErr("");
    setBusinessPhoneNumber(event.target.value);
  };

  const handleChangeWebsite = (event) => {
    setError("");
    setWebsiteErr("");
    setWebsite(event.target.value);
  };

  const handleChangeSocialMedia = (event) => {
    setError("");
    setSocialMediaErr("");
    setSocialMedia(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      country ||
      state ||
      town ||
      postCode ||
      businessPhoneNumber ||
      website ||
      socialMedia
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("country", country);
      formData.append("state", state);
      formData.append("city", town);
      formData.append("post_code", postCode);
      formData.append("phone_number", businessPhoneNumber);
      formData.append("website", website);
      formData.append("social_url", socialMedia);
      try {
        const response = await dispatch(updateOrganisation(formData));
        setLoading(false);
        if (response?.payload?.status === 200) {
          setSuccess("Organisation Address Information Updated Successfully");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    } else {
      setError("No New Changes to Update");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrganisation())
      .then((response) => {
        setOrg(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching organisation data:", error);
      });
  }, [dispatch]);

  return {
    country,
    isLoading,
    handleChangeCountry,
    state,
    handleChangeState,
    town,
    handleChangeTown,
    postCode,
    handleChangePostCode,
    businessPhoneNumber,
    handleChangeBusinessPhoneNumber,
    website,
    handleChangeWebsite,
    socialMedia,
    handleChangeSocialMedia,
    countryErr,
    stateErr,
    townErr,
    postCodeErr,
    businessPhoneNumberErr,
    websiteErr,
    socialMediaErr,
    loading,
    error,
    org,
    success,
    handleSubmit,
  };
};

export default useOrganizationAddressForm;
