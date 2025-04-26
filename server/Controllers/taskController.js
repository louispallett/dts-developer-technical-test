const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Task = require("../models/task");

exports.getAllTasks = asyncHandler(async (req, res, next) => {

});

exports.getTask = asyncHandler(async (req, res, next) => {

});

exports.createTask = [
    asyncHandler (async (req, res, next) => {

    })
];

exports.updateStatus = [
    asyncHandler (async (req, res, next) => {

    })
];

exports.deleteTask = asyncHandler(async (req, res, next) => {

});