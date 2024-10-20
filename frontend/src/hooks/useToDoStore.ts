import { create } from "zustand";
import { getTodos, markTodoAsDone, markTodoAsUndone } from "@/services/ToDoService";
import { ToDo } from "@/interfaces/ToDo";
import { GetTodosParams } from "@/interfaces/ToDoParams";

interface TodoStore {
  todos: ToDo[];
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
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
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
      } catch (error) {
        console.error('Error toggling todo done status:', error);
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
