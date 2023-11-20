import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrganisation, updateOrganisation } from "../../../redux/profile/Profile";

const useOrgBasicInfoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [org, setOrg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [staff_count_max, setStaffMaxCount] = useState("");
  const [staff_count_min, setStaffMinCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [staff_count_max_Err, setStaffMaxCountErr] = useState("");
  const [selectedCurrencyErr, setSelectedCurrencyErr] = useState("");
  const [selectedFileErr, setSelectedFileErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFileErr("");
    setError("");

    const file = event.target.files[0];

    if (!file) {
      setSelectedFileErr("Choose an image to upload");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setSelectedFileErr("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSelectedFileErr("Image size should be below 5MB");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrganisation())
      .then((response) => {
        console.log("Organisation data:", response.payload.data);
        setIsLoading(false);
        setOrg(response?.payload?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error fetching organisation data:", error);
      });
  }, [dispatch]);


  const handleOptionChange = (event, option) => {
    event.preventDefault();

    console.log(option, "done");
    setStaffMaxCountErr("");
    setError("");
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
    setSelectedCurrencyErr("");
    setError("");
    console.log(event.target.value, "done");
    setSelectedCurrency(event.target.value);
  };

  const options = ["0 - 10", "50 - 100", "100 - 200", "200 - 500", "> 500"];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSelectedCurrencyErr("");
    setError("");
    setStaffMaxCountErr("");
    setSelectedFileErr("");

    if (!staff_count_max) {
      setStaffMaxCountErr("Choose an option to Proceed");
    }
    if (!selectedCurrency) {
      setSelectedCurrencyErr("Choose a Currency to Proceed");
    }
    if (!selectedFile) {
      setSelectedFileErr("Choose an image to upload");
    }

    if (staff_count_max && selectedCurrency && selectedFile) {
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
          navigate("/admin-setup-organisation-kyc");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error:", error);
      }
    } else {
      setError("Fill all forms to proceed");
    }
  };

  const user = useSelector((state) => state?.auth);
  const reduxState = localStorage.getItem("reduxState");
  const userLoaded = JSON.parse(reduxState)?.auth?.user;
  console.log(userLoaded, JSON.parse(reduxState), "yeah");

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
    staff_count_max_Err,
    selectedCurrencyErr,
    selectedFileErr,
    isLoading,
    handleFileChange,
    handleOptionChange,
    handleCurrencyChange,
    options,
    handleSubmit,
  };
};

export default useOrgBasicInfoForm;
