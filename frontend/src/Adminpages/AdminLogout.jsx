import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");

   
   
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default AdminLogout;