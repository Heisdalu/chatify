import { monthsList } from "@/utlis";

const DateGroup = ({ timestamp }: { timestamp: number }) => {
  const date = new Date(timestamp);

  return (
    <div className="font-[700] text-[0.8rem] rounded-[10px] mx-auto top-[100px] text-center p-[0.5rem] border-gray-100 border-[1px] bg-white">
      {`${date?.getDate()}, ${
        monthsList[date.getMonth()] || "nil"
      }, ${date?.getFullYear()}`}
    </div>
  );
};
export default DateGroup;
