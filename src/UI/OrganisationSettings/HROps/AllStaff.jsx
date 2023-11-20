import React, { useEffect, useState } from "react";
import "../../../assets/css/OrgBasicInfo.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allUsers, deleteStaff } from "../../../redux/profile/Profile";
import Loader from "../../Components/AuthComponents/Loader";
import ProfileAvatar from "../../Components/ProfileAvatar";
import { MdKeyboardArrowRight } from "react-icons/md";
import QuickLinks from "../../Quicklinks/Quicklinks";

const AllStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchStaff, setSearchStaff] = useState("");
  const [searchStaffErr, setSearchStaffErr] = useState("");
  const [allStaff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);



  const handleDeleteStaff = (userId) => {
    dispatch(deleteStaff(userId))
      .then((response) => {
        console.log('Staff deleted successfully:', response);
      })
      .catch((error) => {
        console.error('Error deleting staff:', error);
     });
  };

  const handleModifyClick = (selectedItem) => {
    const user_id = selectedItem.id;
    console.log(user_id, "yeahhhh");
    navigate(`/admin-edit-staff/${user_id}`);
  };

  const handleChangeSearchStaff = (event) => {
    setError("");
    setSearchStaffErr("");
    const inputValue = event.target.value;
    setSearchStaff(inputValue);
    if (filteredStaff.length === 0 && inputValue.trim() !== "") {
      setSearchStaffErr("No matching staff found");
    }
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const openModalDelete = (item) => {
    setSelectedItem(item);
    setShowModalDelete(true);
  };

  const closeModal = () => {
    setShowModal(false);
    openModalDelete()
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(allUsers());
        setLoading(false);
        setStaff(response?.payload);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredStaff = allStaff.filter((item) =>
    `${item.first_name} ${item.last_name}`
      .toLowerCase()
      .includes(searchStaff.toLowerCase())
  );
  console.log(filteredStaff, "filteredStaff");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="forms-kyc-org">
          <section className="org-forms-section">
            <div className="org-forms-kyc">
              <div className="org-forms-forms">
                <div className="org-forms-inputs">
                  <label
                    style={{ fontSize: 16, fontWeight: 900, paddingTop: 24 }}
                    className="all-staff-texts-contents-span-name"
                  >
                    Search for a Staff
                  </label>
                  <input
                    placeholder="Search for Staff"
                    style={
                      searchStaffErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    value={searchStaff}
                    onChange={handleChangeSearchStaff}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {searchStaffErr && (
                    <p style={{ color: "red", marginTop: 0 }}>
                      {searchStaffErr}
                    </p>
                  )}
                </div>

                <div className="org-forms-inputs">
                  {filteredStaff?.length > 0 ? (
                    <div
                      style={{
                        marginBottom: 60,
                      }}
                    >
                      <p
                        style={{
                          marginBottom: 12,
                        }}
                        className="all-staff-texts-contents-span-name margin-top"
                      >
                        Search Results
                      </p>{" "}
                      {filteredStaff?.map((item) => (
                        <div key={item.id} onClick={() => openModal(item)}>
                          <div className="all-staff-style">
                            <div className="all-staff-div-flex">
                              <div className="all-staff-div-main-left-contents">
                                <div className="all-staff-div-img-and-text">
                                  <div className="all-staff-img-width">
                                    {item?.uploads?.[0]?.location ? (
                                      <img
                                        className="all-staff-img"
                                        src={item?.uploads?.[0]?.location}
                                        alt="profile-picture"
                                      />
                                    ) : (
                                      <ProfileAvatar
                                        userId={item?.id}
                                        firstName={item?.first_name}
                                        lastName={item?.last_name}
                                      />
                                    )}
                                  </div>

                                  <div className="all-staff-texts-contents">
                                    <span className="all-staff-texts-contents-span-name">
                                      {`${item.first_name} ${item.last_name}`}
                                    </span>
                                    <span className="all-staff-texts-contents-span-p">
                                      {item?.job_title}
                                    </span>
                                  </div>
                                </div>
                                <div className="all-staff-div-img-and-text">
                                  <span className="all-staff-texts-contents-span-p hide"></span>
                                  <MdKeyboardArrowRight />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <p className="all-staff-texts-contents-span-name margin-top">
                    All Staff
                  </p>
                  {allStaff?.map((item) => (
                    <div key={item.id} onClick={() => openModal(item)}>
                      <div className="all-staff-style">
                        <div className="all-staff-div-flex">
                          <div className="all-staff-div-main-left-contents">
                            <div className="all-staff-div-img-and-text">
                              <div className="all-staff-img-width">
                                {item?.uploads?.[0]?.location ? (
                                  <img
                                    className="all-staff-img"
                                    src={item?.uploads?.[0]?.location}
                                    alt="profile-picture"
                                  />
                                ) : (
                                  <ProfileAvatar
                                    userId={item?.id}
                                    firstName={item?.first_name}
                                    lastName={item?.last_name}
                                  />
                                )}
                              </div>

                              <div className="all-staff-texts-contents">
                                <span className="all-staff-texts-contents-span-name">
                                  {`${item.first_name} ${item.last_name}`}
                                </span>
                                <span className="all-staff-texts-contents-span-p">
                                  {item?.job_title}
                                </span>
                              </div>
                            </div>
                            <div className="all-staff-div-img-and-text">
                              <span className="all-staff-texts-contents-span-p hide"></span>
                              <MdKeyboardArrowRight />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="org-flex-second">
            <section className="width-org-resize">
              <QuickLinks />
            </section>
          </section>
          {showModal && (
            <div className="modal">
              <div className="modal-contents">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <div className="auth-modal-div">
                  <h2 className="auth-modal-h2 get-staff-img get-staff-text">
                    Profile
                  </h2>

                  <div className="get-staff-img">
                    {selectedItem?.uploads?.[0]?.location ? (
                      <img
                        className="all-staff-img"
                        src={selectedItem?.uploads?.[0]?.location}
                        alt="profile-picture"
                      />
                    ) : (
                      <ProfileAvatar
                        userId={selectedItem?.id}
                        firstName={selectedItem?.first_name}
                        lastName={selectedItem?.last_name}
                      />
                    )}
                  </div>

                  <div className="get-staff-div">
                    <h2 className="get-staff-name get-staff-text">
                      {`${selectedItem?.first_name} ${selectedItem?.last_name}`}
                    </h2>
                    <p className="text-align all-staff-texts-contents-span-p">
                      {selectedItem?.job_title}
                    </p>
                    <br />
                    <h2 className="get-staff-img get-staff-text">
                      NGN{selectedItem?.annual_basic_salary?.toLocaleString()}
                      /per annum
                    </h2>
                    <p className="text-align all-staff-texts-contents-span-p">
                      Email: {selectedItem?.email}
                    </p>
                    <p className="text-align all-staff-texts-contents-span-p">
                      Contract Type: {selectedItem?.contract_type}
                    </p>
                    <br />
                    <br />
                    <button
                      onClick={() => handleModifyClick(selectedItem)}
                      className="get-staff-button-view-permission"
                    >
                      Modify
                    </button>

                    {/* <button className="get-staff-button">Modify</button> */}
                    <button className="get-staff-button-discard">
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <section className="org-flex-second"></section>
        </section>
      )}
    </>
  );
};

export default AllStaff;
