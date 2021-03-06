// set up routing w/express
const express = require('express')
const router = express.Router()

// reference the Task model
const Task = require('../models/task')

/* GET tasks index view */
router.get('/', (req, res, next) => {
    // use the task model to fetch a list of tasks and pass these to the view for display
    // if an error occurs, the err param will be filled
    // if no error occurs, the tasks param will be filled with the query result
    Task.find((err, tasks) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('tasks/index', {
                tasks: tasks
            })
        }
    })
});

/* GET tasks add view */
router.get('/add', (req, res, next) => {
    res.render('tasks/add')
});

/* POST tasks/add form submission */
router.post('/add', (req, res, next) => {
    // use mongoose to try to save a new task object
    Task.create({
        name: req.body.name,
        priority: req.body.priority
    }, (err, task) => {
        if (err) {
            console.log(err);
            res.end(err)
        }
        else {
            res.redirect('/tasks')
        }
    })
});

// make controller public
module.exports = router;