import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [utmId, setUtmId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setSuccessMessage(""); // Reset any previous success message

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios.put(`http://localhost:8081/resetpassword/${utmId}`, { newPassword })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError("Password reset failed");
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Password Reset</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleReset}>
        <label htmlFor="utmId">UTM ID:</label>
        <input
          type="text"
          id="utmId"
          value={utmId}
          onChange={(e) => setUtmId(e.target.value)}
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
