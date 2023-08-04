import React, { useState } from "react";
import Select from "react-select";
import UploadFiles from "./UploadFiles";
import MyReturns from "./MyReturns";
import BankProducts from "./BankProducts";
import MyProperties from "./MyProperties";
import MyDependents from "./MyDependents";
import "./Sidebar.css";

const Sidebar = () => {
  const date = new Date();
  const currentYear =
    date.getMonth() >= 7 ? date.getFullYear() : date.getFullYear() - 1;
  const [selectedYear, setSelectedYear] = useState({
    value: currentYear,
    label: currentYear.toString(),
  });

  const years = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  }));

  const handleChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  return (
    <div className="sidebar">
      <h2>Tax Year: {selectedYear.label}</h2>
      <Select value={selectedYear} onChange={handleChange} options={years} />
      <UploadFiles />
      <MyReturns />
      <BankProducts />
      <MyProperties />
      <MyDependents />
    </div>
  );
};

export default Sidebar;
