import { insertTask, selectAllTasks } from '../models/task.js'
import { ApiError } from '../helper/apiError.js'

const getTasks = async (req, res, next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(error)
    }
}

const createTask = async (req, res, next) => {
    
    const { task } = req.body

    console.log("CREATE TASK REQUEST:", task)

    try {    
        if (!task || !task.description || task.description.trim().length === 0) {
            return next(new ApiError('Task description is required', 400))
        }
        
        const result = await insertTask(task.description)

        return res.status(201).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}

export { getTasks, createTask }