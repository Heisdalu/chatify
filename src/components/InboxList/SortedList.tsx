import { ChatListTypes } from "@/types";
import UserInboxCard from "./UserInboxCard";
import { Key, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SortedList = ({
  chatsList,
  email,
}: {
  chatsList: ChatListTypes[];
  email: string;
}) => {
  const sortedData = useMemo(() => {
    const sorted = [...chatsList].sort((a, b) =>
      b.messages[0].sentAt.localeCompare(a.messages[0]?.sentAt as string)
    );

    return sorted;
  }, [chatsList]);

  return (
    <AnimatePresence>
      {sortedData.map((el) => (
        <motion.div
          key={el.id as Key}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <UserInboxCard data={el} email={email} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
export default SortedList;
