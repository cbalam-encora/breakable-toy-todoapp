package com.springboot.todoapp_backend.dtos;

import com.springboot.todoapp_backend.model.ToDo;
import jakarta.validation.constraints.Size;

public class ToDoUpdateDTO {
    @Size(max = 120, message = "The description size is limited to 120 characters")
    private String text;

    private ToDo.Priority priority;

    private String dueDate;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ToDo.Priority getPriority() {
        return priority;
    }

    public void setPriority(ToDo.Priority priority) {
        this.priority = priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
}

