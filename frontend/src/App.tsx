import { Card } from "@/components/ui-library";

import {
  ToDoTable,
  FilterSearch,
  ModalManager,
  Stats,
  AddItemButton,
  PaginationControl,
} from "@/components/shared";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl p-4">
          <FilterSearch />
          <AddItemButton />
          <div className="min-h-[600px]">
            <ToDoTable />
          </div>
          <div className="my-4">
            <PaginationControl />
          </div>
          <Stats />
        </Card>
      </div>

      <ModalManager />
    </>
  );
}

export default App;
