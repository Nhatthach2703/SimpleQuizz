const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', questionController.getQuestions);
router.get('/create', questionController.createQuestion);
router.post('/create', questionController.createQuestion);
router.get('/:id', questionController.getQuestionDetails);
router.get('/:id/edit', questionController.editQuestion);
router.post('/:id/edit', questionController.editQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;