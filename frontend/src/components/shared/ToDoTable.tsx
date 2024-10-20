import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Checkbox,
  TableHeader,
} from "@/components/ui";
import { ToDo } from "@/interfaces/ToDo";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useModal from "@/hooks/useModal";
import useTodoStore from "@/hooks/useToDoStore";
import { useEffect } from "react";
import PaginationControl from "./PaginationControl";

const ToDoTable = () => {
  const { onOpen, setData } = useModal();

  const editToDo = (todo: ToDo) => {
    setData(todo);
    onOpen("edit");
  };

  const {
    todos,
    loading,
    error,
    totalItems,
    currentPage,
    fetchFilteredTodos,
    toggleDone,
  } = useTodoStore();

  useEffect(() => {
    fetchFilteredTodos();
  }, [fetchFilteredTodos, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!todos || todos.length === 0) return <p>No items available.</p>;

  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <FcHighPriority title="High Priority" className="text-2xl"/>;
      case "MEDIUM":
        return <FcMediumPriority title="Medium Priority" className="text-2xl"/>;
      case "LOW":
        return <FcLowPriority title="Low Priority" className="text-2xl"/>;
      default:
        return null;
    }
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    toggleDone(id, checked);
  };

  return (
    <>
      <Table className="w-full border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                <Checkbox
                  checked={todo.done}
                  onCheckedChange={(checked) =>
                    handleCheckChange(todo.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">{todo.text}</TableCell>
              <TableCell className="align-middle">
                {renderPriorityIcon(todo.priority)}
              </TableCell>
              <TableCell>{todo.dueDate}</TableCell>
              <TableCell>
                <Button onClick={() => editToDo(todo)}>
                  <FaEdit />
                </Button>
              </TableCell>
              <TableCell>
                <Button>
                  <MdDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="my-4">
        <PaginationControl totalItems={totalItems} />
      </div>
    </>
  );
};

export default ToDoTable;
