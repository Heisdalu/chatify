import NoMessage from "../icons/NoMessage";

const NoChatPresent = () => {
  return (
    <div
      style={{ height: "20rem" }}
      className="w-[100%] grid place-items-center text-center"
    >
      <div>
        <div className="flex justify-center">
          <NoMessage />
        </div>
        <div className="p-[0.5rem]">
          <p className="text-[1rem] md:font-[1.3rem] font-[500]">
            No Chats yet...
          </p>
          <p className=" break-all">Find Friends on the top right icon</p>
        </div>
      </div>
    </div>
  );
}
export default NoChatPresent