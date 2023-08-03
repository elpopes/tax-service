import React from "react";
import UploadFiles from "./UploadFiles";
import MyReturns from "./MyReturns";
import BankProducts from "./BankProducts";
import MyProperties from "./MyProperties";
import MyDependents from "./MyDependents";

import React from "react";
import UploadFiles from "./UploadFiles";
import MyReturns from "./MyReturns";
import BankProducts from "./BankProducts";
import MyProperties from "./MyProperties";
import MyDependents from "./MyDependents";

const Sidebar = () => {
  return (
    <div>
      <h2>Tax Year</h2>
      <select>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
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
