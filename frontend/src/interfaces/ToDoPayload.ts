export interface ToDoPayload {
    text: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    dueDate?: string;
  }
  