import Image from "next/image";
import Logo from "../Logo/Logo";

const InboxNavigation = () => {
  return (
    <div className="fixed flex  items-center justify-center bottom-0 border-t-1 w-[100%] py-[1rem] px-[1rem] md:relative md:[align-items:normal] md:justify-normal">
      <div className="border-1 grid grid-cols-2 w-[200px] md:grid-cols-1 md:w-[auto]">
        <button className="hidden border-1 md:flex items-center flex-col justify-center p-[0.5rem]">
          <div className="h-[30px] w-[30px] overflow-hidden">
            <Logo />
          </div>
          <span className="text-[0.8rem]">Home</span>
        </button>

        <button className="border-1 flex items-center flex-col justify-center p-[0.5rem] hover:bg-gray-200">
          <div className="h-[30px] w-[30px] overflow-hidden">
            <Image
              height={30}
              width={30}
              src="/message.svg"
              alt=""
              aria-hidden={true}
            />
          </div>
          <span className="text-[0.8rem]">Chats</span>
        </button>
        <button className="border-1 flex items-center flex-col justify-center p-[0.5rem] hover:bg-gray-200">
          <Image height={30} width={30} src="/setting.png" alt="" />
          <span className="text-[0.8rem]">Settings</span>
        </button>
      </div>
    </div>
  );
};
export default InboxNavigation;
