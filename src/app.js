// Imports

// Migrating from CommonJS to ESM
import express from "express";

import { add, get, getAll, update, remove } from "./db.js";
import {
    OK,
    CREATED,
    NO_CONTENT,
    NOT_FOUND,
    UNSUPPORTED_MEDIA_TYPE,
} from "./http_statuses.js";

import { v4 as uuidv4 } from "uuid";

// Utilities
const generateUUID = () => uuidv4();

const generateISOStringNow = () => new Date().toISOString();

const generateNewItem = obj => ({
    ...obj,
    _id: generateUUID(),
    _createdOn: generateISOStringNow(),
});

const headersAreValid = req => {
    if (req.header("content-type") !== "application/json")
        return { ok: false, msg: "Incorrect content-type header" };
    return { ok: true, msg: null };
};

const removeReservedProps = obj => {
    const copy = {};
    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (prop.startsWith("_")) return;
        copy[prop] = obj[prop];
    });
    return copy;
};

// Start app
const app = express();
const port = 3000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    next();
});

// CREATE
app.post("/", (req, res) => {
    // Make this nicer
    let { ok, msg } = headersAreValid(req);
    if (!ok) {
        res.status(UNSUPPORTED_MEDIA_TYPE).send(msg);
        return;
    }
    const body = removeReservedProps(req.body);
    const newItem = generateNewItem(body);
    // TODO: check if adding worked
    add(newItem);
    res.status(CREATED).send(newItem);
});

// READ
app.get("/", (req, res) => {
    // Make this nicer
    let { ok, msg } = headersAreValid(req);
    if (!ok) {
        res.status(UNSUPPORTED_MEDIA_TYPE).send(msg);
        return;
    }
    // We should always get something
    ({ ok, msg } = getAll());
    res.status(OK).send(msg);
});

app.get("/:id", (req, res) => {
    // Make this nicer
    let { ok, msg } = headersAreValid(req);
    if (!ok) {
        res.status(UNSUPPORTED_MEDIA_TYPE).send(msg);
        return;
    }
    const id = req.params.id;
    ({ ok, msg } = get(id));
    if (ok) {
        res.status(OK).send(msg);
    } else {
        res.status(NOT_FOUND).send(msg);
    }
});

// UPDATE
app.put("/:id", (req, res) => {
    // Make this nicer
    let { ok, msg } = headersAreValid(req);
    if (!ok) {
        res.status(UNSUPPORTED_MEDIA_TYPE).send(msg);
        return;
    }
    const id = req.params.id;
    const body = removeReservedProps(req.body);
    body._updatedOn = generateISOStringNow();
    ({ ok, msg } = update(id, body));
    if (ok) {
        res.status(OK).send(msg);
    } else {
        res.status(NOT_FOUND).send("Unknown id");
    }
});

// DELETE
app.delete("/:id", (req, res) => {
    const id = req.params.id;
    let { ok, msg } = remove(id);
    if (ok) {
        res.status(NO_CONTENT).send();
    } else {
        res.status(NOT_FOUND).send("Unknown id");
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});