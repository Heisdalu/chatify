// import Chatbox from "../ChatBox/Chatbox";
import DateGroup from "./DateGroup";
import { memo } from "react";
import { Messages } from "@/types";
import { groupDates } from "@/utlis";
import BatchMessagesByDate from "./BatchMessagesByDate";

const ChatDisplay = ({ data, email }: { data: Messages[]; email: String }) => {
  // console.log(data, email);
  const dategroup = groupDates(data);
  console.log(dategroup);

  return (
    <div className="flex flex-col">
      <div className="px-[1rem] space-y-[1rem]">
        {dategroup.map((item) => (
          <div key={item.date} className="flex flex-col space-y-[1rem]">
            <DateGroup key={item.date} timestamp={item.date || 0} />
            <BatchMessagesByDate
              key={item.date + 1}
              data={item.value}
              email={email}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(ChatDisplay);
