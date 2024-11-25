import React, { FC, useState } from "react";
import "./Category.scss";

type AddCategoryModalProps = {
  addCategory: (categoryName: string) => void;
  closeModal: () => void;
};

export const AddCategoryModal: FC<AddCategoryModalProps> = ({ addCategory, closeModal }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      addCategory(categoryName);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Category</h2>
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <button onClick={handleAddCategory} className="btn">Add</button>
        <button onClick={closeModal} className="btn">Cancel</button>
      </div>
    </div>
  );
};