import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import Wrapper from "@/components/Wrapper/Wrapper";
import { useRef, useState } from "react";

const Settings = () => {
  const [isReadonly, setIsReadonly] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const editHandler = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.focus();
    setIsReadonly(false);
  };

  return (
    <div>
      <Wrapper>
        <h1 className="text-[1.1rem] font-[600] flex items-center space-x-[0.5rem]">
          <Logo />
          <span>Chatify</span>
        </h1>
        <div className="space-y-[1rem] mt-[1rem] py-[2rem] max-w-[500px] mx-auto md:space-y-[1.3rem]">
          <h1 className="flex justify-center text-[1.125rem] font-[700]">
            Your Personal Info
          </h1>
          <div className="space-y-[1rem] md:space-y-[1.5rem]">
            <div className="flex flex-col space-y-[0.5rem]">
              <h1 className="font-[500] truncate-[0.1px] text-[0.875rem] md:text-[1rem]">
                Your Display Name
              </h1>
              <p className="rounded-[10px] p-[0.5rem] bg-gray-200 cursor-not-allowed">
                dhevine__070
              </p>
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
                ref={textAreaRef}
                readOnly={isReadonly}
                placeholder="write your bio..."
                name="bio"
                className="resize-none border-1 border-[#CDD1D0] py-[0.5rem] px-[0.3rem] outline-none"
                id=""
                cols={30}
                rows={5}
              ></textarea>
              <div className="text-[0.7rem]">maximum of 40 characters</div>
              {isReadonly && (
                <div>
                  <button
                    onClick={editHandler}
                    className="bg-[#000E08] text-[#fff] py-[0.5rem] px-[1rem] rounded-[1rem] active:bg-[#fff] active:text-[#000E08] active:border-[1px] active:border-gray-500"
                  >
                    Edit Bio
                  </button>
                </div>
              )}
            </div>

            {!isReadonly && (
              <div>
                <button className="space-x-[0.8rem] flex py-[1rem] w-[100%] rounded-[1rem] bg-[#000E08] text-[#fff] justify-center items-center ">
                  <span>Update Bio</span>
                  <span>
                    <Loading />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default Settings;
