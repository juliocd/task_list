"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.TaskSchema = new Schema({
    title: {
        type: String
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    creted_at: {
        type: Date,
        default: Date.now
    }
});
exports.Task = mongoose.model('Task', exports.TaskSchema);
