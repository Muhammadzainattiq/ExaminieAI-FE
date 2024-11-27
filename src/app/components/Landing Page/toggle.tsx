"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faChalkboard, faUserGraduate, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

const BenefitsCard = ({
  title,
  benefits,
  icon,
  hoverIcon,
  hoverText
}: {
  title: string;
  benefits: string[];
  icon: any;
  hoverIcon: any;
  hoverText: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="p-5 bg-white rounded-lg shadow-md border border-green-300 w-full sm:w-96"
    >
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white transition-transform duration-300"
        >
          <FontAwesomeIcon icon={hoverIcon} size="lg" />
        </motion.div>
        <h3 className="text-2xl font-semibold text-green-600">{title}</h3>
      </div>
      <ul className="list-disc pl-6 space-y-3 text-gray-700">
        {benefits.map((benefit, index) => (
          <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * index }}>
            {benefit}
          </motion.li>
        ))}
      </ul>

      {/* Hover Effect Text */}
      <motion.div
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="mt-4 text-center text-sm text-gray-500"
      >
        {hoverText}
      </motion.div>
    </motion.div>
  );
};

const RoleCards = () => {
  const studentBenefits = [
    "Access to personalized learning resources",
    "Interactive study materials and practice tests",
    "Time management tips and productivity tools",
    "Peer collaborations and study groups",
  ];

  const teacherBenefits = [
    "AI-powered insights into student performance",
    "Customizable lesson plans and teaching tools",
    "Access to a variety of teaching resources",
    "Ability to track student progress and feedback",
  ];

  return (
    <div className="flex flex-col items-center gap-8 py-10 px-5 bg-gray-50 h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Benefits for Students & Teachers</h2>

      {/* Cards for Student and Teacher */}
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Student Benefits Card */}
        <BenefitsCard
          title="Benefits for Students"
          benefits={studentBenefits}
          icon={faUserGraduate}
          hoverIcon={faBook}
          hoverText="Unlock your learning potential with personalized resources."
        />

        {/* Teacher Benefits Card */}
        <BenefitsCard
          title="Benefits for Teachers"
          benefits={teacherBenefits}
          icon={faChalkboardTeacher}
          hoverIcon={faChalkboard}
          hoverText="Empower your teaching with tools and insights."
        />
      </div>
    </div>
  );
};

export default RoleCards;