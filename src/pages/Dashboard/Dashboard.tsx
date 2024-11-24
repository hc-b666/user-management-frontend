import { useState, useEffect, useCallback } from "react";
import { DashboardDesign } from "./DashboardDesign";
import { getUsers } from "@/services";
import { debounce } from "lodash";
import { useLoading } from "@/contexts/LoadingContext";

export function Dashboard() {
  const { dispatch } = useLoading();
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const refetchUsers = async () => {
    await getUsers(setUsers, dispatch);
    await getUsers(setOriginalUsers, dispatch);
  
    setUsers((fetchedUsers) => {
      const blockedUsers = fetchedUsers.filter((u) => u.isBlocked).map((u) => u._id);
      setCheckedUsers(blockedUsers);
      return fetchedUsers;
    });
  };

  useEffect(() => {
    refetchUsers();
  }, []);

  const handleFilter = useCallback(
    debounce((search: string) => {
      if (search === "") {
        setUsers(originalUsers);
      } else {
        setUsers((prev) => {
          const filteredUsers = prev.filter((u) => {
            return u.username.toLowerCase().includes(search);
          });
          return filteredUsers;
        });
      }
    }, 300),
    [originalUsers, dispatch]
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

  const handleCheck = (id: string) => {
    setCheckedUsers((prev) => {
      const isChecked = prev.includes(id);
      if (isChecked) {
        return prev.filter((userId) => userId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (checkedUsers.length === users.length) {
      setCheckedUsers([]);
    } else {
      const allUserIds = users.map((u) => u._id);
      setCheckedUsers(allUserIds);
    }
  };

  return (
    <DashboardDesign
      handleSortLastSeen={handleSortLastSeen}
      handleCheck={handleCheck}
      handleSearch={handleSearch}
      users={users}
      checkedUsers={checkedUsers}
      refetchUsers={refetchUsers}
      handleSelectAll={handleSelectAll}
    />
  );
}
