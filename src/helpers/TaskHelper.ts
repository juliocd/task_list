import * as mongoose from 'mongoose';
import { TaskSchema } from '../models/TaskSchema';
import { ITask } from '../interfaces/ITask';
import { IResult } from '../interfaces/IResult';
const Task = mongoose.model('Task', TaskSchema);

class TaskHelper {

    public static async getTotalTasks(): Promise<number|null>{

        try{
            const totalTaskResponse = await Task.countDocuments();
            return totalTaskResponse;
        }catch(e){
            console.error("### ERROR TaskHelper.getTotalTasks: ", e);
            return null;
        }
    }

    public static async getTasks(limit:number = 3): Promise<ITask[]|null>{
        let response:ITask[] = [];

        try{
            const storedTasksResponse:any[] = await Task.find({}).sort({'date_created': 1}).limit(limit);
            for(const storedTask of storedTasksResponse){
                response.push({
                    title: storedTask.title,
                    is_completed: storedTask.is_completed,
                    id: storedTask._id
                })
            }

            return response;
        }catch(e){
            console.error("### ERROR TaskHelper.getTasks: ", e);
            return null;
        }
    }

    public static async storeTasks(tasks:ITask[]): Promise<ITask[]|null>{
        let response:ITask[] = [];

        try{
            const newTasksResponse:any = await Task.collection.insertMany(tasks);
            if(newTasksResponse.result.ok != 1){
                return null;
            }

            for(const storedTask of newTasksResponse.ops){
                response.push({
                    title: storedTask.title,
                    is_completed: storedTask.is_completed,
                    id: storedTask._id
                })
            }

            return response;
        }catch(e){
            console.error("### ERROR TaskHelper.storeTasks: ", e);
            return null;
        }
    }

    public static async updateTask(taskId:string, payload:object): Promise<IResult>{
        try{
            const taskResponse = await Task.findById(taskId);
            if(taskResponse){
                await Task.updateOne({
                    _id: taskId
                }, payload);

                return {
                    success: true
                }
            }else{
                return {
                    success: false,
                    details: "Error updating task. Task not found"
                };
            }

        }catch(e){
            console.error("### ERROR TaskHelper.updateTask: ", e);
            return {
                success: false,
                details: "Error updating task."
            };
        }
    }
}

export default TaskHelper;