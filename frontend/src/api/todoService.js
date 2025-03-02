import api from './axios';

// get all notes from a user
export const getNotes = async (userId) => {
    const response = await api.get(`/notes/user/${userId}`);
    return response.data;
};

// create a note
export const addNote = async (note) => {
    const response = await api.post('/notes', note);
    return response.data;
};

// modify a note
export const updateNote = async (noteId, updatedData) => {
    const response = await api.put(`/notes/${noteId}`, updatedData);
    return response.data;
};

// delete a note
export const deleteNote = async (noteId) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
};

// get all tasks from a user
export const getTodos = async (userId) => {
    const response = await api.get(`/todos/user/${userId}`);
    return response.data;
};

// create a task
export const addTodo = async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
};

// mark a task as completed
export const completeTask = async (taskId, taskName) => {
    return api.put(`/todos/${taskId}`, {
        task: taskName,
        completed: true
    });
};

// delete a task
export const deleteTask = async (taskId) => {
    const response = await api.delete(`/todos/${taskId}`);
    return response.data;
};
