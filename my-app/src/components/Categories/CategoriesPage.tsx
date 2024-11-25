import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.scss";
import { AddCategoryModal } from "./AddCategoryModal";

export const CategoryPage: FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load categories from localStorage
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(storedCategories);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addCategory = (categoryName: string) => {
    const updatedCategories = [...categories, categoryName];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    closeModal();
  };

  const deleteCategory = (categoryName: string) => {
    const updatedCategories = categories.filter(category => category !== categoryName);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/todolist/${category}`);
  };

  return (
    <div className="category-page">
      <h1>Categories</h1>
      <button onClick={openModal} className="btn">Add Category</button>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-card" onClick={() => handleCategoryClick(category)}>
            <span>{category}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteCategory(category); }} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
      {isModalOpen && <AddCategoryModal addCategory={addCategory} closeModal={closeModal} />}
    </div>
  );
};