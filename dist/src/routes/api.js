"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
const router = express_1.Router();
router.get('/', (req, res) => {
    return res.json({
        methods: [
            {
                type: 'GET',
                name: "List Tasks",
                path: "/tasks",
                description: "List the N tasks requested",
                parameters: [
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
                parameters: [
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
router.get('/tasks', TaskController_1.default.getTasks);
router.put('/task', TaskController_1.default.updateTask);
exports.default = router;
