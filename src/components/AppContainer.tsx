import { ReactNode } from "react";
import LeftSide from "./sides/LeftSide";
import RightSide from "./sides/RightSide";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  return (
    <div className="flex md:mx-10">
      <LeftSide />
      <div className="w-full md:border-x-[1px] md:border-x-gray-500">
        {children}
      </div>
      {/* <RightSide /> */}
    </div>
  );
};

export default AppContainer;
