import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import SearchProfile from "../SearchProfile/SearchProfile";
import { useState } from "react";

const InboxHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="fluid py-[0.5rem] flex justify-between items-center flex-wrap">
      <span className="">
        <Logo />
      </span>

      <h1 className="font-[700] text-[1.2rem]">@divineobi007</h1>

      <button
        className="active:bg-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image height={32} width={32} src="/create.png" alt="" />
      </button>

      {isOpen && <SearchProfile close={closeHandler} />}
    </div>
  );
};
export default InboxHeader;
