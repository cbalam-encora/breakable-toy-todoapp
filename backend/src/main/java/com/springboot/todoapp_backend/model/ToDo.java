package com.springboot.todoapp_backend.model;

import java.time.LocalDate;
import java.util.UUID;

public class ToDo {
    private final String id;
    private String text;
    private LocalDate dueDate;
    private boolean done;
    private LocalDate doneDate;
    private Priority priority;
    private final LocalDate creationDate;

    public enum Priority {
        HIGH, MEDIUM, LOW
    }

    public ToDo (String text, Priority priority){
        this.id = UUID.randomUUID().toString();
        this.text = text;
        this.dueDate = null;
        this.done = false;
        this.doneDate = null;
        this.priority = priority;
        this.creationDate = LocalDate.now();
    }

    public ToDo (String text, Priority priority, LocalDate dueDate){
        this.id = UUID.randomUUID().toString();
        this.text = text;
        this.dueDate = dueDate;
        this.done = false;
        this.doneDate = null;
        this.priority = priority;
        this.creationDate = LocalDate.now();
    }

    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public LocalDate getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(LocalDate doneDate) {
        this.doneDate = doneDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }
}
