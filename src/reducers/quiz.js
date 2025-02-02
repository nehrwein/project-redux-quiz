import { createSlice } from "@reduxjs/toolkit";
//import { useHistory } from 'react-router-dom'


// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: "How many notes are there in a musical scale?",
    options: ["7", "10", "8", "9"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText:
      "What company is also the name of one of the longest rivers in the world?",
    options: ["Nile", "Amazon", "Mississippi", "Mekong"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    questionText: "What is the highest mountain in the world?",
    options: ["Denali", "Cerro Aconcagua", "Mount Everest", "Kilimanjaro"],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    questionText: "How many centimetres are in a meter?",
    options: ["10", "50", "100", "1000"],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    questionText:
      "Who is next in line to the British throne after Queen Elizabeth II?",
    options: [
      "./assets/princewilliam.jpeg",
      "./assets/princecharles.jpg",
      "./assets/princeedward.jpg",
      "./assets/princerichard.jpg",
    ],
    correctAnswerIndex: 1,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  score: 0 /* new property for keeping count of correct answers */,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      /* for progress bar, because when page reaload progress bar continued to
increase amount o f questions */
      window.location.reload(false);

      return initialState;
    },

    /* new function that raises the score for every correct answer */
    riseScore: (state) => {
      state.score += 1;
    },
  },
});
