import Logo from "@/components/Logo/Logo";
import Image from "next/image";

const InboxHeader = () => {
  return (
    <div className="border-1 fluid py-[0.5rem] flex justify-between items-center flex-wrap">
      <span className="md:hidden">
        <Logo />
      </span>

      <h1 className="font-[700] text-[1.2rem]">@divineobi007</h1>

      <button>
        <Image height={32} width={32} src="/create.png" alt="" />
      </button>
    </div>
  );
};
export default InboxHeader;
