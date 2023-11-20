import { useEffect, useState } from "react";

const useOrganizationForm = (dispatch, getOrganization, updateOrganization) => {
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
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [org, setOrg] = useState("");

  const handleChangeBusinessLegalName = (event) => {
    setError("");
    setSuccess("");
    setBusinessLegalName(event.target.value);
  };

  const handleChangeKycUpload = (event) => {
    setError("");
    setSuccess("");
    const file = event.target.files[0];
    if (file) {
      setKycUpload(file);
    }
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleChangeBusinessEntityType = (event) => {
    setError("");
    setSuccess("");
    setBusinessEntityType(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setError("");
    setSuccess("");
    setDescription(event.target.value);
  };

  const handleChangeNatureofBusiness = (event) => {
    setError("");
    setSuccess("");
    setNatureOfBusiness(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (
      description ||
      businessEntityType ||
      kycUpload ||
      businessLegalName ||
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
        const response = await dispatch(updateOrganization(formData));
        setLoading(false);
        if (response?.payload?.status === 200) {
          setSuccess("Organisation KYC Information Updated Successfully");
        }
      } catch (error) {
        setLoading(false);
        setError("An error occurred");
        console.error("Error:", error);
      }
    } else {
      setError("No New Changes to Update");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrganization())
      .then((response) => {
        setIsLoading(false);
        setOrg(response?.payload);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching organisation data:", error);
      });
  }, [dispatch, getOrganization]);

  return {
    businessLegalName,
    setBusinessLegalName,
    kycUpload,
    setKycUpload,
    businessEntityType,
    setBusinessEntityType,
    natureOfBusiness,
    setNatureOfBusiness,
    description,
    setDescription,
    imageUrl,
    businessLegalNameErr,
    setBusinessLegalNameErr,
    kycUploadErr,
    setKycUploadErr,
    businessEntityTypeErr,
    setBusinessEntityTypeErr,
    natureOfBusinessErr,
    setNatureOfBusinessErr,
    descriptionErr,
    setDescriptionErr,
    error,
    setError,
    loading,
    success,
    isLoading,
    org,
    handleSubmit,
    handleChangeBusinessLegalName,
    handleChangeKycUpload,
    handleChangeBusinessEntityType,
    handleChangeDescription,
    handleChangeNatureofBusiness,
  };
};

export default useOrganizationForm;
