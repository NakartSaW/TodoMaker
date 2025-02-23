package org.example.services;

import org.example.models.TodoItem;
import org.example.repositories.TodoItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoItemService {
    private final TodoItemRepository todoItemRepository;

    public TodoItemService(TodoItemRepository todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

    public List<TodoItem> getTodosByUser(Long userId) {
        return todoItemRepository.findByUserId(userId);
    }

    public Optional<TodoItem> findById(Long id) {
        return todoItemRepository.findById(id);
    }

    public TodoItem save(TodoItem todoItem) {
        return todoItemRepository.save(todoItem);
    }

    public void delete(Long id) {
        todoItemRepository.deleteById(id);
    }
}