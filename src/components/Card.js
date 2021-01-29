import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const StyledIconWrapper = styled.div`
  background: ${(props) => props.bg || "#577bf9"};
  color: #ffffff;
`;
function Card({ count, title, Icon, iconColor, isLoading }) {
  return (
    <>
      <div className="py-4 px-3 md:py-2 md:px-1 shadow-sm w-60 hover:shadow-lg rounded-lg bg-white">
        <div className="grid grid-cols-3 gap-14">
          <div className="col-span-1 ">
            <StyledIconWrapper
              className="w-14 p-3  flex justify-center  items-center rounded-2xl m-3"
              bg={iconColor}
            >
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height={30}
                  width={30}
                />
              ) : (
                <Icon className="w-8 h-8 text-white" color="white" />
              )}
            </StyledIconWrapper>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col mt-4">
              <div className="text-sm text-gray-400 font-medium">{title}</div>
              <div className="font-semibold text-xl text-gray-700  tracking-wide w-20 flex flex-wrap">
                {count}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
