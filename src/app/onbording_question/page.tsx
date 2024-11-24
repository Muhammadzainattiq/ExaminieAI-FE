"use client";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMale,
  FaFemale,
  FaTransgender,
  FaUserGraduate,
  FaChild,
  FaBrain,
  FaUsers,
  FaBook,
  FaMusic,
  FaGamepad,
  FaTrophy,
  FaCompass,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaLightbulb,
  FaGlobe,
  FaHeart,
  FaMedal,
  FaBriefcase,
  FaCogs,
  FaStethoscope,
  FaPalette,
  FaChartLine,
} from "react-icons/fa";

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

const icons: Record<string, React.ReactNode> = {
  Male: <FaMale size={32} />,
  Female: <FaFemale size={32} />,
  Other: <FaTransgender size={32} />,
  Introvert: <FaBrain size={32} />,
  Extrovert: <FaUsers size={32} />,
  Ambivert: <FaUserGraduate size={32} />,
  Thinker: <FaLightbulb size={32} />,
  Feeler: <FaHeart size={32} />,
  Reading: <FaBook size={32} />,
  Sports: <FaTrophy size={32} />,
  Music: <FaMusic size={32} />,
  Gaming: <FaGamepad size={32} />,
  Grades: <FaTrophy size={32} />,
  Knowledge: <FaLightbulb size={32} />,
  "Personal Growth": <FaCompass size={32} />,
  Curiosity: <FaGraduationCap size={32} />,
  "Peer Competition": <FaChalkboardTeacher size={32} />,
  "Passing Exams": <FaGraduationCap size={32} />,
  "Improving Grades": <FaTrophy size={32} />,
  "Gaining Knowledge": <FaLightbulb size={32} />,
  "Graduate with Honors": <FaMedal size={32} />,
  "Build a Career": <FaBriefcase size={32} />,
  "Personal Fulfillment": <FaHeart size={32} />,
  Engineering: <FaCogs size={32} />,
  Medicine: <FaStethoscope size={32} />,
  Arts: <FaPalette size={32} />,
  Business: <FaChartLine size={32} />,
  Math: <FaCogs size={32} />, // Representing math with a gear icon
  Science: <FaBrain size={32} />, // Representing science with a brain icon
  History: <FaBook size={32} />, // Representing history with a book icon
  Art: <FaPalette size={32} />, // Representing art with a palette icon
 // A generic "other" icon
};

type OnboardingQuestion = {
  question: string;
  type: "select" | "input" | "button";
  options?: string[];
};

const onboardingQuestions: OnboardingQuestion[] = [
  { question: "How old are you?", type: "input" },
  { question: "What is your gender?", type: "button", options: ["Male", "Female", "Other"] },
  { question: "Which country do you currently live in?", type: "select", options: countries },
  { question: "How would you describe your style of interacting with others?", type: "button", options: ["Introvert", "Extrovert", "Ambivert"] },
  { question: "How do you typically make decisions?", type: "button", options: ["Thinker", "Feeler"] },
  { question: "What is your current level of education?", type: "button", options: ["High School", "Undergraduate", "Postgraduate", "Other"] },
  { question: "What was your grade in the most recent academic assessment?", type: "button", options: ["A", "B", "C", "D", "F"] },
  { question: "What is your favorite subject?", type: "button", options: ["Math", "Science", "History", "Art", "Other"] },
  { question: "What activities do you enjoy in your free time?", type: "button", options: ["Reading", "Sports", "Music", "Gaming", "Other"] },
  { question: "What motivates you to study?", type: "button", options: ["Grades", "Knowledge", "Personal Growth", "Curiosity", "Peer Competition"] },
  { question: "What are your short-term academic goals?", type: "button", options: ["Passing Exams", "Improving Grades", "Gaining Knowledge"] },
  { question: "What are your long-term academic goals?", type: "button", options: ["Graduate with Honors", "Build a Career", "Personal Fulfillment"] },
  { question: "What career paths are you interested in pursuing?", type: "button", options: ["Engineering", "Medicine", "Arts", "Business", "Other"] },
];

const OnboardingPage: FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array(onboardingQuestions.length).fill(""));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < onboardingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = onboardingQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / onboardingQuestions.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 ">
      <motion.div
        className="w-full max-w-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-green-700 mb-4 text-center">
          Student Profile Setup
        </h1>
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Help us personalize your experience with a few quick questions.
        </h2>
        
        <motion.div
          className="text-xl font-semibold mb-10 text-center text-green-600"
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          {currentQuestion.question}
        </motion.div>
        {currentQuestion.type === "button" && (
          <motion.div
            className="flex justify-center items-center flex-wrap gap-3 place-items-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentQuestion.options?.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleAnswerChange(option)}
                className={`w-36 h-36 flex flex-col items-center justify-center rounded-lg border ${
                  answers[currentQuestionIndex] === option
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {icons[option] || <FaGlobe size={32} />}
                <span className="mt-2 text-sm text-center">{option}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
        {currentQuestion.type === "input" && (
          <motion.input
            type="number"
            placeholder="Enter your age"
            value={answers[currentQuestionIndex]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {currentQuestion.type === "select" && (
          <motion.select
            value={answers[currentQuestionIndex]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <option value="">Select your country</option>
            {currentQuestion.options?.map((country, idx) => (
              <option className="text-green-700" key={idx} value={country}>
                {country}
              </option>
            ))}
          </motion.select>
        )}
        <div className="flex justify-center mb-5">
        <div className="mt-4 w-40 bg-gray-200 h-2 rounded-full">
          <motion.div
            className="bg-green-700 h-2 rounded-full"
            style={{ width: `${progress * 100}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={goToPreviousQuestion}
            className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={goToNextQuestion}
            className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            disabled={!answers[currentQuestionIndex]}
          >
            {currentQuestionIndex === onboardingQuestions.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
        
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
