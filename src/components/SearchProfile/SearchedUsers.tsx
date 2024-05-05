import Image from "next/image";
import Link from "next/link";

const SearchedUsers = () => {
  return (
    <Link
      href="/inbox/1"
      className="px-[0.5rem] rounded-[10px] py-[0.2rem] flex items-center space-x-[0.5rem] hover:bg-gray-100 cursor-pointer"
    >
      <div aria-label="user image" className="">
        <Image
          height={50}
          width={50}
          src="/humans_talking.svg"
          className="rounded-full border-[1px] border-gray-200"
          alt=""
        />
      </div>

      <div className="space-y-[5px] px-[0.5rem] overflow-hidden">
        <h1 className="user display name font-[500]">dhe_vine</h1>
      </div>
    </Link>
  );
};
export default SearchedUsers;
