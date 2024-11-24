"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaUpload, FaPencilAlt, FaClipboardList, FaChartBar, FaSignOutAlt, FaBookOpen, FaCheck, FaTimes, FaPercentage, FaStar } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { useRouter } from 'next/navigation';
import Sidebar from '../SiderBar/page';

const ExamList = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  // Sample data for charts
  const passFailData = [
    { name: 'Pass', value: 75 },
    { name: 'Fail', value: 25 }
  ];

  const examHistoryData = [
    { name: 'Exam 1', score: 85, average: 75 },
    { name: 'Exam 2', score: 92, average: 78 },
    { name: 'Exam 3', score: 78, average: 80 },
    { name: 'Exam 4', score: 88, average: 82 },
    { name: 'Exam 5', score: 95, average: 85 },
    { name: 'Exam 6', score: 82, average: 80 },
    { name: 'Exam 7', score: 90, average: 83 },
    { name: 'Exam 8', score: 87, average: 81 },
    { name: 'Exam 9', score: 93, average: 84 },
    { name: 'Exam 10', score: 89, average: 86 }
  ];

  const latestExamResult = {
    exam_title: "Final Mathematics Exam", 
    total_marks: 100,
    obtained_marks: 85,
    grade: "A",
    percentage: 85,
    feedback: "Excellent work! Strong understanding of calculus concepts shown.",
    strengths: ["Problem Solving", "Analytical Thinking", "Calculus Concepts"],
    areas_for_improvement: ["Complex Integration", "Vector Calculus"],
    time_taken: "1 hour 45 minutes",
    exam_date: "2024-01-15",
    question_breakdown: {
      correct: 17,
      incorrect: 3,
      skipped: 0
    }
  };

  const performanceData = [
    { name: 'Correct', value: latestExamResult.obtained_marks },
    { name: 'Incorrect', value: latestExamResult.total_marks - latestExamResult.obtained_marks }
  ];

  const COLORS = ['#4CAF50', '#FF5252'];

  const onPieEnter = (_: any, index: number) => {
    setHoveredPieIndex(index);
  };

  const onPieLeave = () => {
    setHoveredPieIndex(null);
  };

  const handleNavigation = (label: string) => {
    setActiveTab(label.toLowerCase());
    if (label.toLowerCase() === 'profile') {
      router.push('/components/Profile');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <motion.div 
        className="flex-1 p-8"
        initial={false}
        animate={{
          marginLeft: isCollapsed ? "80px" : "240px",
          width: "100%"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
              <p className="opacity-90">Track your progress and performance all in one place</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-50 transition-colors flex items-center space-x-2"
              onClick={() => handleNavigation('Generate Exam')}
            >
              <FaPencilAlt className="w-5 h-5" />
              <span>Generate New Exam</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {[
            { icon: FaBookOpen, label: 'Total Exams', value: '15', color: 'blue' },
            { icon: FaCheck, label: 'Total Pass', value: '12', color: 'green' },
            { icon: FaTimes, label: 'Total Fail', value: '3', color: 'red' },
            { icon: FaPercentage, label: 'Success Rate', value: '80%', color: 'purple' },
            { icon: FaStar, label: 'Points Earned', value: '450', color: 'yellow' }
          ].map(({ icon: Icon, label, value, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Icon className={`w-8 h-8 text-${color}-500 mb-4`} />
              <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
              <p className="text-2xl font-bold text-green-600">{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Pass/Fail Ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pass/Fail Ratio</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={passFailData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                  >
                    {passFailData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        style={{
                          transform: hoveredPieIndex === index ? 'scale(1.1)' : 'scale(1)',
                          transformOrigin: 'center',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Performance Graph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Last 10 Exam Results</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={examHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#4CAF50" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Latest Exam Result Card with Performance Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Score Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        style={{
                          transform: hoveredPieIndex === index ? 'scale(1.1)' : 'scale(1)',
                          transformOrigin: 'center',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Latest Exam Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest Exam Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-700">{latestExamResult.exam_title}</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {latestExamResult.exam_date}</p>
                  <p><span className="font-medium">Total Marks:</span> {latestExamResult.total_marks}</p>
                  <p><span className="font-medium">Obtained Marks:</span> {latestExamResult.obtained_marks}</p>
                  <p><span className="font-medium">Grade:</span> {latestExamResult.grade}</p>
                  <p><span className="font-medium">Percentage:</span> {latestExamResult.percentage}%</p>
                  <p><span className="font-medium">Time Taken:</span> {latestExamResult.time_taken}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Question Breakdown</h5>
                  <div className="space-y-1">
                    <p className="text-green-600">Correct: {latestExamResult.question_breakdown.correct}</p>
                    <p className="text-red-600">Incorrect: {latestExamResult.question_breakdown.incorrect}</p>
                    <p className="text-gray-600">Skipped: {latestExamResult.question_breakdown.skipped}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Strengths</h5>
                  <ul className="list-disc list-inside text-green-600">
                    {latestExamResult.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Areas for Improvement</h5>
                  <ul className="list-disc list-inside text-orange-600">
                    {latestExamResult.areas_for_improvement.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Feedback</h5>
              <p className="text-gray-600">{latestExamResult.feedback}</p>
            </div>
          </motion.div>
        </div>

        {/* Performance Overview Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={examHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="score" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.3} />
                <Area type="monotone" dataKey="average" stroke="#2196F3" fill="#2196F3" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExamList;
