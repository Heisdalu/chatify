import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

const Overlay = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: 0.3 }}
      onClick={onClick}
      className="cursor overlayModal fixed h-[100vh] w-[100%] left-0 top-[0] bg-black  z-[100]"
    ></motion.div>
  );
};
export default Overlay;
