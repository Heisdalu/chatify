import Time from "../../../public/icons/Time";
import Sent from "../../../public/icons/Sent";
import Seen from "../../../public/icons/Seen";
import { convertTo12HourFormat } from "@/utlis";

const ChatDeliveryStatus = ({
  sentTimestamp,
  isSeen,
  loading,
}: {
  sentTimestamp: String;
  isSeen: Boolean;
  loading?: boolean;
}) => {
  const date = new Date(`${sentTimestamp}`);

  const formatTime = `${date.getHours()}:${`${date.getMinutes()}`.padStart(
    2,
    "0"
  )}`;

  const convertedTime = convertTo12HourFormat(formatTime);

  return (
    <div className="flex flex-col">
      <div className="ml-auto flex items-center space-x-[0.2rem]">
        <time className="text-[0.6rem]">{convertedTime}</time>
        {loading ? (
          <div className="shallow_svg">
            <Time />
          </div>
        ) : isSeen ? (
          <div className="shallow">
            <Seen />
          </div>
        ) : (
          <div className="shallow">
            <Sent />
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatDeliveryStatus;
