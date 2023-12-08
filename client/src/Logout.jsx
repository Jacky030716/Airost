import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("utmId");
        navigate("/login");
    };
  
    return (
      <div>
        <h2>Logout</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

export default Logout