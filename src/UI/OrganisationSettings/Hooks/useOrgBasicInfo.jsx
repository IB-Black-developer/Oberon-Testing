import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrganisation, getProfile, updateOrganisation } from "../../../redux/profile/Profile";

const useOrganizationBasicInfoForm = () => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [org, setOrg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [staff_count_max, setStaffMaxCount] = useState("");
  const [staff_count_min, setStaffMinCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setError("");
    setSuccess("");
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else if (!file) {
    }
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProfile())
      .then((response) => {
        setIsLoading(false);
        console.log("Organisation data:", response);
        setOrg(response?.payload);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error fetching organisation data:", error);
      });
  }, [dispatch]);

  const handleOptionChange = (event, option) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    console.log(option, "done");
    if (option === "> 500") {
      const optionNew = "500 - 1000";
      console.log(optionNew, "done");
      const [staff_count_min, staff_count_max] = optionNew
        ?.split(" - ")
        ?.map(Number);
      setSelectedOption(option);
      setStaffMaxCount(staff_count_max);
      setStaffMinCount(staff_count_min);
    } else {
      const [staff_count_min, staff_count_max] = option
        ?.split(" - ")
        ?.map(Number);
      setSelectedOption(option);
      setStaffMaxCount(staff_count_max);
      setStaffMinCount(staff_count_min);
    }
  };

  const handleCurrencyChange = (event) => {
    setError("");
    setSuccess("");
    console.log(event.target.value, "done");
    setSelectedCurrency(event.target.value);
  };

  const options = ["0 - 10", "50 - 100", "100 - 200", "200 - 500", "> 500"];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    if (staff_count_max || selectedCurrency || selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("logo", selectedFile);
      formData.append("currency", selectedCurrency);
      formData.append("staff_count_max", staff_count_max);
      formData.append("staff_count_min", staff_count_min);

      try {
        const response = await dispatch(updateOrganisation(formData));
        setLoading(false);
        console.log("whwhhwh", response);
        if (response?.payload?.status === 200) {
          setSuccess("Organisation Basic Information Updated Successfully");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error:", error);
      }
    } else {
      setError("No New Changes to Update");
    }
  };

  return {
    selectedOption,
    selectedCurrency,
    selectedFile,
    org,
    imageUrl,
    staff_count_max,
    staff_count_min,
    loading,
    error,
    success,
    isLoading,
    handleFileChange,
    handleOptionChange,
    handleCurrencyChange,
    options,
    handleSubmit,
  };
};

export default useOrganizationBasicInfoForm;
