import Authenticated from "@/components/Wrapper/Authenticated";
import UserInboxList from "@/views/UserInboxList/UserInboxList";
import { useSession } from "next-auth/react";

const Inbox = () => {
  const { data } = useSession();

  // data?.user?.email

  return (
    <Authenticated>
      <div className="h-[100vh] overflow-hidden">
        <div className="py-[1rem] max-w-[700px] mx-auto lg:py-[2rem]">
          <div className="relative">
            <UserInboxList email={data?.user?.email} />
          </div>
        </div>
      </div>
    </Authenticated>
  );
};
export default Inbox;
