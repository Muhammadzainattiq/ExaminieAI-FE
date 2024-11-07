// pages/result.tsx
import { FC } from "react";
import Link from "next/link";

type QuestionResult = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

type ResultData = {
  totalScore: number;
  totalQuestions: number;
  correctAnswers: number;
  grade: string;
  feedback: string;
  improvementAreas: string[];
  questions: QuestionResult[];
};

const resultData: ResultData = {
  totalScore: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  grade: "A",
  feedback: "Great job! You have a strong understanding of the material.",
  improvementAreas: ["Focus on complex problem-solving", "Review physics concepts"],
  questions: [
    {
      question: "What is the acceleration due to gravity on Earth?",
      correctAnswer: "9.8 m/s²",
      userAnswer: "10 m/s²",
      explanation: "The correct answer is 9.8 m/s², as it is the standard gravitational acceleration on Earth.",
      isCorrect: false,
    },
    {
      question: "What is the chemical symbol for water?",
      correctAnswer: "H₂O",
      userAnswer: "H₂O",
      explanation: "Water is represented by H₂O, combining hydrogen and oxygen.",
      isCorrect: true,
    },
    // Add more questions as needed
  ],
};

const ResultPage: FC = () => {
  const percentage = (resultData.correctAnswers / resultData.totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 text-gray-800">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">Exam Results</h1>
          <p className="mt-2 text-gray-600">Student: John Doe | Date: October 28, 2024</p>
        </header>

        {/* Summary Section */}
        <section className="flex flex-wrap justify-between mb-8 bg-indigo-50 p-4 rounded-lg">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h2 className="text-xl font-semibold">Total Score</h2>
            <p className="text-3xl font-bold text-indigo-600">{resultData.totalScore}</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h2 className="text-xl font-semibold">Percentage</h2>
            <p className="text-3xl font-bold text-green-500">{percentage.toFixed(1)}%</p>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <h2 className="text-xl font-semibold">Grade</h2>
            <p className="text-3xl font-bold text-blue-500">{resultData.grade}</p>
          </div>
        </section>

        {/* Detailed Feedback */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personalized Feedback</h2>
          <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 text-green-700">
            {resultData.feedback}
          </p>
        </section>

        {/* Areas for Improvement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Areas for Improvement</h2>
          <ul className="list-disc list-inside pl-4 text-gray-700">
            {resultData.improvementAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </section>

        {/* Question-wise Results */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detailed Results</h2>
          <div className="space-y-4">
            {resultData.questions.map((question, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md ${
                  question.isCorrect ? "bg-green-50 border-l-4 border-green-400" : "bg-red-50 border-l-4 border-red-400"
                }`}
              >
                <h3 className="text-lg font-semibold">
                  Question {index + 1}: {question.question}
                </h3>
                <p className="mt-2">
                  <span className="font-semibold">Your Answer:</span> {question.userAnswer}
                </p>
                <p>
                  <span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
                </p>
                <p className="mt-2 text-gray-600">{question.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
            Retake Exam
          </button>
          <Link href="/exams">
            <p className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">
              View More Exams
            </p>
          </Link>
        </div>
      </div>

      {/* Link to Student Dashboard */}
      <footer className="mt-8">
        <Link href="/dashboard">
          <p className="text-indigo-600 hover:underline">Go to Student Dashboard</p>
        </Link>
      </footer>
    </div>
  );
};

export default ResultPage;
