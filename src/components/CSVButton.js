import React from "react";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

function CSVButton({ data, fileName }) {
  const dataExportToast = () => {
    toast.success("😊 Data Exported Successfully");
  };
  return (
    <CSVLink data={data} filename={`${fileName}.csv`}>
      <button
        onClick={() => dataExportToast()}
        className="bg-green-500 text-white text-md font-semibold rounded-lg p-2 shadow-md hover:shadow-xl w-52 mt-2 md:mt-0 md:w-44"
      >
        Export Bonus Report
      </button>
    </CSVLink>
  );
}

export default CSVButton;
