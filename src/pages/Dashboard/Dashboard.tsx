import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { DashboardDesign } from "./DashboardDesign";
import { getUsers } from "@/services";

export function Dashboard() {
  // const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);

  useEffect(() => {
    getUsers(setUsers);
    getUsers(setOriginalUsers);
  }, [checkedUsers]);

  const handleSortLastSeen = () => {
    setUsers((prev) => {
      const sortedUsers = [...prev].sort((a, b) => {
        const dateA = new Date(a.lastSeen).getTime();
        const dateB = new Date(b.lastSeen).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
      return sortedUsers;
    });
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleCheck = (id: number) => {
    setCheckedUsers((prev) => {
      const isChecked = prev.includes(id);
      if (isChecked) {
        return prev.filter((userId) => userId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();

    if (search === "") {
      setUsers(originalUsers);
    } else {
      setUsers((prev) => {
        const filteredUsers = prev.filter((user) => {
          return user.username.toLowerCase().includes(search);
        });
        return filteredUsers;
      });
    }
  };

  return (
    <DashboardDesign
      handleSortLastSeen={handleSortLastSeen}
      handleCheck={handleCheck}
      handleFilter={handleFilter}
      users={users}
      checkedUsers={checkedUsers}
    />
  );
}
