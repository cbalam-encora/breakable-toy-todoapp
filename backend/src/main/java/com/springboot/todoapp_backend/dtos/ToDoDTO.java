package com.springboot.todoapp_backend.dtos;

import com.springboot.todoapp_backend.model.ToDo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ToDoDTO {

    @NotBlank(message = "A description of the task is required")
    @Size(max = 120, message = "The description size is limited to 120 characters")
    private String text;

    @NotNull(message = "A priority is required")
    private ToDo.Priority priority;

    private String dueDate;

    public @NotBlank(message = "A description of the task is required") @Size(max = 120, message = "The description size is limited to 120 characters") String getText() {
        return text;
    }

    public void setText(@NotBlank(message = "A description of the task is required") @Size(max = 120, message = "The description size is limited to 120 characters") String text) {
        this.text = text;
    }

    public @NotNull(message = "A priority is required") ToDo.Priority getPriority() {
        return priority;
    }

    public void setPriority(@NotNull(message = "A priority is required") ToDo.Priority priority) {
        this.priority = priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
}
