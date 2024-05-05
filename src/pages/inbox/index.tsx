import InboxLoading from "@/components/Loading/InboxLoading";
import UserInboxList from "@/views/UserInboxList/UserInboxList";

const Inbox = () => {
  return (
    <div>
      <div className="py-[1rem] max-w-[700px] mx-auto lg:py-[2rem]">
        <div className="relative">
          <UserInboxList />
          {/* <InboxLoading /> */}
        </div>
      </div>
    </div>
  );
};
export default Inbox;
