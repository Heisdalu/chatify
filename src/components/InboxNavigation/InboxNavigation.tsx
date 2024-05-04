import Image from "next/image";
import Link from "next/link";

const InboxNavigation = () => {
  return (
    <div className="bg-white fixed flex  items-center justify-center bottom-0 border-t-1 w-[100%] py-[1rem] px-[1rem] md:w-auto border-1 left-[50%] translate-x-[-50%] md:p-[0] md:bottom-[3rem] md:rounded-[10px] md:overflow-hidden">
      <div className="grid grid-cols-2 w-[200px]">
        <button className="flex items-center flex-col justify-center p-[0.5rem] hover:bg-gray-200">
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
        <Link
          href="/settings"
          className="border-l-1 flex items-center flex-col justify-center p-[0.5rem] hover:bg-gray-200"
        >
          <Image height={30} width={30} src="/setting.png" alt="" />
          <span className="text-[0.8rem]">Settings</span>
        </Link>
      </div>
    </div>
  );
};
export default InboxNavigation;
