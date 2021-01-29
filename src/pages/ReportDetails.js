import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ComponentWrapper, CustomTable, CSVButton } from "../components";
import _ from "lodash";
import { useGlobalContext } from "../context";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

const STAFF_REPORT_INITIAL_STATE = {
  staff: null,
  bonus: null,
};
const STAFF_BONUS_COLUMNS = [
  {
    Header: "Bonus Creation Date",
    accessor: "dateCreated",
  },
  {
    Header: "Bonus Recieved",
    accessor: "bonus",
  },
];
function StaffDetails(props) {
  const history = useHistory();
  const location = useLocation();
  const [state] = useGlobalContext();
  const [staffBonus, setStaffBonus] = useState(STAFF_REPORT_INITIAL_STATE);

  useEffect(() => {
    const firstName = location.pathname.split("/").splice(-1)[0];
    console.log(state.staffs);
    if (state.staffs !== null) {
      const data = _.filter(
        state.staffs,
        (staff) => staff.name.first === firstName
      );
      if (data.length !== 0) {
        const staff = data[0];
        axios
          .get("/api/get-bonuses", { params: { staff: staff._id } })
          .then((res) => {
            toast.info("😊 Data is being generated");
            return res.data;
          })
          .then((data) => setStaffBonus({ staff, bonus: data.bonusData }));
      } else {
        setStaffBonus({ staff: "DOES_NOT_EXIST", bonus: "NO_BONUSES" });
      }
    }
  }, [state.staffs]);

  const formatBonus = (bonus) => {
    const CSVFormattedBonus = bonus.map((bns) => ({
      "Date Bonus was Issued": bns.dateCreated,
      "Bonus Received": bns.bonus,
    }));

    return CSVFormattedBonus;
  };

  return (
    <ComponentWrapper>
      <div className="flex p-5 mt-20 md:mt-0 shadow-sm bg-white rounded-lg">
        {staffBonus.staff === null || staffBonus.staff === "DOES_NOT_EXIST" ? (
          <div className="flex text-xl justify-center items-center w-full">
            {staffBonus.staff !== "DOES_NOT_EXIST" ? (
              <p>Loading Staff Data...</p>
            ) : (
              <p>
                😪 We have thoroughly searched our Database "
                {location.pathname.split("/").splice(-1)[0]}" does not exist
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col cursor-pointer w-full">
              <div className="flex justify-between ">
                <div onClick={() => history.push("/report")}>
                  <BiArrowBack className="text-gray-600 w-8 h-8 hover:h-12 hover:w-12 transition ease-out" />
                </div>
                <CSVButton
                  data={formatBonus(staffBonus.bonus)}
                  fileName={`${staffBonus.staff.name.first}_${staffBonus.staff.name.last}_BONUS_REPORT`}
                />
              </div>
              <div className="flex flex-col md:flex-row md:grid md:grid-cols-3  mt-8 px-4">
                <div className="rounded-full md:w-80 md:col-span-1 mb-4 flex justify-center md:block md:justify-start">
                  <img
                    src={staffBonus.staff.picture.large}
                    className="rounded-full h-52 w-52"
                    alt="Staff"
                  />
                </div>
                <div className="col-span-2 flex  justify-center w-full ">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-0 mt-3 md:gap-20 ml-4 pl-4 pr-16 py-4">
                    <div>
                      <div className="flex flex-col  mb-5">
                        <label className="text-gray-400 text-semibold text-sm uppercase">
                          Title
                        </label>
                        <div className="text-gray-600 mt-2">
                          {staffBonus.staff.name.title}
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-400 text-semibold text-sm uppercase">
                          Gender
                        </label>
                        <div className="text-gray-600 mt-2">
                          {staffBonus.staff.gender}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col  mb-5">
                        <label className="text-gray-400 text-semibold text-sm uppercase">
                          First Name
                        </label>
                        <div className="text-gray-600 mt-2">
                          {staffBonus.staff.name.first}
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-400 text-semibold text-sm uppercase">
                          Phone
                        </label>
                        <div className="text-gray-600 mt-2">
                          {staffBonus.staff.phone}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col mb-5">
                        <label className="text-gray-400 text-semibold text-sm uppercase">
                          Last Name
                        </label>
                        <div className="text-gray-600 mt-2">
                          {staffBonus.staff.name.last}
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-400 text-semibold text-sm uppercase">
                          Email
                        </label>
                        <div className="text-gray-600 mt-2">
                          {staffBonus.staff.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex p-12 shadow-sm bg-white mt-4 rounded-lg">
        {staffBonus.bonus === null || staffBonus.bonus === "NO_BONUSES" ? (
          <div className="flex text-xl justify-center items-center w-full">
            {staffBonus.staff !== "DOES_NOT_EXIST" ? (
              <p>Getting Bonus Report...</p>
            ) : (
              <p>No Bonus Report</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col text-lg  w-full">
            <div className="text-2xl tracking-wider mb-6 flex ">
              All Bonuses Recieved by {staffBonus.staff.name.first}{" "}
              {staffBonus.staff.name.last}
            </div>
            <CustomTable
              tableData={staffBonus.bonus}
              tableColumns={STAFF_BONUS_COLUMNS}
              tableClassNames="w-full"
            />
          </div>
        )}
      </div>
    </ComponentWrapper>
  );
}

export default StaffDetails;
