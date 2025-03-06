const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.getQuizzes);
router.get('/create', quizController.createQuiz);
router.post('/create', quizController.createQuiz);
router.get('/:id', quizController.getQuizDetails);
router.get('/:id/edit', quizController.editQuiz);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);
router.route('/:quizId/question')
    .get(quizController.createOrAddQuestion)  // Hiển thị form
    .post(quizController.createOrAddQuestion); // Xử lý tạo câu hỏi


module.exports = router;
