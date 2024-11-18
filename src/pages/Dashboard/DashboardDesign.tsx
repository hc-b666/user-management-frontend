import { TableRow } from "@/components/TableRow";
import { handleAction } from "@/services";
import ChevronIcon from "@/icons/ChevronIcon";
import LockIcon from "@/icons/LockIcon";
import LockOpenIcon from "@/icons/LockOpenIcon";
import TrashIcon from "@/icons/TrashIcon";
import { useLoading } from "@/contexts/LoadingContext";

interface DashboardDesignProps {
  handleSortLastSeen: () => void;
  handleCheck: (id: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  users: User[];
  checkedUsers: number[];
}

export function DashboardDesign(props: DashboardDesignProps) {
  const { handleSortLastSeen, handleCheck, handleSearch, users, checkedUsers } =
    props;
  const { dispatch } = useLoading();

  return (
    <div className="bg-white p-8 mx-auto w-[1440px] h-full flex flex-col rounded-lg">
      <div className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between rounded-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              handleAction("block", "PUT", { userIds: checkedUsers }, dispatch)
            }
            className="text-blue-500 font-medium flex items-center gap-1 border-2 border-blue-500 py-2 px-4 rounded-md"
          >
            <LockIcon />
            Block
          </button>
          <button
            onClick={() =>
              handleAction("unblock", "PUT", { userIds: checkedUsers }, dispatch)
            }
            className="text-blue-500 font-medium flex items-center gap-1 border-2 border-blue-500 py-2 px-4 rounded-md"
          >
            <LockOpenIcon />
            Unlock
          </button>
          <button
            onClick={() =>
              handleAction("delete", "DELETE", { userIds: checkedUsers }, dispatch)
            }
            className="text-red-500 border-2 border-red-500 p-2 rounded-md"
          >
            <TrashIcon />
          </button>
        </div>
        <div>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Filter"
            className="py-2 px-3 w-80 rounded-md bg-white border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="w-full px-3 py-5 rounded-md">
        <div className="w-full font-bold grid grid-cols-10 gap-3 pt-2 pb-4 border-b border-slate-300">
          <div className="col-span-1 px-4">
            {/* <input type="checkbox" /> */}
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

        {users.map((user) => (
          <TableRow key={user.id} user={user} handleCheck={handleCheck} />
        ))}
      </div>
    </div>
  );
}
