const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const db = new Map();

// db.set('5576b1d8-17cf-44c6-a38b-628d960c6c6a', {text: 'This is todo 1 text', id: '5576b1d8-17cf-44c6-a38b-628d960c6c6a'});
// db.set('509719c5-5c59-4e66-8d1f-918f2994a6b4', {text: 'This is todo 2 text', id: '509719c5-5c59-4e66-8d1f-918f2994a6b4'});

const loadData = () => {
    try {
        const filePath = path.join(__dirname, '../data/todos.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8').trim(); // Trim to remove whitespace
        if (jsonData) {
            const todosArray = JSON.parse(jsonData); // This line will throw if jsonData is empty or invalid
            todosArray.forEach((element) => {
                db.set(element[0], element[1]);
            });
        } else {
            // If jsonData is empty, just log it or initialize the db with default values if necessary
            console.log('No existing todos found. Starting with an empty database.');
        }
    } catch (error) {
        console.error('Failed to load todos:', error);
        // Handle error or initialize db with default/empty values as needed
    }
};
const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/todos.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (todo) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text: todo.text,
        };
        db.set(newTodo.id, newTodo);
        saveData();
    },
    deleteByID: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (todo) => {
        db.set(todo.id, todo);
        saveData();
    }, 
};
loadData();

module.exports = repo;