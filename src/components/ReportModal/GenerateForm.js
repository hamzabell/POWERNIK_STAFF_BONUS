import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Dropdown from "react-dropdown";
import { useHistory } from "react-router-dom";

function GenerateForm(props) {
  const [state, dispatch] = useGlobalContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const history = useHistory();

  const onSelect = (e) => {
    setSelectedOption(e.value);
  };
  useEffect(() => {
    if (state.staffs !== null) {
      state.staffs.forEach((staff) => {
        setOptions((prev) => [
          ...prev,
          {
            label: `${staff.name.title}. ${staff.name.first} ${staff.name.last}`,
            value: staff.name.first,
          },
        ]);
      });
    }

    return () => {};
  }, [state.staffs]);

  return (
    <>
      {state.staffs ? (
        <div className="flex flex-col justify-between">
          <div>
            <Dropdown
              options={options}
              onChange={onSelect}
              value={selectedOption}
              placeholder="Select  Staff Name"
            />
          </div>

          <div
            onClick={() => history.push(`/report/${selectedOption}`)}
            className="cursor-pointer bg-purple-500 flex justify-center text-white text-md font-semibold rounded-lg p-3 shadow-md hover:shadow-xl w-44 md:w-96 mt-20"
          >
            Generate Report
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default GenerateForm;
