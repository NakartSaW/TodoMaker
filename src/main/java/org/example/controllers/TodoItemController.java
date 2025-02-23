package org.example.controllers;

import org.example.models.TodoItem;
import org.example.services.TodoItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class TodoItemController {
    private final TodoItemService todoItemService;

    public TodoItemController(TodoItemService todoItemService) {
        this.todoItemService = todoItemService;
    }

    @PostMapping
    public ResponseEntity<TodoItem> createTodo(@RequestBody TodoItem todoItem) {
        return ResponseEntity.ok(todoItemService.save(todoItem));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TodoItem>> getTodosByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(todoItemService.getTodosByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoItem> getTodoById(@PathVariable Long id) {
        Optional<TodoItem> todoItem = todoItemService.findById(id);
        return todoItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoItem> updateTodo(@PathVariable Long id, @RequestBody TodoItem updatedTodo) {
        return todoItemService.findById(id)
                .map(todo -> {
                    todo.setTask(updatedTodo.getTask());
                    todo.setCompleted(updatedTodo.isCompleted());
                    return ResponseEntity.ok(todoItemService.save(todo));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}