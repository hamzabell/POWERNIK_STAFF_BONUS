import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import DateTimePicker from "react-datetime-picker";
import Dropdown from "react-dropdown";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "react-loader-spinner";

const LOG_FORM_INITIAL_STATE = {
  selectedStaff: "",
  selectedDate: new Date(),
  bonus: 0,
};

function LogForm(props) {
  const RESUMPTION_TIME = new Date();
  RESUMPTION_TIME.setHours(9, 0, 0, 0);
  const FIVE_MIN_IN_MS = 300000;
  const BONUS_AMOUNT = 50;
  const [state] = useGlobalContext();
  const [logFormState, setLogFormState] = useState(LOG_FORM_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const onSelect = (e) => {
    setLogFormState((prev) => ({
      ...prev,
      selectedStaff: e.value,
    }));
  };

  useEffect(() => {
    if (state.staffs !== null) {
      state.staffs.forEach((staff) => {
        setOptions((prev) => [
          ...prev,
          {
            label: `${staff.name.title}. ${staff.name.first} ${staff.name.last}`,
            value: staff._id,
          },
        ]);
      });
    }

    return () => {};
  }, [state.staffs]);

  useEffect(() => {
    let bonusReceived = 0;
    const timePastInMs = RESUMPTION_TIME - logFormState.selectedDate;
    if (timePastInMs > 0) {
      const no_of_5_minutes = Math.floor(timePastInMs / FIVE_MIN_IN_MS);
      bonusReceived = no_of_5_minutes * BONUS_AMOUNT;
    }
    setLogFormState((prev) => ({
      ...prev,
      bonus: bonusReceived,
    }));
  }, [logFormState.selectedDate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (logFormState.selectedStaff === "") {
      toast.info("Hey there! Selected the Staff");
    }
    const bonusStringified = `${logFormState.bonus}`;
    axios
      .post("/api/create-bonus", {
        staff: logFormState.selectedStaff,
        dateCreated: logFormState.selectedDate.toISOString(),
        bonus: bonusStringified,
      })
      .then((res) => {
        setIsLoading(false);
        const bonusData = res.data.bonus;
        toast.success(
          `Bonus for ${bonusData.createBonus.staff.name.first} ${bonusData.createBonus.staff.name.last} has been Issued`
        );
      })
      .catch((err) => toast.error(`An Error occurred ${err}`));
  };

  return (
    <>
      {state.staffs ? (
        <form onSubmit={onSubmit} className="flex flex-col justify-between">
          <div>
            <Dropdown
              options={options}
              onChange={onSelect}
              value={logFormState.selectedStaff}
              placeholder="Select  Staff Name"
            />
            <div className="flex flex-col justify-center mt-8">
              <label className="text-center mb-2 text-xl">Staff Time In</label>
              <DateTimePicker
                className="border border-gray-500 p-2"
                onChange={(date) =>
                  setLogFormState((prev) => ({
                    ...prev,
                    selectedDate: date,
                  }))
                }
                value={logFormState.selectedDate}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 mb-4">
            <div className="text-red-500 font-semibold text-sm ">
              <h1>Bonus Recievable</h1>
              <p className="text-right font-bold">₦{logFormState.bonus}</p>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer bg-blue-500 flex justify-center text-white text-md font-semibold rounded-lg p-3 shadow-md hover:shadow-xl w-64 md:w-96"
          >
            Log Staff Resumption Time
            {isLoading && (
              <Loader type="ThreeDots" color="#ffffff" height={30} width={30} />
            )}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default LogForm;
