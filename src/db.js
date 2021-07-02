import JSDB from "@small-tech/jsdb";

const db = JSDB.open("database");

// To delete the database: delete the file.
if (!db.todo) db.todo = [];

// TODO: check if adding worked
export const add = item => db.todo.push(item);

const _findItem = id => {
    const query = db.todo.where("_id").is(id);
    return query.length === 0 ?
        { ok: false, msg: "Unknown id" } :
        { ok: true, msg: query[0] };
};

export const get = id => {
    const { ok, msg } = _findItem(id);
    if (ok) return { ok: true, msg };
    return { ok: false, msg: "Unknown id" };
};

export const getAll = () => ({ ok: true, msg: db.todo });

export const update = (id, item) => {
    const { ok, msg } = _findItem(id);
    if (!ok) return { ok: false, msg: "Unknown id" };
    Object.getOwnPropertyNames(item).forEach(prop => {
        msg[prop] = item[prop];
    });
    return { ok: true, msg };
};

export const remove = id => {
    const index = db.todo.findIndex(t => t._id === id);

    if (index === -1) return { ok: false, msg: "Unknown id" };

    // Slow, but good enough for our purposes.
    // In-place update.
    db.todo.splice(index, 1);
    return { ok: true, msg: "Item deleted" };
};