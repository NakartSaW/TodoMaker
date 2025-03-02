import React, { useState, useEffect } from 'react';
import {
    getNotes, addNote, updateNote, deleteNote,
    getTodos, addTodo, completeTask, deleteTask
} from './api/todoService';
import "./styles.css";

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

    const handleAddNote = async () => {
        if (!noteTitle.trim() && !noteContent.trim()) return; // Prevent adding empty notes

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

    const handleEditNote = (note) => {
        setEditingNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    };

    const handleDeleteNote = async (noteId) => {
        await deleteNote(noteId);
        setNotes(await getNotes(userId));
    };

    const handleAddTodo = async () => {
        if (!todoTask.trim()) return; // Prevent adding empty tasks

        const newTodo = { task: todoTask, completed: false, user: { id: userId } };
        await addTodo(newTodo);
        setTodos(await getTodos(userId));
        setTodoTask('');
    };

    const handleCompleteTodo = async (todo) => {
        await completeTask(todo.id, todo.task);
        setTodos(await getTodos(userId));
    };

    const handleDeleteTodo = async (todoId) => {
        await deleteTask(todoId);
        setTodos(await getTodos(userId));
    };

    return (
        <div className="app-container">
            {/* Todo List Container */}
            <div className="container">
                <h1>To-Do List</h1>

                <div className="task-input-container">
                    <input
                        type="text"
                        value={todoTask}
                        onChange={(e) => setTodoTask(e.target.value)}
                        placeholder="Add your task"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                    />
                    <button className="add-button" onClick={handleAddTodo}>ADD</button>
                </div>

                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id} className={todo.completed ? "completed" : ""}>
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCompleteTodo(todo)}
                                />
                            </div>
                            <span className="task-text">{todo.task}</span>
                            <button
                                className="delete-button action-button"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Notes Container */}
            <div className="container">
                <h2 className="notes-title">Notes</h2>

                <div className="note-input-container">
                    <input
                        type="text"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Content"
                    />
                    <button className="add-button" onClick={handleAddNote}>
                        {editingNoteId ? "Update Note" : "Add Note"}
                    </button>
                </div>

                <div className="notes-list">
                    {notes.map((note) => (
                        <div key={note.id} className="note-content">
                            <span className="note-title">{note.title}</span>
                            <p className="note-body">{note.content}</p>
                            <div className="note-actions" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <button
                                    className="edit-button action-button"
                                    onClick={() => handleEditNote(note)}
                                >
                                    ✏️
                                </button>
                                <button
                                    className="delete-button action-button"
                                    onClick={() => handleDeleteNote(note.id)}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;