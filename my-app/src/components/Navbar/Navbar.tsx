import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.scss";

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // localStorage.removeItem('user');
      navigate('/login');
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="navbar">
      <div className="navbar__content">
        <span className="navbar__email">{user.email}</span>
        <button className="navbar__logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};