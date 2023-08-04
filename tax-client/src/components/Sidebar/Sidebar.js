import React, { useState } from "react";
import UploadFiles from "./UploadFiles";
import MyReturns from "./MyReturns";
import BankProducts from "./BankProducts";
import MyProperties from "./MyProperties";
import MyDependents from "./MyDependents";
import "./Sidebar.css";

const Sidebar = () => {
  const date = new Date();
  const currentYear =
    date.getMonth() >= 9 ? date.getFullYear() : date.getFullYear() - 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="sidebar">
      <h2>Tax Year: {selectedYear}</h2>
      <select value={selectedYear} onChange={handleChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <UploadFiles />
      <MyReturns />
      <BankProducts />
      <MyProperties />
      <MyDependents />
    </div>
  );
};

export default Sidebar;
