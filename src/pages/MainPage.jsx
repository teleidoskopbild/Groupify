import { useState } from "react";

export default function MainPage() {
  const [items, setItems] = useState([]);
  const [inputItems, setInputItems] = useState("");
  const [groups, setGroups] = useState([]);
  const [inputGroups, setInputGroups] = useState("");
  const [assignedItems, setAssignedItems] = useState([]);

  const addItem = () => {
    if (!inputItems.trim()) return;
    setItems([
      ...items,
      { id: generateRandomIndex(items.length), name: inputItems },
    ]);
    setInputItems("");
  };

  const addGroup = () => {
    if (!inputGroups.trim()) return;
    setGroups([
      ...groups,
      { id: generateRandomIndex(groups.length), name: inputGroups },
    ]);
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

  const generateRandomIndex = (index) => {
    return `${index}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const deleteGroup = (id) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  const loadMockData = () => {
    setItems([]);
    setGroups([]);
    setItems([
      { id: generateRandomIndex(0), name: "Tim W." },
      { id: generateRandomIndex(1), name: "Jenny K." },
      { id: generateRandomIndex(2), name: "Fred M." },
      { id: generateRandomIndex(3), name: "Lisa J." },
      { id: generateRandomIndex(4), name: "Anna K." },
      { id: generateRandomIndex(5), name: "Donny R." },
      { id: generateRandomIndex(6), name: "Kelly P." },
      { id: generateRandomIndex(7), name: "Jim H." },
      { id: generateRandomIndex(8), name: "Pam B." },
      { id: generateRandomIndex(9), name: "Michael S." },
      { id: generateRandomIndex(10), name: "Dennis L." },
      { id: generateRandomIndex(11), name: "Sam T." },
    ]);
    setGroups([
      { id: generateRandomIndex(0), name: "A" },
      { id: generateRandomIndex(1), name: "B" },
      { id: generateRandomIndex(2), name: "C" },
      { id: generateRandomIndex(3), name: "D" },
    ]);
  };

  const deleteData = () => {
    setItems([]);
    setGroups([]);
  };

  return (
    <div className="h-screen p-4">
      <h1 className="m-2 text-xl">MainPage</h1>
      <div className="flex gap-2">
        <button onClick={loadMockData} className="border-2 p-1 rounded-lg">
          Example Data
        </button>
        <button onClick={deleteData} className="border-2 p-1 rounded-lg">
          Delete Data
        </button>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          {/* ITEMS */}
          <div>
            <h2>Items</h2>
            <div className="bg-green-200 p-4 w-8/9 border-2 rounded-lg h-[250px] overflow-y-scroll">
              <ul>
                {items.map((item) => (
                  <li
                    className="m-2 ml-2 p-1 bg-blue-300 flex justify-between"
                    key={item.id}
                  >
                    {item.name}
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="ml-4 text-red-600 mr-2 hover:scale-110 cursor-pointer font-bold"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>{" "}
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
          </div>
          {/* GROUPS */}
          <div>
            <h2>Groups</h2>
            <div className="bg-green-300 p-4 w-8/9 border-2 rounded-lg h-[250px] overflow-y-scroll">
              <ul>
                {groups.map((group) => (
                  <li
                    className="m-2 ml-2 p-1 bg-red-200 flex justify-between"
                    key={group.id}
                  >
                    {group.name}
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="ml-4 text-red-600 mr-2 hover:scale-110 cursor-pointer font-bold"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
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
            <div>
              <button onClick={assignItemsToGroups}>Randomly Assign</button>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <h2>Assigned Items</h2>
          <div className="flex flex-wrap justify-center">
            {assignedItems.map((groupData) => (
              <div
                className="w-1/3 bg-gray-100 p-4 rounded-lg m-4"
                key={groupData.group.id}
              >
                <h3 className="font-semibold mb-2">
                  Group: {groupData.group.name}
                </h3>
                <ul className="space-y-2">
                  {groupData.items.map((item) => (
                    <li className="bg-gray-300 p-2 " key={item.id}>
                      {item.name}
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
