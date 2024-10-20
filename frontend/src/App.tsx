import { Card } from "@/components/ui";

import {
  ToDoTable,
  FilterSearch,
  ModalManager,
  Stats,
  AddItemButton,
} from "@/components/shared";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl p-4">
          <FilterSearch />
          <AddItemButton />
          <ToDoTable />
          <Stats />
        </Card>
      </div>

      <ModalManager />
    </>
  );
}

export default App;
