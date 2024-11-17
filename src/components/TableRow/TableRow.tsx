import { useState } from "react";
import { calculateDiff, getDate } from "@/libs/dateUtils";
import { TableRowDesign } from "./TableRowDesign";

interface TableRowProps {
  user: User;
  handleCheck: (id: number) => void;
}

export function TableRow({
  user,
  handleCheck,
}: TableRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [checkState, setCheckState] = useState(user.isBlocked);

  const lastSeen = calculateDiff(new Date(user.lastSeen));
  const hoverText = getDate(new Date(user.lastSeen));

  const handleChange = () => {
    setCheckState((prev) => !prev);
    handleCheck(user.id);
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
