import Link from "next/link";
import NotAllowed from "../icons/NotAllowed";

const NotAuthorized = () => {
  return (
    <div
      style={{ height: "20rem" }}
      className="w-[100%] grid place-items-center text-center"
    >
      <div>
        <div className="flex justify-center">
          <NotAllowed />
        </div>
        <div className="p-[0.5rem] pt-[1rem] space-y-[2rem]">
          <p className="text-[1rem] md:font-[1.3rem] font-[500]">
            You do not have access to this conversion
          </p>
          <div>
            <Link
              href="/inbox"
              className="bg-black rounded-[5px] active:bg-white active:text-black  mx-auto text-white p-[1rem] px-[1rem"
            >
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotAuthorized;
