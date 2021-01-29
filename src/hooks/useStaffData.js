import axios from "axios";

function useStaffData({ state, dispatch }) {
  const getStaffs = async () => {
    const data = await axios.get("/api/get-staffs").then((res) => res.data);

    return data;
  };

  const allStaffs = getStaffs();
  if (state.staffs === null) {
    dispatch({ type: "GET_STAFFS", payload: allStaffs.data });

    return { staffs: allStaffs.data };
  }

  return { staffs: state.staffs };
}

export default useStaffData;
