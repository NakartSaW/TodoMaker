package org.example.controllers;

import org.example.models.Note;
import org.example.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        return ResponseEntity.ok(noteService.save(note));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Note>> getNotesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(noteService.getNotesByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Optional<Note> note = noteService.findById(id);
        return note.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        return noteService.findById(id)
                .map(note -> {
                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());
                    return ResponseEntity.ok(noteService.save(note));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}