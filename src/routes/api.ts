import { Router } from 'express';
import TaskController from '../controllers/TaskController';
 
const router = Router();
 
router.get('/', (req, res) => {
  return res.json({
      methods: [
        {
            type: 'GET',
            name: "List Tasks",
            path: "/tasks",
            description: "List the N tasks requested",
            parameters:[
                {
                    name: 'Tasks Number',
                    path_name: 'tasks_number',
                    description: "Number of task to visualize"
                }
            ]
        },
        {
            type: 'PUT',
            name: "Complete Task",
            path: "/task",
            parameters:[
                {
                    name: 'Task Id',
                    path_name: 'task_id',
                    description: "Taks identifier"
                }
            ]
        }
      ]
  });
});

router.get('/tasks', TaskController.getTasks);
router.put('/task', TaskController.updateTask);
 
export default router;