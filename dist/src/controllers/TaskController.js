"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HipsumHelper_1 = require("../helpers/HipsumHelper");
const TaskHelper_1 = require("../helpers/TaskHelper");
const TaskSchema_1 = require("../models/TaskSchema");
const ApiController = {
    getTasks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let tasksNumberRequired = 3;
            if (req.query.tasks_number) {
                if (typeof (req.query.task_number) === 'number' || parseInt(req.query.tasks_number)) {
                    tasksNumberRequired = parseInt(req.query.tasks_number);
                }
                else {
                    res.json({
                        result: 'error',
                        details: "Invalid tasks_number value. It must be a number."
                    });
                    return;
                }
            }
            if (tasksNumberRequired < 1 || tasksNumberRequired > 500) {
                res.json({
                    result: 'error',
                    description: 'Invalid task_number range. It must be between 1 and 500'
                });
                return;
            }
            // Get the total tasks stored
            const totalStoredTasks = yield TaskHelper_1.default.getTotalTasks();
            if (totalStoredTasks === null) {
                res.json({
                    result: 'error',
                    description: 'Error retrieving total tasks. Please, try later.'
                });
                return;
            }
            if (totalStoredTasks < tasksNumberRequired) {
                const sentences = tasksNumberRequired - totalStoredTasks;
                // Create new task from API
                const hipsumResult = yield HipsumHelper_1.default.getSentences(sentences);
                if (!hipsumResult) {
                    res.json({
                        result: 'error',
                        description: 'Error retrieving data from Hipsum API. Please, try later.'
                    });
                    return;
                }
                let tasksToStore = [];
                for (const i in hipsumResult) {
                    const sentence = hipsumResult[i];
                    if (sentence === '') {
                        continue;
                    }
                    tasksToStore.push(new TaskSchema_1.Task({
                        title: hipsumResult[i]
                    }));
                }
                // Store in database
                const newTasks = yield TaskHelper_1.default.storeTasks(tasksToStore);
                if (!newTasks) {
                    res.json({
                        result: 'error',
                        description: 'Error storing tasks. Please, try later.'
                    });
                    return;
                }
            }
            // Get tasks from database
            let taskList = yield TaskHelper_1.default.getTasks(tasksNumberRequired);
            if (!taskList) {
                res.json({
                    result: 'error',
                    description: 'Error retrieving tasks. Please, try later.'
                });
                return;
            }
            let taskCounter = 1;
            for (let task of taskList) {
                task.name = `Task #${taskCounter}`;
                taskCounter++;
            }
            res.json({
                result: 'success',
                data: {
                    total: Math.max(totalStoredTasks, tasksNumberRequired),
                    batch_size: tasksNumberRequired,
                    batch: taskList
                }
            });
        }
        catch (e) {
            console.error('### ERROR getTasks: ', e);
            res.json({
                result: 'error',
                details: 'Error retrieving the task list. Please validate the information and try again.'
            });
        }
    }),
    updateTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const taskId = req.body.task_id;
            // Validations
            if (!taskId || typeof (taskId) !== 'string' || taskId === '') {
                res.json({
                    result: 'error',
                    details: "Invalid task_id value."
                });
                return;
            }
            const updateTaskResponse = yield TaskHelper_1.default.updateTask(taskId, { is_completed: true });
            if (!updateTaskResponse.success) {
                res.json({
                    result: 'error',
                    details: updateTaskResponse.details
                });
                return;
            }
            res.json({
                result: 'success'
            });
        }
        catch (e) {
            console.error('### ERROR updateTask: ', e);
            res.json({
                result: 'error',
                details: 'Error updating task. Please validate the information and try again.'
            });
        }
    })
};
exports.default = ApiController;
