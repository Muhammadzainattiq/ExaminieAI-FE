"use client";

import { useState } from "react";

const ArticlePad = () => {
  const [title, setTitle] = useState(""); // State for the article title
  const [url, setUrl] = useState(""); // State for the article URL
  const [message, setMessage] = useState(""); // State for success/error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const [responseDetails, setResponseDetails] = useState<any>(null); // Store API response

  const submitArticle = async () => {
    // Form validation
    if (!title.trim()) {
      setMessage("Title is required");
      return;
    }

    if (!url.trim()) {
      setMessage("URL is required");
      return;
    }

    // URL validation
    try {
      new URL(url); // Will throw if invalid URL
    } catch {
      setMessage("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        "https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/content_upload/upload_web_article/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            title: title.trim(),
            url: url.trim(),
            file_type: "Article"
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail?.map((err: any) => 
          `${err.loc[1]}: ${err.msg}`
        ).join(', ') || 'An error occurred';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setMessage("Article submitted successfully!");
      setResponseDetails(data.contents || null);
      
      // Save content ID to selected_content_ids in localStorage
      const contentId = data.contents?.id;
      if (contentId) {
        const existingIds = JSON.parse(localStorage.getItem('selected_content_ids') || '[]');
        if (!existingIds.includes(contentId)) {
          existingIds.push(contentId);
          localStorage.setItem('selected_content_ids', JSON.stringify(existingIds));
        }
      }

    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error: Something went wrong. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Page Header */}
      <header className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
          Submit Your Article
        </h1>
        <div className="w-full mt-2 h-1 bg-gray-300"></div>
      </header>

      {/* Article Pad Container */}
      <div className="w-full max-w-2xl p-4 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Enter Article Details Below
        </h2>

        {/* Title Input */}
        <input
          type="text"
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 text-gray-700"
          placeholder="Enter the title of your article..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* URL Input */}
        <input
          type="url"
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 text-gray-700"
          placeholder="Enter the article URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Submit Button */}
        <div className="flex justify-end items-center mt-4">
          <button
            className={`px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={submitArticle}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}>
            {message}
          </p>
        )}
      </div>

      {/* Response Details */}
      {responseDetails && (
        <div className="w-full max-w-2xl p-4 mt-4 rounded-lg shadow-md border border-gray-300 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Response Details</h3>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>
              <strong>ID:</strong> {responseDetails.id}
            </li>
            <li>
              <strong>Title:</strong> {responseDetails.title || "N/A"}
            </li>
            <li>
              <strong>URL:</strong> <a href={responseDetails.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">{responseDetails.url}</a>
            </li>
            <li>
              <strong>Created At:</strong> {responseDetails.created_at || "N/A"}
            </li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full mt-6 flex items-center justify-center">
        {/* Placeholder for logo or additional footer content */}
      </footer>
    </div>
  );
};

export default ArticlePad;