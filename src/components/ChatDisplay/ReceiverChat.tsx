import DragComponent from "../DragComponent/DragComponent";
import ChatDeliveryStatus from "./ChatDeliveryStatus";

const ReceiverChat = () => {
  return (
    <DragComponent
      className="p-[0.5rem] rounded-[10px] leading-[1.3rem] inline-block border-gray-200 border-[1px] w-auto max-w-[200px] [word-break:break-word] space-y-[5px] md:max-w-[300px]"
    >
      <div className="border-blue-400 space-y-[0.3rem] rounded-[5px] border-l-[5px] bg-gray-100 p-[0.3rem] px-[0.5rem]">
        <h1 className="font-[600]">You</h1>
        <p className="line-clamp-2 text-[0.8rem] leading-[0.9rem] ">
          {
            " i see the guy nah.. i been wan tell yo brh is doing okay now. i told her also. she will ge tbakc toyu bruh anytime is okay"
          }
        </p>
      </div>
      <p className="text-[0.9rem]"> helly is a boy now..i saw him yerterday</p>
      <ChatDeliveryStatus />
    </DragComponent>
  );
};
export default ReceiverChat;
