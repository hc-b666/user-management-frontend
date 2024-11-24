import { useEffect, useState } from "react";
import { calculateDiff, getDate } from "@/libs/dateUtils";
import { TableRowDesign } from "./TableRowDesign";

interface TableRowProps {
  user: User;
  handleCheck: (id: string) => void;
  checkedUsers: string[];
}

export function TableRow({ user, handleCheck, checkedUsers }: TableRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [checkState, setCheckState] = useState(checkedUsers.includes(user._id));

  useEffect(() => {
    setCheckState(checkedUsers.includes(user._id));
  }, [checkedUsers]);

  const lastSeen = calculateDiff(new Date(user.lastSeen));
  const hoverText = getDate(new Date(user.lastSeen));

  const handleChange = () => {
    setCheckState((prev) => !prev);
    handleCheck(user._id);
  };

  return (
    <TableRowDesign
      checkState={checkState}
      handleChange={handleChange}
      hoverText={hoverText}
      isHovered={isHovered}
      lastSeen={lastSeen}
      setIsHovered={setIsHovered}
      user={user}
    />
  );
}
