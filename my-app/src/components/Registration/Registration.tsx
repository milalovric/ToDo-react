import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./Registration.scss";

export const Registration: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = { email, gender, country };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/login');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="registration">
      <form className="registration__form" onSubmit={handleRegister}>
        <h2>Registration</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={gender === 'other'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};