// const User = require("../models/user");

// // GET /user
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find()
//             .populate({
//                 path: "quizHistory.quiz",  // Populate thông tin quiz trong lịch sử làm bài
//                 select: "title description"
//             })
//             .populate({
//                 path: "quizHistory.answers.question",  // Populate thông tin câu hỏi đã trả lời
//                 select: "text options correctAnswer"
//             })
//             .exec();

//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// // POST /user
// exports.createUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         if (!username || !email || !password) {
//             return res.status(400).json({ message: "Username, email, and password are required" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email is already registered" });
//         }

//         const user = new User({ 
//             username, 
//             email, 
//             password, 
//             quizHistory: []  // Khởi tạo lịch sử làm bài rỗng
//         });

//         await user.save();

//         res.status(201).json({ 
//             message: "User created successfully", 
//             user: {
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// const Quiz = require("../models/quiz");
// const Question = require("../models/question");

// // POST /user/:userId/quizzes/:quizId/submit
// exports.submitQuiz = async (req, res) => {
//     try {
//         const { userId, quizId } = req.params;
//         const { answers } = req.body;

//         if (!answers || !Array.isArray(answers)) {
//             return res.status(400).json({ message: "Invalid answers format" });
//         }

//         let score = 0;
//         const userAnswers = [];

//         for (const answer of answers) {
//             const question = await Question.findById(answer.questionId);
//             if (!question) continue;

//             const correctAnswerIndexes = Array.isArray(question.correctAnswerIndexes) 
//                 ? [...question.correctAnswerIndexes].sort() 
//                 : [];

//             const selectedOptions = Array.isArray(answer.selectedOptions) 
//                 ? [...answer.selectedOptions].sort() 
//                 : [];

//             const isCorrect = JSON.stringify(correctAnswerIndexes) === JSON.stringify(selectedOptions);
//             if (isCorrect) score += 1;

//             userAnswers.push({
//                 question: question._id,
//                 selectedOptions
//             });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // 📝 Lưu lịch sử làm bài (KHÔNG lưu `score`)
//         user.quizHistory.push({
//             quiz: quizId,
//             answers: userAnswers
//         });

//         await user.save();

//         res.json({
//             message: "Quiz submitted successfully!",
//             userId: user._id,
//             quizId,
//             score,  // Hiển thị điểm nhưng không lưu vào User
//             userAnswers
//         });
//     } catch (error) {
//         console.error("Error submitting quiz:", error);
//         res.status(500).json({ error: error.message });
//     }
// };



// // GET /user/:userId/history
// exports.getUserHistory = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await User.findById(userId).populate({
//             path: "quizzesTaken.quiz",
//             select: "title description"
//         }).populate({
//             path: "quizzesTaken.answers.question",
//             select: "text options correctAnswerIndex"
//         });

//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
