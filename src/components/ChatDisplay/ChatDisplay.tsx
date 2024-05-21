// import Chatbox from "../ChatBox/Chatbox";
import DateGroup from "./DateGroup";
import { memo } from "react";
import { Messages } from "@/types";
import { groupDates } from "@/utlis";
import BatchMessagesByDate from "./BatchMessagesByDate";

const ChatDisplay = ({ data, email }: { data: Messages[]; email: String }) => {
  console.log(data, email);
  const dategroup = groupDates(data);
  console.log(dategroup);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-[1rem] px-[1rem]">
        {dategroup.map((item) => (
          <>
            <DateGroup key={item.date} timestamp={item.date || 0} />
            <BatchMessagesByDate data={data} email={email} />
          </>
        ))}
      </div>
      {/* <Chatbox /> */}
    </div>
  );
};
export default memo(ChatDisplay);
