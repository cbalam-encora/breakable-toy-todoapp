import axios from "axios";
import { ToDo } from "@/interfaces/ToDo";
import { GetTodosParams } from "@/interfaces/ToDoParams";
import { ToDoPayload } from "@/interfaces/ToDoPayload";
import { ToDoStats } from "@/interfaces/ToDoStats";

const API_URL = import.meta.env.VITE_API_URL;

export const createTodo = async (data: ToDoPayload): Promise<ToDo> => {
  try {
    const response = await axios.post<ToDo>(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating ToDo:", error);
    throw error;
  }
};

export const getTodos = async (
  params: GetTodosParams = {}
): Promise<{ data: ToDo[]; totalItems: number }> => {
  try {
    const queryString = generateQueryString(params);
    const finalUrl = queryString ? `${API_URL}?${queryString}` : API_URL;

    const response = await axios.get(finalUrl);
    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    console.error("Error fetching ToDos:", error);
    throw error;
  }
};

const generateQueryString = (params: GetTodosParams): string => {
  const queryParams = new URLSearchParams();

  if (params.text !== undefined) queryParams.append("text", params.text);
  if (params.priority !== undefined)
    queryParams.append("priority", params.priority);
  if (params.done !== undefined)
    queryParams.append("isDone", String(params.done));
  if (params.page !== undefined)
    queryParams.append("page", String(params.page));
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.order) queryParams.append("order", params.order);

  return queryParams.toString();
};

export const markTodoAsDone = async (id: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/${id}/done`);
  } catch (error) {
    console.error("Error marking ToDo as done:", error);
    throw error;
  }
};

export const markTodoAsUndone = async (id: string): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}/undone`);
  } catch (error) {
    console.error("Error marking ToDo as undone:", error);
    throw error;
  }
};

export const updateTodo = async (
  id: string,
  data: ToDoPayload
): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, data);
  } catch (error) {
    console.error("Error updating ToDo:", error);
    throw error;
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting ToDo:", error);
    throw error;
  }
};

export const getStats = async (): Promise<ToDoStats> => {
  try {
    const response = await axios.get<ToDoStats>(`${API_URL}/completion-stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ToDo stats:", error);
    throw error;
  }
};
