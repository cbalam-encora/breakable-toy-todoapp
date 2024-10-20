import { create } from "zustand";
import {
  getTodos,
  markTodoAsDone,
  markTodoAsUndone,
  getStats,
} from "@/services/ToDoService";
import { ToDo } from "@/interfaces/ToDo";
import { GetTodosParams } from "@/interfaces/ToDoParams";
import { ToDoStats } from "@/interfaces/ToDoStats";

interface TodoStore {
  todos: ToDo[];
  stats: ToDoStats;
  loading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  params: GetTodosParams;
  fetchFilteredTodos: () => Promise<void>;
  setPage: (page: number) => void;
  setParams: (newParams: Partial<GetTodosParams>) => void;
  toggleDone: (id: string, checked: boolean) => void;
  fetchStats: () => Promise<void>;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  stats: {
    averageTime: "00:00:00:00",
    averageTimeHighPriority: "00:00:00:00",
    averageTimeMediumPriority: "00:00:00:00",
    averageTimeLowPriority: "00:00:00:00",
  },
  loading: false,
  error: null,
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  params: {
    text: undefined,
    priority: undefined,
    isDone: undefined,
    page: 1,
    sortBy: undefined,
  },

  fetchFilteredTodos: async () => {
    set({ loading: true, error: null });
    const { params, currentPage } = get();

    try {
      const { data, totalItems } = await getTodos({
        ...params,
        page: currentPage,
      });
      set({ todos: data, totalItems });
    } catch (error) {
      console.error(error);
      set({ error: "Error fetching todos" });
    } finally {
      set({ loading: false });
    }
  },

  toggleDone: async (id: string, checked: boolean) => {
    try {
      if (checked) {
        await markTodoAsDone(id);
      } else {
        await markTodoAsUndone(id);
      }

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: checked } : todo
        ),
      }));

      await get().fetchStats();
    } catch (error) {
      console.error("Error toggling todo done status:", error);
    }
  },

  fetchStats: async () => {
    try {
      const stats = await getStats();
      set({ stats });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  },

  setPage: (page: number) => set({ currentPage: page }),

  setParams: (newParams) => {
    set((state) => ({
      params: { ...state.params, ...newParams },
      currentPage: 1,
    }));
  },
}));

export default useTodoStore;
