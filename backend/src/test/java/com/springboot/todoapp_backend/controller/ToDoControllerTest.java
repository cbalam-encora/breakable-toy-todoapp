package com.springboot.todoapp_backend.controller;

import com.springboot.todoapp_backend.Utilities.ApiResponse;
import com.springboot.todoapp_backend.dtos.NewToDoDTO;
import com.springboot.todoapp_backend.model.ToDo;
import com.springboot.todoapp_backend.service.ToDoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.openMocks;

public class ToDoControllerTest {
    @Mock
    private ToDoService toDoService;

    @InjectMocks
    private ToDoController toDoController;

    @BeforeEach
    void setUp(){
        openMocks(this);
    }

    @Test
    void testGetItem_Success(){
        ToDo mockToDo = new ToDo();
        mockToDo.setText("Test Task");
        mockToDo.setPriority(ToDo.Priority.HIGH);

        when(toDoService.getItem("1")).thenReturn(Optional.of(mockToDo));

        ResponseEntity<ToDo> response = toDoController.getItem("1");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Test Task", Objects.requireNonNull(response.getBody()).getText());
    }

    @Test
    void testGetItem_NotFound() {
        when(toDoService.getItem("1")).thenReturn(Optional.empty());

        ResponseEntity<ToDo> response = toDoController.getItem("1");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testAddItem_Success() {
        NewToDoDTO newToDo = new NewToDoDTO("New Task", ToDo.Priority.LOW, null);
        ToDo mockToDo = new ToDo();
        mockToDo.setText("New Task");

        when(toDoService.addItem(any(NewToDoDTO.class))).thenReturn(mockToDo);

        ResponseEntity<ApiResponse<ToDo>> response = toDoController.addItem(newToDo);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("New Task", Objects.requireNonNull(response.getBody()).getData().getText());
    }

    @Test
    void testDeleteItem_Success() {
        ToDo mockToDo = new ToDo();
        mockToDo.setText("Test task");

        when(toDoService.deleteItem("1")).thenReturn(Optional.of(mockToDo));

        ResponseEntity<ApiResponse<String>> response = toDoController.deleteItem("1");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Item successfully deleted", Objects.requireNonNull(response.getBody()).getMessage());
    }

    @Test
    void testDeleteItem_NotFound() {
        when(toDoService.deleteItem("1")).thenReturn(Optional.empty());

        ResponseEntity<ApiResponse<String>> response = toDoController.deleteItem("1");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Item not found", Objects.requireNonNull(response.getBody()).getMessage());
    }
}
