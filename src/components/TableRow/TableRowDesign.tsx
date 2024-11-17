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
    <div
      key={user.email}
      className="w-full text-black hover:text-gray-500 duration-300 cursor-pointer font-base grid grid-cols-10 gap-3 py-4 border-b border-slate-300"
    >
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
            <div className="absolute top-[125%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white rounded-md py-1 px-2 z-10">
              <p>{hoverText}</p>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
