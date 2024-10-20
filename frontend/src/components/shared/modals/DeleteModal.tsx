import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui-library";
import { useTodoStore } from "@/hooks";
import { useToast } from "@/hooks/ui-library/use-toast";
import { ToDo } from "@/interfaces/ToDo";
import { deleteItem } from "@/services/ToDoService";

const DeleteModal = ({
  todo,
  onClose,
}: {
  todo: ToDo;
  onClose: () => void;
}) => {

  const { fetchFilteredTodos } = useTodoStore();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteItem(todo.id);
      await fetchFilteredTodos();
      toast({
        title: "Task Deleted Successfully",
      })

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open modal onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete To Do</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task?
            <div className="mt-4">
              <p>
                <strong>Task Name:</strong> {todo.text}
              </p>
              <p>
                <strong>Priority:</strong> {todo.priority}
              </p>
              {todo.dueDate && (
                <p>
                  <strong>Due Date:</strong> {todo.dueDate}
                </p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
