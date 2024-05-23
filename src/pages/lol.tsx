import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data
const initialItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

const ListComponent = () => {
  const [items, setItems] = useState(initialItems);

  // Function to change the name of an item
  const changeName = (id: any, newName: any) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, name: newName } : item))
        .sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  };

  // Effect to move the updated item to the top

  return (
    <div>
      <button onClick={() => changeName(2, "New Item 2")}>Change Name</button>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            // initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.name}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ListComponent;
