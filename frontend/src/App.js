import React, { useState, useEffect } from 'react';
import {
    getNotes, addNote, updateNote, deleteNote,
    getTodos, addTodo, completeTask, deleteTask
} from './api/todoService';

function App() {
    const userId = 1;
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [todoTask, setTodoTask] = useState('');

    useEffect(() => {
        async function fetchData() {
            setNotes(await getNotes(userId));
            setTodos(await getTodos(userId));
        }
        fetchData();
    }, []);

    // Ajouter une note
    const handleAddNote = async () => {
        if (editingNoteId) {
            await updateNote(editingNoteId, { title: noteTitle, content: noteContent });
            setEditingNoteId(null);
        } else {
            const newNote = { title: noteTitle, content: noteContent, user: { id: userId } };
            await addNote(newNote);
        }
        setNotes(await getNotes(userId));
        setNoteTitle('');
        setNoteContent('');
    };

    // Modifier une note
    const handleEditNote = (note) => {
        setEditingNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    };

    // Supprimer une note
    const handleDeleteNote = async (noteId) => {
        await deleteNote(noteId);
        setNotes(await getNotes(userId));
    };

    // Ajouter une tâche
    const handleAddTodo = async () => {
        const newTodo = { task: todoTask, completed: false, user: { id: userId } };
        await addTodo(newTodo);
        setTodos(await getTodos(userId));
        setTodoTask('');
    };

    // Marquer une tâche comme complétée
    const handleCompleteTodo = async (todo) => {
        await completeTask(todo.id, todo.task);
        setTodos(await getTodos(userId));  // Rafraîchir la liste après modification
    };

    // Supprimer une tâche
    const handleDeleteTodo = async (todoId) => {
        await deleteTask(todoId);
        setTodos(await getTodos(userId));
    };

    return (
        <div>
            <h1>Gestion des Notes et Tâches</h1>

            <h2>Notes</h2>
            <input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Titre"
            />
            <input
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Contenu"
            />
            <button onClick={handleAddNote}>
                {editingNoteId ? "Modifier Note" : "Ajouter Note"}
            </button>

            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {note.title}: {note.content}
                        <button onClick={() => handleEditNote(note)}>✏️ Modifier</button>
                        <button onClick={() => handleDeleteNote(note.id)}>🗑️ Supprimer</button>
                    </li>
                ))}
            </ul>

            <h2>To-Do List</h2>
            <input
                value={todoTask}
                onChange={(e) => setTodoTask(e.target.value)}
                placeholder="Tâche"
            />
            <button onClick={handleAddTodo}>Ajouter Tâche</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task} - {todo.completed ? "✅" : "❌"}
                        {!todo.completed && (
                            <button onClick={() => handleCompleteTodo(todo)}>✔️ Compléter</button>
                        )}
                        <button onClick={() => handleDeleteTodo(todo.id)}>🗑️ Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
