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
import { GetTodosParams } from "@/interfaces/ToDoParams";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { FaEdit, FaSort } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { VscEmptyWindow } from "react-icons/vsc";

import { ToDo } from "@/interfaces/ToDo";
import { useModal, useTodoStore } from "@/hooks";

const ToDoTable = () => {
  const { onOpen, setData } = useModal();

  const editToDo = (todo: ToDo) => {
    setData(todo);
    onOpen("edit");
  };

  const deleteToDo = (todo: ToDo) => {
    setData(todo);
    onOpen("delete");
  };

  const {
    todos,
    loading,
    error,
    currentPage,
    params,
    setParams,
    fetchFilteredTodos,
    toggleDone,
  } = useTodoStore();

  useEffect(() => {
    fetchFilteredTodos();
  }, [fetchFilteredTodos, currentPage]);

  const sortTable = (sortBy: "priority" | "dueDate") => {
    const order =
      params.sortBy === sortBy && params.order === "asc" ? "desc" : "asc";
    const newParams: GetTodosParams = {
      ...params,
      sortBy,
      order,
    };
    setParams(newParams);
    fetchFilteredTodos();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <VscEmptyWindow className="h-12 w-12 text-gray-400 mb-4" />
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
            <TableCell>
              <Button variant="ghost" onClick={() => sortTable("priority")}>
                Priority
                <FaSort />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => sortTable("dueDate")}>
                Due Date
                <FaSort />
              </Button>
            </TableCell>
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
                <Button onClick={() => deleteToDo(todo)}>
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
