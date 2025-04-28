const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Task = require("../models/task");
const replaceEncodedChars = require("../config/replaceEncodedChars.js");

exports.getAllTasks = asyncHandler(async (req, res, next) => {
    try {
        const allTasks = await Task.find().sort({ CreationDate: -1 });
        
        if (!allTasks) {
            const error = new Error("Database failed to fetch tasks");
            throw error;
        }

        for (let task of allTasks) {
            task.title = replaceEncodedChars(task.title);
            if (task.description) task.description = replaceEncodedChars(task.description);
        }

        res.json({ allTasks });
    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Server Error",
        });
    }
});

exports.getTask = asyncHandler(async (req, res, next) => {
    try {
        const { taskId } = req.query;
        const task = await Task.find({ _id: taskId });

        if (!task) {
            const error = new Error("Database failed to fetch task");
            error.statusCode = 404;
            throw error;
        }

        task[0].title = replaceEncodedChars(task[0].title);
        if (task[0].description) task[0].description = replaceEncodedChars(task[0].description);

        res.json({ task });
    } catch (err) {
        console.log(err);
        console.log(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Server Error",
        });
    }
});

exports.createTask = [
    body("title")
        .trim()
        .isLength({ min: 1, max: 40 })
        .withMessage("Title must be between 2 and 40 characters")
        .escape(),
    body("description")
        .trim()
        .isLength({ max: 10000 })
        .withMessage("Description cannot be longer than 10000 characters")
        .escape(),
    body("due")
        .trim()
        .escape()
        .isDate(),

    asyncHandler (async (req, res, next) => {
        try {
            const newTask = new Task({
                title: req.body.title,
                description: req.body.description ? req.body.description : null,
                due: req.body.due
            });
    
            const tasksWithTitle = await Task.find({ title: req.body.title });
            if (tasksWithTitle.length > 0) {
                newTask.title = `${newTask.title} (${tasksWithTitle.length})`
            }
    
            const savedTask = await newTask.save();
    
            res.json({savedTask});
        } catch (err) {
            console.log(err);
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Server Error",
            });
        }
    })
];

exports.updateStatus = [
    body("status")
        .trim()
        .escape(),
    
    asyncHandler (async (req, res, next) => {
        try {
            const taskExists = await Task.findById(req.body.taskId);
            if (!taskExists) {
                const error = new Error(`Database failed to fetch task ${req.body.taskId}`);
                throw error;
            }

            await Task.updateOne(
                { _id: req.body.taskId },
                { status: req.body.status }
            )

            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Server Error",
            });
        }
    })
];

exports.deleteTask = asyncHandler(async (req, res, next) => {
    try {
        const taskExists = await Task.findById(req.body.taskId);
        if (!taskExists) {
            const error = new Error(`Database failed to fetch task ${req.body.taskId}`);
            throw error;
        }

        await Task.findByIdAndDelete(req.body.taskId);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Server Error",
        });
    }
});
