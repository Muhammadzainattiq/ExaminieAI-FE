"use client"
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaRedo, FaArrowCircleRight } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for the result data
interface OverallResult {
  result_id: string;
  exam_title: string;
  total_marks: number;
  obtained_marks: number;
  grade: string;
  percentage: number;
}

interface QuestionResult {
  question_id: string;
  statement: string;
  response: string | null;
  question_type: string;
  total_marks: number;
  obtained_marks: number;
  feedback: string;
}

interface StudentProgress {
  total_exams_taken: number;
  exams_passed: number;
  exams_failed: number;
  total_points: number;
  overall_percentage: number;
  overall_grade: string;
}

interface ResultData {
  overall_result: OverallResult;
  question_results: QuestionResult[];
  student_progress: StudentProgress;
}

export default function Result() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAndCompleteExam = async () => {
      const examId = localStorage.getItem("exam-id");
      const attemptId = localStorage.getItem("attemptID");
      const accessToken = localStorage.getItem("access_token");

      if (!examId || !attemptId || !accessToken) {
        setError("Missing required data (exam ID, attempt ID, or access token).");
        setLoading(false);
        return;
      }

      try {
        // Step 1: Complete the Exam Attempt
        const completeResponse = await fetch(
          `https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/exams/complete_exam_attempt/${examId}/${attemptId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!completeResponse.ok) {
          const completeError = await completeResponse.json();
          setError(`Failed to complete the exam: ${completeError.message}`);
          setLoading(false);
          return;
        }

        // Step 2: Fetch the Exam Result
        const resultResponse = await fetch(
          `https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/results/generate_and_update_result/${attemptId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!resultResponse.ok) {
          const resultError = await resultResponse.json();
          setError(`Failed to fetch result: ${resultError.message}`);
          setLoading(false);
          return;
        }

        const resultData: ResultData = await resultResponse.json();
        setResult(resultData);

        // Save result data in local storage for potential reuse
        localStorage.setItem("result", JSON.stringify(resultData));
        setLoading(false);
      } catch (error) {
        console.error("Error during exam completion or result fetching:", error);
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    };

    fetchAndCompleteExam();
  }, []);

  const retakeExam = () => {
    localStorage.removeItem("exam_id");
    localStorage.removeItem("attemptID");
    router.push("/exams"); // Redirect to the exam page or dashboard
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="text-green-500 font-semibold">Loading your result...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="bg-red-500 text-white p-6 rounded shadow-lg">
          <h1 className="text-xl font-bold">Error</h1>
          <p className="mt-4">{error}</p>
          <button
            className="mt-6 bg-white text-red-500 px-4 py-2 rounded shadow hover:bg-gray-200"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-100">
        <div className="text-yellow-500 font-semibold">
          No result data found. Please try again.
        </div>
      </div>
    );
  }

  const { overall_result, question_results, student_progress } = result;

  // Pie chart data
  const pieData = {
    labels: ['Obtained Marks', 'Remaining Marks'],
    datasets: [
      {
        data: [overall_result.obtained_marks, overall_result.total_marks - overall_result.obtained_marks],
        backgroundColor: ['#38A169', '#D4E157'],
        hoverBackgroundColor: ['#2F855A', '#9E9E9E'],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Exam Result</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
        <motion.div
          className="bg-green-500 shadow-lg rounded-lg p-6 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center mb-4 text-white">
            {overall_result.exam_title}
          </h1>

          {/* Pie Chart */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Pie data={pieData} options={{ responsive: true }} />
          </motion.div>

          <div className="text-white text-lg mb-4">
            <p>
              <span className="font-semibold">Total Marks:</span> {overall_result.total_marks}
            </p>
            <p>
              <span className="font-semibold">Obtained Marks:</span> {overall_result.obtained_marks}
            </p>
            <p>
              <span className="font-semibold">Percentage:</span> {overall_result.percentage}%
            </p>
            <p>
              <span className="font-semibold">Grade:</span> {overall_result.grade}
            </p>
          </div>

          <h2 className="text-xl font-bold text-white mt-6 mb-4">Detailed Feedback</h2>
          <div className="bg-white rounded-lg shadow p-4 text-gray-800">
            {question_results.map((question, index) => (
              <div key={question.question_id} className="mb-4">
                <h3 className="font-semibold">{index + 1}. {question.statement}</h3>
                <p>
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {question.response || "Unattempted"}
                </p>
                <p>
                  <span className="font-semibold">Marks:</span> {question.obtained_marks}/{question.total_marks}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Feedback:</span> {question.feedback}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-around mt-6">
            <motion.button
              className="bg-white text-green-500 px-4 py-2 rounded shadow hover:bg-gray-200 flex items-center gap-2"
              onClick={retakeExam}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaRedo /> Retake Exam
            </motion.button>
            <motion.button
              className="bg-white text-green-500 px-4 py-2 rounded shadow hover:bg-gray-200 flex items-center gap-2"
              onClick={() => router.push("/dashboard")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaArrowCircleRight /> View More Exams
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
