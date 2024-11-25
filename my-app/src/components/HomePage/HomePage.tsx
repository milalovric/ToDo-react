import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useAuth } from "../../hooks/useAuth";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  console.log(user);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginOrWelcomeClick = () => {
    if (user) {
      navigate('/welcome');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-page">
      <div className="home-page__welcome">
        <h1>Welcome!</h1>
        <button onClick={handleLoginOrWelcomeClick}>
          {user ? 'Go to Welcome Page' : 'Login'}
        </button>
        {/* <button onClick={handleRegisterClick}>Register</button> */}
      </div>
    </div>
  );
};