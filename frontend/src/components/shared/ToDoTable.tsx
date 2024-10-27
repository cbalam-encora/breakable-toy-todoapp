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
import { FaEdit, FaSort } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ToDo } from "@/interfaces/ToDo";
import { useModal, useTodoStore } from "@/hooks";
import EmptyTable from "./table/EmptyTable";
import { RenderPriorityIcon } from "./table/RenderPriorityIcon";
import { useToast } from "@/hooks/ui-library/use-toast";

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

  const { toast } = useToast();

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

  const toggleCheckbox = async (id: string, done: boolean) => {
    try {
      await toggleDone(id, done);
      toast({
        title: "Task updated",
        description: "Task status has been updated.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the task. " + error,
        duration: 5000,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!todos || todos.length === 0) {
    return <EmptyTable />;
  }
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
                    toggleCheckbox(todo.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">{todo.text}</TableCell>
              <TableCell className="align-middle">
                {RenderPriorityIcon(todo.priority)}
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
