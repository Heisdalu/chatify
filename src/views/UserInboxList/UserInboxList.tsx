import InboxHeader from "@/components/InboxHeader/InboxHeader";
import UserInboxCard from "@/components/InboxList/UserInboxCard";
import InboxNavigation from "@/components/InboxNavigation/InboxNavigation";

const UserInboxList = () => {
  return (
    <div className="border-1 md:grid md:bg-green-200 md:grid-cols-2">
      <InboxNavigation />
      <div className="space-y-[1rem]">
        <InboxHeader />
        <h1 className="fluid font-[600]">Messages</h1>
        <div className="space-y-[1rem]">
          <UserInboxCard />
          <UserInboxCard />
        </div>
      </div>
    </div>
  );
};
export default UserInboxList;
