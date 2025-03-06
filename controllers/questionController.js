const Question = require('../models/question');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.render('question/list', { questions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy danh sách câu hỏi");
  }
};


exports.getQuestionDetails = async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.render('question/details', { question });
};

// exports.createQuestion = async (req, res) => {
//   if (req.method === 'POST') {
//     const { text, answer, quizId } = req.body;
//     await Question.create({ text, answer, quiz: quizId });
//     res.redirect('/questions');
//   } else {
//     res.render('question/create');
//   }
// };
exports.createQuestion = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { text, options, correctAnswerIndex, keywords } = req.body;
      await Question.create({
        text,
        options: options.split(','), // Chuyển chuỗi thành mảng
        correctAnswerIndex: correctAnswerIndex.split(',').map(Number), // Chuyển chuỗi thành mảng số
        keywords: keywords ? keywords.split(',') : [] // Nếu có keywords thì chuyển thành mảng
      });
 
      res.redirect('/questions');
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi tạo câu hỏi");
    }
  } else {
    res.render('question/create');
  }
};


// exports.editQuestion = async (req, res) => {
//   const question = await Question.findById(req.params.id);
//   if (req.method === 'POST') {
//     question.text = req.body.text;
//     question.answer = req.body.answer;
//     await question.save();
//     res.redirect('/questions');
//   } else {
//     res.render('question/edit', { question });
//   }
// };
exports.editQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (req.method === 'POST') {
      // Lấy dữ liệu từ form
      const { text, options, correctAnswerIndex, keywords } = req.body;

      // Cập nhật thông tin câu hỏi
      question.text = text;
      question.options = options.split(','); // Chuyển chuỗi thành mảng
      question.correctAnswerIndex = correctAnswerIndex.split(',').map(Number);
      question.keywords = keywords ? keywords.split(',') : [];

      await question.save();
      return res.redirect('/questions');
    }

    // Nếu là GET, render form chỉnh sửa
    res.render('question/edit', { question });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
};


// exports.deleteQuestion = async (req, res) => {
//   await Question.findByIdAndDelete(req.params.id);
//   res.redirect('/questions');
// };
exports.deleteQuestion = async (req, res) => {
  try {
      const questionId = req.params.id;
      await Question.findByIdAndDelete(questionId);
      res.redirect('/questions');
  } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).send('Internal Server Error');
  }
};