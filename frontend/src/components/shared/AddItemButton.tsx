import { Button } from "@/components/ui-library";

import useModal from "@/hooks/useModal";

const AddItemButton = () => {
  const { onOpen } = useModal();

  const createToDo = () => {
    onOpen("create");
  };
  return (
    <Button className="my-4" onClick={createToDo}>
      <b>+</b>&nbsp; New To Do
    </Button>
  );
};

export default AddItemButton;
