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
  const [unCheckedUsers, setUnCheckedUsers] = useState<string[]>([]);

  const refetchUsers = async () => {
    await getUsers(setUsers, dispatch);
    await getUsers(setOriginalUsers, dispatch);
  
    setUsers((fetchedUsers) => {
      const blockedUsers = fetchedUsers.filter((u) => u.isBlocked).map((u) => u._id);
      const unBlockedUsers = fetchedUsers.filter((u) => !u.isBlocked).map((u) => u._id);
      setCheckedUsers(blockedUsers);
      setUnCheckedUsers(unBlockedUsers);
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
    setCheckedUsers((prevCheckedUsers) => {
      const isChecked = prevCheckedUsers.includes(id);
      
      if (isChecked) {
        setUnCheckedUsers((prevUnCheckedUsers) => [...prevUnCheckedUsers, id]);
        return prevCheckedUsers.filter((userId) => userId !== id);
      } else {
        setUnCheckedUsers((prevUnCheckedUsers) =>
          prevUnCheckedUsers.filter((userId) => userId !== id)
        );
        return [...prevCheckedUsers, id];
      }
    });
  };
  

  const handleSelectAll = () => {
    if (checkedUsers.length === users.length) {
      setCheckedUsers([]);
      setUnCheckedUsers(users.map((u) => u._id));
    } else {
      const allUserIds = users.map((u) => u._id);
      setCheckedUsers(allUserIds);
      setUnCheckedUsers([]);
    }
  };

  return (
    <DashboardDesign
      handleSortLastSeen={handleSortLastSeen}
      handleCheck={handleCheck}
      handleSearch={handleSearch}
      users={users}
      checkedUsers={checkedUsers}
      unCheckedUsers={unCheckedUsers}
      refetchUsers={refetchUsers}
      handleSelectAll={handleSelectAll}
    />
  );
}
