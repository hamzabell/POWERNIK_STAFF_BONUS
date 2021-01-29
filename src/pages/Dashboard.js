import React, { useState, useEffect } from "react";
import {
  PrivateRoute,
  WithSideNavigation,
  ComponentWrapper,
  Card,
  WithReportsModal,
} from "../components";
import {
  FaUsers,
  FaSortNumericUpAlt,
  FaSortNumericDownAlt,
} from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";

const StyledButton = styled.button`
  background: #577bf9;
`;

const METRICS_INITIAL_STATE = {
  no_of_staff: 0,
  totalBonuses: 0,
  highestBonus: 0,
};
function Dashboard(props) {
  const convertToThousands = (amount) => {
    if (amount < 1000) {
      return `${amount}`;
    }
    return `${amount / 1000}k`;
  };
  const [metrics, setMetrics] = useState(METRICS_INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/get-metrics")
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        setMetrics({
          no_of_staff: data.number_of_staffs,
          totalBonuses: data.totalBonuses,
          highestBonus: data.highestBonus,
        });
      });
  }, []);

  return (
    <PrivateRoute>
      <ComponentWrapper>
        <div className="flex md:flex-row md:space-y-0 md:space-x-3 space-x-0 space-y-6 flex-col items-center  mt-10 md:mt-0">
          <div className="hidden md:block">
            <StyledButton
              onClick={() => props.openModal("generate")}
              className="p-4  flex  flex-col justify-center  items-center rounded-xl m-3 text-white font-semibold  text-lg"
            >
              <IoMdAddCircle className="w-10 h-10 text-white" />
              <p className="mt-2">Generate Report</p>
            </StyledButton>
          </div>
          <div className="md:hidden ">
            <StyledButton
              onClick={() => props.openModal("log")}
              className="p-4  flex flex-col justify-center  md:hidden  items-center rounded-xl m-3 text-white font-semibold  text-lg"
            >
              <IoMdAddCircle className="w-10 h-10 text-white" />
              <p className="mt-2">Log Resumption Times</p>
            </StyledButton>
          </div>
          <Card
            count={convertToThousands(metrics.no_of_staff)}
            title="Number of Staffs"
            Icon={FaUsers}
            isLoading={loading}
            iconColor="#202C39"
          />
          <Card
            count={`₦${convertToThousands(metrics.totalBonuses)}`}
            title="Total Bonuses"
            Icon={GiPayMoney}
            isLoading={loading}
            iconColor="#8DE969"
          />
          <Card
            count={`₦${convertToThousands(metrics.highestBonus)}`}
            title="Highest Bonus"
            Icon={FaSortNumericUpAlt}
            isLoading={loading}
            iconColor="#FF595E"
          />
        </div>
      </ComponentWrapper>
    </PrivateRoute>
  );
}

export default WithReportsModal(WithSideNavigation(Dashboard));
