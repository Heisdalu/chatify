const InboxUserLoading = () => {
  return (
    <div className=" h-[70px] grid [grid-template-columns:70px_5fr_1fr] space-x-[0.5rem]">
      <div
        aria-label="user image"
        className="h-[60px] w-[60px] !rounded-[50%] effect"
      ></div>

      <div className="space-y-[5px] flex flex-col justify-center">
        <div className="h-[20px] w-[60%] effect"></div>
        <p className="h-[15px] w-[30%] effect"></p>
      </div>
    </div>
  );
};
export default InboxUserLoading;
