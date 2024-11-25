import React, { FC, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Registration } from "./components/Registration";
import { Login } from "./components/Login";
import { WelcomePage } from "./components/WelcomePage";
import { TodoList } from "./components/ToDo/TodoList";
import { NavBar } from "./components/Navbar/Navbar";
import { CategoryPage } from "./components/Categories/CategoriesPage";
import { useAuth } from "./hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

// Add additional routes for the other pages.
export const App: FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const [id, postaviId] = useState(1);

  const [podatak, postaviPodatak] = useState({
    body: "",
    id: null,
    title: "",
    userId: null,
  });

  function dohvatiPodatke() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => postaviPodatak(data));
  }

  useEffect(() => {
    dohvatiPodatke();
  }, [id]);

  function idPromjena(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      postaviId(value);
    }
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      {user && location.pathname !== '/login' && <NavBar />}
      {/* <button onClick={dohvatiPodatke} className="btn">Dohvati Podatke</button>

      <h1>Dohvati podatke</h1>
      <label htmlFor="broj">Unesi Id poruke: </label>
      <input
        onChange={idPromjena}
        type="number"
        min={1}
        max={100}
        value={id}
        id="broj"
      />

      <div>
        <h3>{podatak.id}</h3>
        <p>{podatak.body}</p>
      </div> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/todolist/:category" element={<TodoList />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};