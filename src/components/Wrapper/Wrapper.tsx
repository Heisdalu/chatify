import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="px-[1rem] sm:px-[1rem]">{children}</div>;
};
export default Wrapper;
