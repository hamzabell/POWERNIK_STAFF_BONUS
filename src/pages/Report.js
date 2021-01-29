import React, { useEffect } from "react";
import axios from "axios";

import {
  WithSideNavigation,
  ComponentWrapper,
  WithReportsModal,
  CustomTable,
} from "../components";
import { useGlobalContext } from "../context";

const STAFF_TABLE_COLUMNS = [
  {
    Header: "Email Address",
    accessor: "email",
  },
  {
    Header: "First Name",
    accessor: "first",
  },
  {
    Header: "Last Name",
    accessor: "last",
  },
];
const MOBILE_STAFF_TABLE_COLUMNS = [
  {
    Header: "First Name",
    accessor: "first",
  },
];
function Reports(props) {
  const [state, dispatch] = useGlobalContext();

  useEffect(() => {
    if (state.staffs === null) {
      axios
        .get("/api/get-staffs")
        .then((res) => res.data)
        .then((data) => dispatch({ type: "GET_STAFFS", payload: data.data }));
    }
  }, []);

  const open = (formName) => props.openModal(formName);

  const formatData = (data) => {
    const formattedData = data.map((dt) => ({
      first: dt.name.first,
      last: dt.name.last,
      email: dt.email,
      thumbnail: dt.picture.thumbnail,
    }));
    return formattedData;
  };

  return (
    <ComponentWrapper>
      <div className="flex  flex-col-reverse items-center md:flex-row-reverse bg-white p-3 shadow-sm rounded-md  mt-10 md:mr-3 md:mt-0">
        <button
          onClick={() => open("generate")}
          className="bg-purple-500 text-white text-md font-semibold rounded-lg p-2 shadow-md hover:shadow-xl w-72 mt-2 md:mt-0 md:w-44"
        >
          Generate Report
        </button>
        <button
          onClick={() => open("log")}
          className="bg-blue-600 text-white text-md font-semibold rounded-lg p-2 shadow-md hover:shadow-xl md:mr-4 w-72 md:w-52"
        >
          Log Resumption Times
        </button>
      </div>

      <div className="flex flex-col p-6 shadow-sm bg-white mt-4 md:mr-3 rounded-lg">
        <div className="text-3xl tracking-wider mb-6 flex ">All Staffs</div>
        {state.staffs && (
          <>
            <CustomTable
              tableData={formatData(state.staffs)}
              tableColumns={STAFF_TABLE_COLUMNS}
              otherClassNames="hidden md:block"
              tableClassNames="min-w-full"
              withProfileImage
              hasAction
            />
            <CustomTable
              tableData={formatData(state.staffs)}
              tableColumns={MOBILE_STAFF_TABLE_COLUMNS}
              otherClassNames="md:hidden"
              tableClassNames="w-full"
              hasAction
            />
          </>
        )}
        {!state.staffs && (
          <div className="flex justify-center item-center text-xl">
            Loading...
          </div>
        )}
      </div>
    </ComponentWrapper>
  );
}

export default WithReportsModal(WithSideNavigation(Reports));
