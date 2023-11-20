import React from "react";

const generateColorFromUserId = (userId) => {
  const hash = userId.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + (acc << 6) + (acc << 16) - acc;
  }, 0);
  const colors = ["#4285F4", "#0F9D58", "#F4B400", "#DB4437"];
  const colorIndex = Math.abs(hash % colors.length);

  return colors[colorIndex];
};

const generateInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

const ProfileAvatar = ({ userId, firstName, lastName }) => {
  const initials = generateInitials(firstName, lastName);
  const backgroundColor = generateColorFromUserId(userId);

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  );
};

export default ProfileAvatar;
