import { ReactNode } from "react";
import LeftSide from "./sides/LeftSide";
import RightSide from "./sides/RightSide";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  return (
    <div className="mx-10 flex">
      <LeftSide />
      <div className="w-2/4 border-x-[1px] border-x-gray-500">{children}</div>
      <RightSide />
    </div>
  );
};

export default AppContainer;
