package com.springboot.todoapp_backend.service;

import com.springboot.todoapp_backend.dtos.NewToDoDTO;
import com.springboot.todoapp_backend.dtos.UpdateToDoDTO;
import com.springboot.todoapp_backend.model.ToDo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class ToDoServiceTest {

    private ToDoService toDoService;

    @BeforeEach
    void setUp() {
        toDoService = new ToDoService();
    }

    @Test
    void testAddItem_Success() {
        NewToDoDTO newToDo = new NewToDoDTO("Test task", ToDo.Priority.HIGH, null);

        ToDo createdToDo = toDoService.addItem(newToDo);

        assertNotNull(createdToDo);
        assertEquals("Test task", createdToDo.getText());
        assertEquals(ToDo.Priority.HIGH, createdToDo.getPriority());
        assertFalse(createdToDo.isDone());
    }

    @Test
    void testGetItem_NotFound() {
        Optional<ToDo> item = toDoService.getItem("non-existing-id");
        assertTrue(item.isEmpty());
    }

    @Test
    void testMarkAsDone_Success() {
        NewToDoDTO newToDo = new NewToDoDTO("Test task", ToDo.Priority.MEDIUM, null);
        ToDo createdToDo = toDoService.addItem(newToDo);

        Optional<ToDo> markedAsDone = toDoService.markAsDone(createdToDo.getId());

        assertTrue(markedAsDone.isPresent());
        assertTrue(markedAsDone.get().isDone());
        assertNotNull(markedAsDone.get().getDoneDate());
    }

    @Test
    void testUpdateItem_Success() {
        NewToDoDTO newToDo = new NewToDoDTO("Test task", ToDo.Priority.MEDIUM, null);
        ToDo createdToDo = toDoService.addItem(newToDo);

        toDoService.updateItem(createdToDo.getId(), new UpdateToDoDTO("Updated task", ToDo.Priority.HIGH, null));

        Optional<ToDo> updatedToDo = toDoService.getItem(createdToDo.getId());
        assertTrue(updatedToDo.isPresent());
        assertEquals("Updated task", updatedToDo.get().getText());
        assertEquals(ToDo.Priority.HIGH, updatedToDo.get().getPriority());
    }
}
