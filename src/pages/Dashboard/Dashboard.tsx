import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { DashboardDesign } from "./DashboardDesign";
import { getUsers } from "@/services";
import { debounce } from "lodash"; 
import { useLoading } from "@/contexts/LoadingContext";

export function Dashboard() {
  // const navigate = useNavigate();
  const { dispatch } = useLoading();
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);

  useEffect(() => {
    getUsers(setUsers, dispatch);
    getUsers(setOriginalUsers, dispatch);
  }, [checkedUsers]);

  const handleFilter = useCallback(
    debounce((search: string) => {
      if (search === "") {
        setUsers(originalUsers);
      } else {
        setUsers((prev) => {
          const filteredUsers = prev.filter(u => {
            return u.username.toLowerCase().includes(search);
          });
          return filteredUsers;
        });
      }
    }, 300),
    [originalUsers]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    handleFilter(search);
  };

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

  return (
    <DashboardDesign
      handleSortLastSeen={handleSortLastSeen}
      handleCheck={handleCheck}
      handleSearch={handleSearch}
      users={users}
      checkedUsers={checkedUsers}
    />
  );
}
