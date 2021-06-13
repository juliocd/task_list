import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    title: {
        type: String
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    date_created: {
       type: Date,
       default: Date.now,
       require: true
    }
});

export const Task = mongoose.model('Task', TaskSchema);