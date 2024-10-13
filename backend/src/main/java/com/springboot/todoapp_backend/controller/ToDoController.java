package com.springboot.todoapp_backend.controller;

import com.springboot.todoapp_backend.dtos.ToDoDTO;
import com.springboot.todoapp_backend.dtos.ToDoUpdateDTO;
import com.springboot.todoapp_backend.model.ToDo;
import com.springboot.todoapp_backend.service.ToDoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class ToDoController {

    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService){
        this.toDoService = toDoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getItem(@PathVariable String id){
        if (id == null || id.isEmpty()){
            return ResponseEntity.badRequest().body(null);
        }
        Optional<ToDo> item = toDoService.getItem(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity <List<ToDo>> getFilteredList(
            @RequestParam(required = false) String text,
            @RequestParam(required = false) ToDo.Priority priority,
            @RequestParam(required = false) Boolean isDone,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) String sortBy
    ){
        List<ToDo> todoList = toDoService.getFilteredList(
                text,
                priority,
                isDone,
                page,
                sortBy
        );

        return ResponseEntity.ok(todoList);
    }

    @PostMapping
    public ResponseEntity<ToDo> addItem(@Valid @RequestBody ToDoDTO request){
        ToDo newItem = toDoService.addItem(request);
        return ResponseEntity.ok(newItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateItem(
            @PathVariable String id,
            @Valid @RequestBody ToDoUpdateDTO request
    ) {
        Optional<ToDo> updatedItem = toDoService.updateItem(id, request);
        return updatedItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/done")
    public ResponseEntity<ToDo> markAsDone(@PathVariable String id) {
        Optional<ToDo> updatedItem = toDoService.markAsDone(id);
        return updatedItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/undone")
    public ResponseEntity<ToDo> markAsUndone(@PathVariable String id) {
        Optional<ToDo> updatedItem = toDoService.markAsUndone(id);
        return updatedItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
