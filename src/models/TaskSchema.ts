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
    creted_at: {
       type: Date,
       default: Date.now
    }
});

export const Task = mongoose.model('Task', TaskSchema);