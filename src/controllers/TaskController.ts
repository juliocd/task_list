import HipsumHelper from '../helpers/HipsumHelper';
import TaskHelper from '../helpers/TaskHelper';
import { Task } from '../models/TaskSchema';

const ApiController = {
    getTasks: async (req, res) => {
        
        try{
            let tasksNumberRequired:number = 3;
            if(req.query.tasks_number){
                if(typeof(req.query.task_number) === 'number' || parseInt(req.query.tasks_number)){
                    tasksNumberRequired = parseInt(req.query.tasks_number)
                }else{
                    res.json({
                        result: 'error',
                        details: "Invalid tasks_number value. It must be a number."
                    })
                    return;
                }
            }
            if(tasksNumberRequired < 1 || tasksNumberRequired > 500){
                res.json({
                    result: 'error',
                    description: 'Invalid task_number range. It must be between 1 and 500'
                });
                return;
            }

            // Get the total tasks stored
            const totalStoredTasks = await TaskHelper.getTotalTasks();
            if(totalStoredTasks === null){
                res.json({
                    result: 'error',
                    description: 'Error retrieving total tasks. Please, try later.'
                });
                return;
            }

            if(totalStoredTasks < tasksNumberRequired){
                const sentences = tasksNumberRequired - totalStoredTasks;

                // Create new task from API
                const hipsumResult = await HipsumHelper.getSentences(sentences);
                if(!hipsumResult){
                    res.json({
                        result: 'error',
                        description: 'Error retrieving data from Hipsum API. Please, try later.'
                    });
                    return;
                }
                let tasksToStore = [];
                for(const i in hipsumResult){
                    const sentence = hipsumResult[i];
                    if(sentence === ''){
                        continue;
                    }
                    
                    tasksToStore.push(new Task({
                        title: hipsumResult[i]
                    }));
                }

                // Store in database
                const newTasks = await TaskHelper.storeTasks(tasksToStore);
                if(!newTasks){
                    res.json({
                        result: 'error',
                        description: 'Error storing tasks. Please, try later.'
                    });
                    return;
                }
            }

            // Get tasks from database
            let taskList = await TaskHelper.getTasks(tasksNumberRequired);
            if(!taskList){
                res.json({
                    result: 'error',
                    description: 'Error retrieving tasks. Please, try later.'
                });
                return;
            }

            let taskCounter = 1;
            for(let task of taskList){
                task.name = `Task #${taskCounter}`;
                taskCounter++;
            }

            res.json({
                result: 'success',
                data: {
                    total: Math.max(totalStoredTasks, tasksNumberRequired),
                    tasks: taskList
                }
            })
        }catch(error){
            console.error('### ERROR getTasks: ', error)
            res.json({
                result: 'error',
                details: 'Error retrieving the task list. Please validate the information and try again.'
            })
        }
    },

    updateTask: async (req, res) =>{
        try{
            const taskId = req.body.task_id;

            // Validations
            if(!taskId || typeof(taskId) !== 'string' || taskId === ''){
                res.json({
                    result: 'error',
                    details: "Invalid task_id value."
                })
                return;
            }

            const updateTaskResponse = await TaskHelper.updateTask(taskId, {is_completed: true});
            if(!updateTaskResponse.success){
                res.json({
                    result: 'error',
                    details: updateTaskResponse.details
                })
                return;
            }

            res.json({
                result: 'success'
            })
        }catch(e){
            console.error('### ERROR updateTask: ', e)
            res.json({
                result: 'error',
                details: 'Error updating task. Please validate the information and try again.'
            })
        }
    }
}

export default ApiController;