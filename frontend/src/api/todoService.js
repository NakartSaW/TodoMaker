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
