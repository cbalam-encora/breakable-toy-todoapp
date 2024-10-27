package com.springboot.todoapp_backend.controller;

import com.springboot.todoapp_backend.Utilities.ApiResponse;
import com.springboot.todoapp_backend.dtos.NewToDoDTO;
import com.springboot.todoapp_backend.dtos.UpdateToDoDTO;
import com.springboot.todoapp_backend.model.ToDo;
import com.springboot.todoapp_backend.service.ToDoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
    public ResponseEntity<ApiResponse<List<ToDo>>>  getFilteredList(
            @RequestParam(required = false) String text,
            @RequestParam(required = false) ToDo.Priority priority,
            @RequestParam(required = false) Boolean isDone,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order
    ){

        if (sortBy != null && !sortBy.equalsIgnoreCase("priority") && !sortBy.equalsIgnoreCase("dueDate")) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid value for 'sortBy'. Accepted values are 'priority' or 'dueDate'"));
        }

        List<ToDo> todoList = toDoService.getFilteredList(
                text,
                priority,
                isDone,
                page,
                sortBy,
                order
        );

        Integer totalItems = toDoService.getTotalItems(
                text,
                priority,
                isDone,
                sortBy
        );

        if (todoList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(
                ApiResponse.successWithTotalItems("List retrieved successfully", todoList, totalItems)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ToDo>> addItem(@Valid @RequestBody NewToDoDTO request){
        ToDo newItem = toDoService.addItem(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("New item created: ", newItem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ToDo>> updateItem(
            @PathVariable String id,
            @Valid @RequestBody UpdateToDoDTO request
    ) {
        Optional<ToDo> updatedItem = toDoService.updateItem(id, request);
        return updatedItem.map(todo ->
                ResponseEntity.ok(ApiResponse.success("Item successfully updated", todo))
        ).orElseGet(() ->
                ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Item not found", HttpStatus.NOT_FOUND))
        );

    }

    @PostMapping("/{id}/done")
    public ResponseEntity<ApiResponse<ToDo>> markAsDone(@PathVariable String id) {

        Optional<ToDo> existingItem = toDoService.getItem(id);

        if (existingItem.isPresent()){
            ToDo todo = existingItem.get();
            if (todo.isDone()){
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
                        .body(ApiResponse.success("The item is already marked as done.", todo));
            } else {
                toDoService.markAsDone(id);
                return ResponseEntity.ok(ApiResponse.success("Item successfully marked as done.", todo));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Item not found", HttpStatus.NOT_FOUND));
        }
    }

    @PutMapping("/{id}/undone")
    public ResponseEntity<ApiResponse<ToDo>> markAsUndone(@PathVariable String id) {
        Optional<ToDo> existingItem = toDoService.getItem(id);

        if (existingItem.isPresent()){
            ToDo todo = existingItem.get();
            if (!todo.isDone()){
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
                        .body(ApiResponse.success("The item is already marked as undone.", todo));
            } else {
                toDoService.markAsUndone(id);
                return ResponseEntity.ok(ApiResponse.success("Item successfully marked as done.", todo));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Item not found", HttpStatus.NOT_FOUND));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteItem(@PathVariable String id) {
        Optional<ToDo> deletedItem = toDoService.deleteItem(id);

        if (deletedItem.isPresent()) {
            return ResponseEntity.ok(ApiResponse.success("Item successfully deleted", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Item not found", HttpStatus.NOT_FOUND));
        }
    }

    @GetMapping("/completion-stats")
    public ResponseEntity<Map<String, String>> getCompletionStatistics() {
        Map<String, String> stats = toDoService.getCompletionStats();
        return ResponseEntity.ok(stats);
    }



}
