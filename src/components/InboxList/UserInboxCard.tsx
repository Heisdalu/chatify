import Image from "next/image";

const UserInboxCard = () => {
  return (
    <div className="py-[0.2rem] fluid grid [grid-template-columns:70px_5fr_1fr] space-x-[0.5rem] hover:bg-gray-100">
      <div aria-label="user image" className="">
        <Image
          height={60}
          width={60}
          src="/humans_talking.svg"
          className="rounded-full"
          alt=""
        />
      </div>

      <div className="space-y-[5px] px-[0.5rem] overflow-hidden">
        <h1 className="user display name font-[500]">dhe_vinfffffe</h1>
        <p
          aria-label="user last message"
          className="font-[700] overflow-hidden text-ellipsis"
        >
          lasteeeeeeeeeeeeeeeee
        </p>
      </div>
      <div className="self-center justify-self-end h-[8px] w-[8px] bg-[#0095f6] rounded-full"></div>
    </div>
  );
};
export default UserInboxCard;
