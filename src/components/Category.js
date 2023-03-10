import React, { useEffect, useState, useRef } from "react";
import "../styles/category.scss";
import { TiDeleteOutline } from "react-icons/ti";

const Category = () => {
  const emptyCategory = {
    id: 0,
    name: "",
  };
  const [category, setCategory] = useState(emptyCategory);
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const categoryRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!categoryRef.current.contains(e.target)) {
        setShowCategory(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  //show category on/off
  const handleCategory = () => {
    setShowCategory(!showCategory);
  };

  //getting the value in the input
  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  //adding the inputed value in the list
  const handleAdd = () => {
    let userValue = category.name;
    let inputValue = categories.find((a) => a.name === userValue);
    if (!categories.includes(inputValue)) {
      setCategories([...categories, category]);
      setCategory({
        ...emptyCategory,
        id: category.id + 1,
      });
    }
  };

  //adding the items from the input field when "Enter" is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  //Deleting the items from the list
  const handleDelete = (id) => {
    setCategories((c) => {
      return c.filter((ca) => ca.id !== id);
    });
  };

  //selecting the category and displaying it in the category field
  const handleSelectCategory = (e) => {
    setSelectedCategory({
      name: e.name,
    });
    setShowCategory(false);
  };
  return (
    <>
      <div className="category-main-container" ref={categoryRef}>
        <div
          id="display-category"
          className="display-category-field"
          onClick={handleCategory}
        >
          {Object.keys(selectedCategory).length === 0
            ? "Select a category"
            : selectedCategory?.name}
        </div>
        {showCategory && (
          <div className="category-container">
            <div className="category-field">
              <div className="category-input-field">
                <input
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="category-lists">
                {categories &&
                  categories.map((c) => (
                    <div
                      key={c.id}
                      className="options"
                      onClick={(e) => handleSelectCategory(c)}
                    >
                      <div className="option-name">
                        <option value={c.name}>{c.name}</option>
                      </div>
                      <div className="delete-category">
                        <TiDeleteOutline onClick={() => handleDelete(c.id)} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
