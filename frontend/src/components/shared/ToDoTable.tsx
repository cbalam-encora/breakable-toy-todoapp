import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Checkbox,
  TableHeader,
} from "@/components/ui-library";

import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ToDo } from "@/interfaces/ToDo";
import { useModal, useTodoStore } from "@/hooks";

const ToDoTable = () => {
  const { onOpen, setData } = useModal();

  const editToDo = (todo: ToDo) => {
    setData(todo);
    onOpen("edit");
  };

  const { todos, loading, error, currentPage, fetchFilteredTodos, toggleDone } =
    useTodoStore();

  useEffect(() => {
    fetchFilteredTodos();
  }, [fetchFilteredTodos, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m-7-4v-4h2l1-3h6l1 3h2v4m-9 4v-4m4 4v-4"
          />
        </svg>
        <p className="text-gray-500">No tasks found</p>
        <p className="text-sm text-gray-400">Start by adding a new task</p>
      </div>
    );
  }

  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <FcHighPriority title="High Priority" className="text-2xl" />;
      case "MEDIUM":
        return (
          <FcMediumPriority title="Medium Priority" className="text-2xl" />
        );
      case "LOW":
        return <FcLowPriority title="Low Priority" className="text-2xl" />;
      default:
        return null;
    }
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
                    toggleDone(todo.id, checked === true)
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
    </>
  );
};

export default ToDoTable;
