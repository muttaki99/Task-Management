const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Create task
router.post('/', auth, async (req, res) => {
  const task = new Task({
    userId: req.user.id,
    title: req.body.title,
  });
  await task.save();
  res.json(task);
});

// Toggle complete
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
