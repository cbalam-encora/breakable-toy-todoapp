import { VscEmptyWindow } from "react-icons/vsc";

const EmptyTable = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <VscEmptyWindow className="h-12 w-12 text-gray-400 mb-4" />
      <p className="text-gray-500">No tasks found</p>
      <p className="text-sm text-gray-400">Start by adding a new task</p>
    </div>
  );
};

export default EmptyTable;
