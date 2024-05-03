import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-[2rem] sm:py-[2.5rem] px-[1rem] sm:px-[1rem] md:px-[3rem] lg:px-[4rem] xl:px-[6rem]">
      {children}
    </div>
  );
};

export default Wrapper;
