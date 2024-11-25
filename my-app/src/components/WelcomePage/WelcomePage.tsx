import React, { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./WelcomePage.scss";

interface LocationState {
  email: string;
}

export const WelcomePage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { email } = state || { email: '' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCategoriy = () => {
    navigate('/categories');
  };

  return (
    <div className="welcome-page">
      <div className="welcome-page__content">
        <h1>Welcome, {email}!</h1>
        {/* <button onClick={handleLogout}>Logout</button> */}
        <button onClick={handleCategoriy}>Go to Category</button>
      </div>
    </div>
  );
};