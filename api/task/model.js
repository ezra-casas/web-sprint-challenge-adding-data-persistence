// build your `Task` model here
const db = require('../../data/dbConfig');

function getAll() {
    return db('tasks as t')
    .select('t.*', 'p.project_name', 'p.project_description')
    .join('projects as p', 'p.project_id', 't.project_id')
}

async function add(task) {
    const [task_id] = await db('tasks').insert(task);
    return getAll().where({ task_id }).first();
}


module.exports = {
    getAll,
    add,
};


// - [ ] `[POST] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}`

// - [ ] `[GET] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Each task must include `project_name` and `project_description`
//   - Example of response body: `[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]`