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
const mongoose = require("mongoose");
const TaskSchema_1 = require("../models/TaskSchema");
const Task = mongoose.model('Task', TaskSchema_1.TaskSchema);
class TaskHelper {
    static getTotalTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalTaskResponse = yield Task.countDocuments();
                return totalTaskResponse;
            }
            catch (e) {
                console.error("### ERROR TaskHelper.getTotalTasks: ", e);
                return null;
            }
        });
    }
    static getTasks(limit = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = [];
            try {
                const storedTasksResponse = yield Task.find({}).sort({ 'date_created': 1 }).limit(limit);
                for (const storedTask of storedTasksResponse) {
                    response.push({
                        title: storedTask.title,
                        is_completed: storedTask.is_completed,
                        id: storedTask._id
                    });
                }
                return response;
            }
            catch (e) {
                console.error("### ERROR TaskHelper.getTasks: ", e);
                return null;
            }
        });
    }
    static storeTasks(tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = [];
            try {
                const newTasksResponse = yield Task.collection.insertMany(tasks);
                if (newTasksResponse.result.ok != 1) {
                    return null;
                }
                for (const storedTask of newTasksResponse.ops) {
                    response.push({
                        title: storedTask.title,
                        is_completed: storedTask.is_completed,
                        id: storedTask._id
                    });
                }
                return response;
            }
            catch (e) {
                console.error("### ERROR TaskHelper.storeTasks: ", e);
                return null;
            }
        });
    }
    static updateTask(taskId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskResponse = yield Task.findById(taskId);
                if (taskResponse) {
                    yield Task.updateOne({
                        _id: taskId
                    }, payload);
                    return {
                        success: true
                    };
                }
                else {
                    return {
                        success: false,
                        details: "Error updating task. Task not found"
                    };
                }
            }
            catch (e) {
                console.error("### ERROR TaskHelper.updateTask: ", e);
                return {
                    success: false,
                    details: "Error updating task."
                };
            }
        });
    }
}
exports.default = TaskHelper;
