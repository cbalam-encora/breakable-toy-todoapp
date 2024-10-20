export interface GetTodosParams {
    text?: string;
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
    done?: boolean;
    page?: number;
    sortBy?: 'priority' | 'dueDate';
    order?: 'asc' | 'desc';
  }