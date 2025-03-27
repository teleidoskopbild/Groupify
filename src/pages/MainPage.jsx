import { useState } from "react";

export default function MainPage() {
  const [items, setItems] = useState([]);
  const [inputItems, setInputItems] = useState("");
  const [groups, setGroups] = useState([]);
  const [inputGroups, setInputGroups] = useState("");
  const [assignedItems, setAssignedItems] = useState([]);

  const addItem = () => {
    if (!inputItems.trim()) return;
    setItems([...items, inputItems]);
    setInputItems("");
  };

  const addGroup = () => {
    if (!inputGroups.trim()) return;
    setGroups([...groups, inputGroups]);
    setInputGroups("");
  };

  const assignItemsToGroups = () => {
    if (groups.length === 0 || items.length === 0) return;

    let shuffledItems = [...items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [
        shuffledItems[j],
        shuffledItems[i],
      ];
    }
    let newAssignedItems = groups.map((group) => ({
      group,
      items: [],
    }));

    shuffledItems.forEach((item, index) => {
      const groupIndex = index % groups.length;
      newAssignedItems[groupIndex].items.push(item);
    });

    setAssignedItems(newAssignedItems);
  };

  return (
    <div className="h-screen p-4">
      <h1 className="m-2 text-xl">MainPage</h1>

      <div>
        {" "}
        {/* ITEMS */}
        <div>
          <input
            type="text"
            value={inputItems}
            onChange={(e) => setInputItems(e.target.value)}
            placeholder="Enter an item"
            className="border-2 m-4"
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        <h2>Items</h2>
        <div className="bg-green-200 p-4 w-1/3 border-2 rounded-lg">
          <ul>
            {items.map((item, index) => (
              <li className="m-2 bg-blue-300" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* GROUPS */}
      <div>
        <div>
          <input
            type="text"
            value={inputGroups}
            onChange={(e) => setInputGroups(e.target.value)}
            placeholder="Enter a group"
            className="border-2 m-4"
          />
          <button onClick={addGroup}>Add Group</button>
        </div>
        <h2>Groups</h2>
        <div className="bg-green-300 p-4 w-1/3 border-2 rounded-lg">
          <ul>
            {groups.map((group, index) => (
              <li className="m-2 bg-red-200" key={index}>
                {group}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button onClick={assignItemsToGroups}>Randomly Assign</button>
        </div>
        <div className="">
          <h2>Assigned Items</h2>
          <div className="flex space-x-6">
            {assignedItems.map((groupData, index) => (
              <div className="w-1/3 bg-gray-100 p-4 rounded-lg" key={index}>
                <h3 className="font-semibold mb-2">Group: {groupData.group}</h3>
                <ul className="space-y-2">
                  {groupData.items.map((item, itemIndex) => (
                    <li className="bg-gray-300 p-2 " key={itemIndex}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
