import UserDirectChat from "../UserDirectChat/UserDirectChat";
import UserInboxList from "../UserInboxList/UserInboxList";

const InboxContainer = () => {
  // use a loader when widht is null instead

  // console.log(width);

  // display a loading stuuf or welcome stuff for every entry to inbox

  // if (!width) return <div></div>;

  return (
    <div className="relative const">
      <UserInboxList />
      <UserDirectChat />
    </div>
  );
};
export default InboxContainer;
