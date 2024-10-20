import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components/ui-library";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToDoPayload } from "@/interfaces/ToDoPayload";
import { createTodo } from "@/services/ToDoService";
import { useTodoStore } from "@/hooks";

const FormSchema = z.object({
  taskName: z
    .string()
    .min(1, { message: "Task Name is required." })
    .max(120, { message: "Task Name must not exceed 120 characters." }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "Priority is required.",
  }),
  dueDate: z.date().optional(),
});

const CreateModal = ({ onClose }: { onClose: () => void }) => {
  const [date, setDate] = useState<Date>();
  const { fetchFilteredTodos } = useTodoStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      taskName: "",
      priority: undefined,
      dueDate: undefined,
    },
  });

  const handleCreate = async (data: z.infer<typeof FormSchema>) => {
    const toDoPayload: ToDoPayload = {
      text: data.taskName,
      priority: data.priority.toUpperCase() as "HIGH" | "MEDIUM" | "LOW",
      dueDate: date ? format(date, "yyyy-MM-dd") : undefined,
    };
    console.log("Payload to send:", toDoPayload);
    try {
      await createTodo(toDoPayload);

      await fetchFilteredTodos();

      form.reset();
      setDate(undefined);
      onClose();
    } catch (error) {
      console.error("Error creating ToDo:", error);
    }
  };

  return (
    <Dialog open modal onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New To Do</DialogTitle>
          <DialogDescription>
            Fill in the details for the new task.
          </DialogDescription>
        </DialogHeader>

        <Label>Task Name</Label>
        <Input {...form.register("taskName")} placeholder="Task name" />
        {form.formState.errors.taskName && (
          <p className="text-red-500">
            {form.formState.errors.taskName.message}
          </p>
        )}

        <Label>Priority</Label>
        <Select
          onValueChange={(value) =>
            form.setValue("priority", value as "LOW" | "MEDIUM" | "HIGH")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.priority && (
          <p className="text-red-500">
            {form.formState.errors.priority.message}
          </p>
        )}

        <Label className="mt-4">Due Date (Optional)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                form.setValue("dueDate", selectedDate || undefined);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <DialogFooter>
          <Button onClick={form.handleSubmit(handleCreate)}>Create</Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
