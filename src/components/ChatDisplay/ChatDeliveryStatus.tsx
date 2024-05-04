import Time from "../../../public/icons/Time";
import Sent from "../../../public/icons/Sent";
import Seen from "../../../public/icons/Seen";

const ChatDeliveryStatus = () => {
  return (
    <div className="flex flex-col">
      <div className="ml-auto flex items-center space-x-[0.2rem]">
        <time className="text-[0.7rem]">23:10 PM</time>
        <div>
          <Time />
        </div>
        {/* <div>
          <Sent />
        </div>
        <div>
          <Seen />
        </div> */}
      </div>
    </div>
  );
};
export default ChatDeliveryStatus;
