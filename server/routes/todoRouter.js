import { pool } from '../helper/db.js'
import { Router } from 'express'
import { auth } from '../helper/auth.js'

const router = Router()

router.get('/tasks', (req, res) => {
    pool.query('SELECT * FROM task', (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(result.rows || [])
    })
})


router.delete('/tasks/:id', (req, res, next) => {
    const { id } = req.params
    pool.query('delete from task WHERE id = $1',
        [id],
        (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.rowCount === 0) {
                const error = new Error('Task not found')
                error.status = 404
                return next(error)
            }
            return res.status(200).json({ id: Number(id) })
        })
})

router.post('/tasks', auth, (req, res, next) => {
    const { task } = req.body
    if (!task) {
        return res.status(400).json({ error: 'Task is required' })
    }
    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [task.description],
        (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({ id: result.rows[0].id, description: task.description })
        })
})

router.delete('/tasks/:id', auth, (req, res, next) => {
    console.log("DELETE REQUEST:", req.params.id)
    const { id } = req.params

    console.log(`Deleting task with id: ${id}`)
    pool.query('DELETE FROM task WHERE id = $1',
        [id], (err, result) => {
            if (err) {
                console.error(err.message)
                return next(err)
            }
            if (result.rowCount === 0) {
                return next(new Error('Task not found'))
            }
            return res.status(200).json({ id: Number(id) })
        })
})

export default router