import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrganisation, updateData } from "../../../redux/profile/Profile";

const useContactAdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);;
  };

  const openModal = () => {
    setShowModal(true);
  };


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadID, setUploadID] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [uploadIDErr, setUploadIDErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleChangeFirstName = (event) => {
    setFirstNameErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setFirstName(capitalizedValue);
  };

  const handleChangeLastName = (event) => {
    setLastNameErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setLastName(capitalizedValue);
  };

  const handleChangeTitle = (event) => {
    setTitleErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setTitle(capitalizedValue);
  };

  const handleChangePhoneNumber = (event) => {
    setPhoneNumberErr("");
    setError("");
    const inputPhoneNumber = event.target.value.replace(/\D/g, "");
    console.log(inputPhoneNumber, "done");
    setPhoneNumber(inputPhoneNumber);
  };

  const handleChangeEmail = (event) => {
    setEmailErr("");
    setError("");
    const enteredEmail = event.target.value.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(enteredEmail, "enter");
    setEmail(enteredEmail);
    if (!emailRegex.test(event.target.value.toLowerCase())) {
      setEmailErr("Enter a valid email address 'example@gmail.com'");
    } else {
      setEmail(enteredEmail);
      console.log(enteredEmail, "done");
    }
  };
  console.log(email, "enterss");

  const handleChangeUploadID = (event) => {
    setUploadIDErr("");
    setError("");

    const file = event.target.files[0];

    if (!file) {
      setUploadIDErr("");
      ("Choose an image to upload");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadIDErr("");
      ("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadIDErr("");
      ("Image size should be below 5MB");
      return;
    }

    setUploadID(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstNameErr("");
    setLastNameErr("");
    setEmailErr("");
    setTitleErr("");
    setPhoneNumberErr("");
    setUploadIDErr("");
    setError("");

    if (!firstName) {
      setFirstNameErr("Select admin's first name");
    }
    if (!lastName) {
      setLastNameErr("Enter admin's last name");
    }
    if (!email) {
      setEmailErr("Enter admin's Valid Email Address");
    }

    if (!title) {
      setTitleErr("Enter admin's Job Title");
    }
    if (!phoneNumber) {
      setPhoneNumberErr("Enter a valid phone number");
    }
    if (!uploadID) {
      setUploadIDErr("Select an Image to upload");
    }

    if (firstName && lastName && title && email && phoneNumber && uploadID) {
      setLoading(true);
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("job_title", title);
      formData.append("phone", phoneNumber);
      formData.append("id", uploadID);
      try {
        const response = await dispatch(updateData(formData));
        setLoading(false);
        console.log("whwhhwh", response);
        if (response?.payload?.status === 200) {
          openModal()
          // navigate("/admin-organisation-kyc");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error:", error);
      }
    } else if (error.response?.status >= 500) {
      setError("Internal Server Error");
    } else {
      setError("Fill all forms to proceed");
    }
  };

  const fetchOrganisation = async () => {
    try {
      const response = await dispatch(getOrganisation());
      console.log("Organisation data:", response.payload.data);
    } catch (error) {
      console.log("Error fetching organisation data:", error);
    }
  };

  useEffect(() => {
    fetchOrganisation();
  }, [dispatch]);

  return {
    firstName,
    lastName,
    email,
    title,
    phoneNumber,
    uploadID,
    firstNameErr,
    lastNameErr,
    emailErr,
    titleErr,
    phoneNumberErr,
    uploadIDErr,
    loading,
    error,
    imageUrl,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeTitle,
    handleChangePhoneNumber,
    handleChangeEmail,
    handleChangeUploadID,
    handleSubmit,
    showModal
  };
};

export default useContactAdminForm;
