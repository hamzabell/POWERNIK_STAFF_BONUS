import React, { useReducer, useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const INITIAL_STATE = {
  currentPage: 1,
  numberOfPages: 0,
  numberPerPage: 5,
};

const SCROLL_COUNT_STATE = {
  begin: 0,
  end: 0,
};

function CustomTable({
  tableColumns,
  tableData,
  withProfileImage,
  hasAction,
  otherClassNames,
  tableClassNames,
}) {
  const history = useHistory();

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_NUMBER_OF PAGES":
        return {
          ...state,
          numberOfPages: Math.ceil(
            action.payload.documentLength / state.numberPerPage
          ),
        };

      case "NEXT_PAGE":
        return { ...state, currentPage: state.currentPage + 1 };

      case "PREV_PAGE":
        return { ...state, currentPage: state.currentPage - 1 };

      case "LAST_PAGE":
        return { ...state, currentPage: state.numberOfPages };
      default:
        return INITIAL_STATE;
    }
  };

  const [state, dispatch] = useReducer(pageReducer, INITIAL_STATE);
  const [scrollCount, setScrollCount] = useState(SCROLL_COUNT_STATE);

  useEffect(() => {
    dispatch({
      type: "INITIALIZE_NUMBER_OF PAGES",
      payload: { documentLength: tableData.length },
    });
  }, [tableData.length]);

  useEffect(() => {
    const begin = (state.currentPage - 1) * state.numberPerPage;
    const end = begin + state.numberPerPage;

    setScrollCount({ begin, end });
  }, [state.currentPage, state.numberPerPage]);

  const previousPage = () => {
    if (state.currentPage !== 1) {
      dispatch({ type: "PREV_PAGE" });
    }
  };
  const nextPage = () => {
    if (state.currentPage !== state.numberOfPages) {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  return (
    <div className={`${otherClassNames}`}>
      <table className={`${tableClassNames}`}>
        <thead>
          <tr>
            {withProfileImage && (
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"></th>
            )}
            {tableColumns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                {col.Header}
              </th>
            ))}
            {hasAction && (
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-red-500 tracking-wider">
                Bonus Report
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {tableData
            .slice(scrollCount.begin, scrollCount.end)
            .map((data, idx) => (
              <tr key={idx}>
                {withProfileImage && (
                  <td>
                    <img
                      src={data.thumbnail}
                      className="rounded-full m-2"
                      alt="thumb"
                    />
                  </td>
                )}
                {tableColumns.map((column, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-blue-900">
                      {data[column.accessor]}
                    </div>
                  </td>
                ))}
                {hasAction && (
                  <td>
                    <button
                      onClick={() => history.push(`/report/${data["first"]}`)}
                      className="bg-blue-600 p-3 text-white font-medium text-sm rounded-full ml-10"
                    >
                      <FaFileExport />
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {tableData.length === 0 && (
        <div className="flex text-xl justify-center w-full mt-5 mr-4">
          No data to show here 😐
        </div>
      )}
      <div className="flex justify-center space-x-3 mt-4">
        <div
          className="text-blue-600 cursor-pointer"
          onClick={() => previousPage()}
        >
          previous |
        </div>
        <div
          className="text-blue-600 cursor-pointer"
          onClick={() => nextPage()}
        >
          next |
        </div>
        <div
          className="text-blue-600 cursor-pointer"
          onClick={() => dispatch({ type: "LAST_PAGE" })}
        >
          last
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
