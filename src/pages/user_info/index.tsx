import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import Wrapper from "@/components/Wrapper/Wrapper";

const UserInfo = () => {
  return (
    <div>
      <Wrapper>
        <h1 className="text-[1.1rem] font-[600] flex items-center space-x-[0.5rem]">
          <Logo />
          <span>Chatify</span>
        </h1>
        <div className="space-y-[1rem] mt-[1rem] py-[2rem] max-w-[500px] mx-auto md:space-y-[1.3rem]">
          <h1 className="flex justify-center text-[1.125rem] font-[500]">
            Your Personal Info
          </h1>
          <form className="space-y-[1rem] md:space-y-[1.5rem]">
            <div className="flex flex-col space-y-[0.5rem]">
              <label
                htmlFor="display_name"
                className="font-[500] truncate-[0.1px] text-[0.875rem] md:text-[1rem]"
              >
                Your Display Name
              </label>
              <input
                placeholder="display name must be unique"
                type="text"
                autoComplete="off"
                className="caret-black rounded-[5px] border-b-[1px] !border-[#CDD1D0] py-[0.5rem] px-[0.3rem] userReset focus:outline-none focus:border-b-black !focus:border-b-[2px]"
                name="display_name"
                id="display_name"
              />
              <div className="text-[0.7rem]">display name taken already</div>
            </div>
            <div className="flex flex-col space-y-[0.5rem]">
              <label
                htmlFor="bio"
                className="font-[500] truncate-[0.1px] text-[0.875rem] md:text-[1rem]"
              >
                Your Bio
              </label>
              <textarea
                autoComplete="off"
                name="bio"
                className="userTextReset rounded-[5px] caret-black border-1 border-[#CDD1D0] py-[0.5rem] px-[0.3rem] focus:outline-black"
                id=""
                cols={30}
                rows={5}
              ></textarea>
              <div className="text-[0.7rem]">maximum of 40 characters</div>
            </div>
          </form>
          <div>
            <button className="space-x-[0.8rem] flex py-[1rem] w-[100%] rounded-[1rem] bg-[#000E08] text-[#fff] justify-center items-center ">
              <span>Submit</span>
              <span>
                <Loading />
              </span>
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default UserInfo;
