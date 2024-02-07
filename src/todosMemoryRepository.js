const crypto = require('node:crypto');
const db = new Map();

db.set('5576b1d8-17cf-44c6-a38b-628d960c6c6a', {text: 'This is todo 1 text', id: '5576b1d8-17cf-44c6-a38b-628d960c6c6a'});
db.set('509719c5-5c59-4e66-8d1f-918f2994a6b4', {text: 'This is todo 2 text', id: '509719c5-5c59-4e66-8d1f-918f2994a6b4'});

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (todo) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text: todo.text,
        };
        db.set(newTodo.id, newTodo);
    },
    deleteByID: (uuid) => db.delete(uuid),
    update: (todo) => db.set(todo.id, todo), 
};

module.exports = repo;