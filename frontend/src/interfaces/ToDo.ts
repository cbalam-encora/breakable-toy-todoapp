export interface ToDo {
    id: string;
    text: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    dueDate?: string;
    done: boolean;
    doneDate?: string;
    creationDate: string;
  }
  