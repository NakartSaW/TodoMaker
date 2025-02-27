import React, { useState, useEffect } from 'react';
import { getNotes, addNote, getTodos, addTodo } from './api/todoService';

function App() {
  const userId = 1;
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [todoTask, setTodoTask] = useState('');

  useEffect(() => {
    async function fetchData() {
      setNotes(await getNotes(userId));
      setTodos(await getTodos(userId));
    }
    fetchData();
  }, []);

  const handleAddNote = async () => {
    const newNote = { title: noteTitle, content: noteContent, user: { id: userId } };
    await addNote(newNote);
    setNotes(await getNotes(userId));
  };

  const handleAddTodo = async () => {
    const newTodo = { task: todoTask, completed: false, user: { id: userId } };
    await addTodo(newTodo);
    setTodos(await getTodos(userId));
  };

  return (
      <div>
        <h1>Gestion des Notes et Tâches</h1>

        <h2>Notes</h2>
        <input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Titre" />
        <input value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Contenu" />
        <button onClick={handleAddNote}>Ajouter Note</button>
        <ul>
          {notes.map((note) => (
              <li key={note.id}>{note.title}: {note.content}</li>
          ))}
        </ul>

        <h2>To-Do List</h2>
        <input value={todoTask} onChange={(e) => setTodoTask(e.target.value)} placeholder="Tâche" />
        <button onClick={handleAddTodo}>Ajouter Tâche</button>
        <ul>
          {todos.map((todo) => (
              <li key={todo.id}>{todo.task} - {todo.completed ? "✅" : "❌"}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;
