"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { FaRedo, FaArrowCircleRight } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define interfaces for result data
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
    localStorage.removeItem("exam-id");
    localStorage.removeItem("attemptID");
    router.push("/exams");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-green-500 font-semibold">Loading your result...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-red-100 text-red-600 p-6 rounded shadow-lg">
          <h1 className="text-xl font-bold">Error</h1>
          <p className="mt-4">{error}</p>
          <button
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
      <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <div className="text-yellow-500 font-semibold">No result data found. Please try again.</div>
      </div>
    );
  }

  const { overall_result } = result;

  const pieData = {
    labels: ["Obtained Marks", "Remaining Marks"],
    datasets: [
      {
        data: [overall_result.obtained_marks, overall_result.total_marks - overall_result.obtained_marks],
        backgroundColor: ["#38A169", "#C6F6D5"],
        hoverBackgroundColor: ["#2F855A", "#9AE6B4"],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Exam Result</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
        <motion.div
          className="bg-green-600 shadow-lg rounded-lg p-8 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            {overall_result.exam_title}
          </h1>

          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} height={200} width={200} />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 text-white text-lg">
            <div>
              <h2 className="text-2xl font-extrabold">Total Marks</h2>
              <p>{overall_result.total_marks}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Obtained Marks</h2>
              <p>{overall_result.obtained_marks}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Percentage</h2>
              <p>{overall_result.percentage}%</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Grade</h2>
              <p>{overall_result.grade}</p>
            </div>
          </div>

          <div className="flex justify-around mt-6">
            <motion.button
              className="bg-white text-green-600 px-4 py-2 rounded shadow hover:bg-gray-100 flex items-center gap-2"
              onClick={retakeExam}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaRedo /> Retake Exam
            </motion.button>
            <motion.button
              className="bg-white text-green-600 px-4 py-2 rounded shadow hover:bg-gray-100 flex items-center gap-2"
              onClick={() => router.push("/dashboard")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaArrowCircleRight /> View More Exams
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
