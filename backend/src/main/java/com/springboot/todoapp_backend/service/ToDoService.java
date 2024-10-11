package com.springboot.todoapp_backend.service;

import com.springboot.todoapp_backend.dtos.ToDoDTO;
import com.springboot.todoapp_backend.model.ToDo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ToDoService {
    private static final Logger logger = LoggerFactory.getLogger(ToDoService.class);

    private List<ToDo> toDoList;

    public ToDoService(){
        this.toDoList = new ArrayList<>();

    }

    public Optional<ToDo> getItem(String id) {
        Optional<ToDo> optional = Optional.empty();
        for (ToDo item : toDoList){
            if(item.getId().equals(id)){
                optional = Optional.of(item);
                return optional;
            }
        }
        return optional;
    }

    public List<ToDo> getItemList(
            Optional<String> text,
            Optional<ToDo.Priority> priority,
            Optional<Boolean> done,
            int page,
            int size,
            Optional<String> sortBy
    ) {
        return toDoList.stream()
                // Text filter
                .filter(todo -> text.map(t -> todo.getText().toLowerCase().contains(t.toLowerCase())).orElse(true))
                // Priority filter
                .filter(todo -> priority.map(p -> todo.getPriority() == p).orElse(true))
                // Status filter
                .filter(todo -> done.map(d -> todo.isDone() == d).orElse(true))
                // Sort by priority and/or dueDate
                .sorted(getComparator(sortBy))
                // Pagination
                .skip((long) page * size)
                .limit(size)
                .collect(Collectors.toList());
    }

    public ToDo addItem(ToDoDTO request){
        LocalDate dueDate = null;

        if(request.getDueDate() != null && !request.getDueDate().isEmpty()){
            dueDate = LocalDate.parse(request.getDueDate());
        }

        ToDo newItem = new ToDo(request.getText(), request.getPriority(), dueDate);
        toDoList.add(newItem);

        logger.info("New item created with ID: {}", newItem.getId());
        return newItem;
    }

    private Comparator<ToDo> getComparator(Optional<String> sortBy) {
        return sortBy.map(sort -> {
            return switch (sort.toLowerCase()) {
                case "priority" -> Comparator.comparing(ToDo::getPriority);
                case "duedate" ->
                        Comparator.comparing(ToDo::getDueDate, Comparator.nullsLast(Comparator.naturalOrder()));
                default -> Comparator.comparing(ToDo::getPriority);
            };
        }).orElse(Comparator.comparing(ToDo::getPriority));
    }

    public Optional<ToDo> updateItem(String id, ToDoDTO request) {
        Optional<ToDo> existingItem = getItem(id);
        existingItem.ifPresent(todo -> {
            todo.setText(request.getText());
            todo.setPriority(request.getPriority());
            if (request.getDueDate() != null && !request.getDueDate().isEmpty()) {
                todo.setDueDate(LocalDate.parse(request.getDueDate()));
            } else {
                todo.setDueDate(null);
            }
            logger.info("Item updated with ID: {}", id);
        });
        return existingItem;
    }

    public Optional<ToDo> markAsDone(String id) {
        Optional<ToDo> existingItem = getItem(id);
        existingItem.ifPresent(todo -> {
            if (!todo.isDone()) {
                todo.setDone(true);
                todo.setDoneDate(LocalDate.now());
                logger.info("Item marked as done with ID: {}", id);
            }
        });
        return existingItem;
    }

    public Optional<ToDo> markAsUndone(String id) {
        Optional<ToDo> existingItem = getItem(id);
        existingItem.ifPresent(todo -> {
            if (todo.isDone()) {
                todo.setDone(false);
                todo.setDoneDate(null);
                logger.info("Item marked as undone with ID: {}", id);
            }
        });
        return existingItem;
    }




}
