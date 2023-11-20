import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrganisation, updateOrganisation } from "../../../redux/profile/Profile";

const useOrgKYCForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [businessLegalName, setBusinessLegalName] = useState("");
  const [kycUpload, setKycUpload] = useState("");
  const [businessEntityType, setBusinessEntityType] = useState("");
  const [natureOfBusiness, setNatureOfBusiness] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [businessLegalNameErr, setBusinessLegalNameErr] = useState("");
  const [kycUploadErr, setKycUploadErr] = useState("");
  const [businessEntityTypeErr, setBusinessEntityTypeErr] = useState("");
  const [natureOfBusinessErr, setNatureOfBusinessErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeBusinessLegalName = (event) => {
    setBusinessLegalNameErr("");
    setError("");
    const inputValue = event.target.value;
    if (inputValue === "") {
      setBusinessLegalNameErr("Enter a business Legal Name");
    } else {
      const capitalizedValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      setBusinessLegalName(capitalizedValue);
      console.log(capitalizedValue, "capitalizedValue");
    }
  };

  const handleChangeKycUpload = (event) => {
    setKycUploadErr("");
    setError("");

    const file = event.target.files[0];

    if (!file) {
      setKycUploadErr("Choose an image to upload");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setKycUploadErr("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setKycUploadErr("Image size should be below 5MB");
      return;
    }

    setKycUpload(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleChangeBusinessEntityType = (event) => {
    setBusinessEntityTypeErr("");
    setError("");
    if (event.target.value === "") {
      setBusinessEntityTypeErr("Select a business Entity Type");
    } else {
      setBusinessEntityType(event.target.value);
      console.log(event.target.value, "event.target.value");
    }
  };

  const handleChangeDescription = (event) => {
    setDescriptionErr("");
    setError("");
    if (event.target.value === "") {
      setDescriptionErr("Enter a brief description of your organisation");
    } else {
      setDescription(event.target.value);
      console.log(event.target.value, "event.target.value");
    }
  };

  const handleChangeNatureofBusiness = (event) => {
    setNatureOfBusinessErr("");
    setError("");
    if (event.target.value === "") {
      setNatureOfBusinessErr("Select a Nature of Business");
    } else {
      setNatureOfBusiness(event.target.value);
      console.log(event.target.value, "event.target.value");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusinessEntityTypeErr("");
    setBusinessLegalNameErr("");
    setKycUploadErr("");
    setNatureOfBusinessErr("");
    setDescriptionErr("");
    setError("");
    if (!natureOfBusiness) {
      setNatureOfBusinessErr("Select a Nature of Business");
    }
    if (!businessLegalName) {
      setBusinessLegalNameErr("Enter a business Legal Name");
    }
    if (!kycUpload) {
      setKycUploadErr("Choose a image to upload");
    }

    if (!businessEntityType) {
      setBusinessEntityTypeErr("Select a business Entity Type");
    }
    if (!description) {
      setDescriptionErr("Enter a brief description of your organisation");
    }

    if (
      description &&
      businessEntityType &&
      kycUpload &&
      businessLegalName &&
      natureOfBusiness
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("cac", kycUpload);
      formData.append("business_entity_type", businessEntityType);
      formData.append("nature_of_business", natureOfBusiness);
      formData.append("company_name", businessLegalName);
      try {
        const response = await dispatch(updateOrganisation(formData));
        setLoading(false);
        if (response?.payload?.status === 200) {
          navigate("/admin-setup-organisation-address");
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
        // setOrg(response?.payload?.data);
      })
      .catch((error) => {
        console.log("Error fetching organisation data:", error);
      });
  }, [dispatch]);

  return {
    businessLegalName,
    kycUpload,
    businessEntityType,
    natureOfBusiness,
    description,
    imageUrl,
    businessLegalNameErr,
    kycUploadErr,
    businessEntityTypeErr,
    natureOfBusinessErr,
    descriptionErr,
    error,
    loading,
    handleChangeBusinessLegalName,
    handleChangeKycUpload,
    handleChangeBusinessEntityType,
    handleChangeDescription,
    handleChangeNatureofBusiness,
    handleSubmit,
  };
};

export default useOrgKYCForm;
