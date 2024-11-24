import { TableRow } from "@/components/TableRow";
import { handleAction } from "@/services";
import ChevronIcon from "@/icons/ChevronIcon";
import LockIcon from "@/icons/LockIcon";
import LockOpenIcon from "@/icons/LockOpenIcon";
import TrashIcon from "@/icons/TrashIcon";
import { useLoading } from "@/contexts/LoadingContext";

interface DashboardDesignProps {
  handleSortLastSeen: () => void;
  handleCheck: (id: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  users: User[];
  checkedUsers: string[];
  unCheckedUsers: string[];
  refetchUsers: () => void;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DashboardDesign(props: DashboardDesignProps) {
  const {
    handleSortLastSeen,
    handleCheck,
    handleSearch,
    users,
    checkedUsers,
    unCheckedUsers,
    refetchUsers,
    handleSelectAll,
  } = props;
  const { dispatch } = useLoading();

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <button
            onClick={() =>
              handleAction(
                "/dashboard/blockUsers",
                "PUT",
                { userIds: checkedUsers },
                dispatch,
                refetchUsers
              )
            }
            className="dashboard-nav-btn"
          >
            <LockIcon />
            Block
          </button>
          <button
            onClick={() =>
              handleAction(
                "/dashboard/unblockUsers",
                "PUT",
                { userIds: unCheckedUsers },
                dispatch,
                refetchUsers
              )
            }
            className="dashboard-nav-btn"
          >
            <LockOpenIcon />
            Unlock
          </button>
          <button
            onClick={() =>
              handleAction(
                "/dashboard/deleteUsers",
                "DELETE",
                { userIds: checkedUsers },
                dispatch,
                refetchUsers
              )
            }
            className="text-red-500 border-2 border-red-500 p-2 rounded-md"
          >
            <TrashIcon />
          </button>
        </div>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Filter"
          className="search-input"
          onChange={handleSearch}
        />
      </div>

      <div className="w-full flex flex-col px-3 py-5 rounded-md overflow-hidden">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="table-head-wrap">
            <div className="col-span-1 px-4">
              <input type="checkbox" onChange={handleSelectAll} />
            </div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-3 flex items-center gap-1">
              Last Seen{" "}
              <button onClick={handleSortLastSeen}>
                <ChevronIcon />
              </button>
            </div>
          </div>

          <div className="w-full flex-grow">
            {users.map((user) => (
              <TableRow
                key={user._id}
                user={user}
                handleCheck={handleCheck}
                checkedUsers={checkedUsers}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
