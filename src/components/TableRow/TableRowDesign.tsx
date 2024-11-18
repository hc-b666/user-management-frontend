interface TableRowDesignProps {
  user: User;
  handleChange: () => void;
  checkState: boolean;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  lastSeen: string;
  hoverText: string;
}

export function TableRowDesign(props: TableRowDesignProps) {
  const {
    user,
    handleChange,
    checkState,
    setIsHovered,
    lastSeen,
    isHovered,
    hoverText,
  } = props;

  return (
    <div key={user.email} className="table-body-row">
      <div className="col-span-1 px-4">
        <input
          type="checkbox"
          className="cursor-pointer"
          onChange={handleChange}
          checked={checkState}
        />
      </div>
      <div className="col-span-3">{user.username}</div>
      <div className="col-span-3">{user.email}</div>
      <div className="col-span-3 relative">
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="inline-flex relative"
        >
          {lastSeen}

          {isHovered && (
            <div className="hover-wrap">
              <p>{hoverText}</p>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
