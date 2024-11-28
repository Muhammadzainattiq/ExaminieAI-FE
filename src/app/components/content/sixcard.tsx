"use client";

import React, { useState, useEffect } from 'react';

const ContentUpload: React.FC = () => {
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Use environment variable for base URL with fallback
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/content_upload";

  const contentTypes = [
    { name: 'PDFs', description: 'Upload PDF files for question generation based on content.', icon: '📄', endpoint: '/upload_pdf/' },
    { name: 'DOCX', description: 'Upload DOCX files to turn text-based content into questions.', icon: '📑', endpoint: '/upload_docx/' },
    { name: 'XLSX', description: 'Upload Excel files for data-driven question generation.', icon: '📊', endpoint: '/upload_xlsx/' },
    { name: 'PPTX', description: 'Upload PowerPoint files to create questions based on slides.', icon: '📊', endpoint: '/upload_pptx/' },
    { name: 'Image', description: 'Upload images for visual question generation.', icon: '🖼', endpoint: '/upload_image/' },
    { name: 'Previous Exam (PDF, DOCX)', description: 'Upload previous exam files for practice questions.', icon: '📝', endpoint: '/upload_exam/' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('Authentication token not found');
      return;
    }
    fetchContentHistory(token);
  }, []);

  const fetchContentHistory = async (token: string) => {
    try {
      const studentId = localStorage.getItem('student_id');
      
      if (!studentId) {
        throw new Error('Student ID not found');
      }

      const response = await fetch(`${baseUrl}/get_contents_by_student_id/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          student_id: studentId,
          auth_token: token
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content history');
      }

      const data = await response.json();
      setHistory(data.contents || []);

    } catch (error) {
      console.error('Error fetching content history:', error);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleSelectContentType = (type: string) => {
    setSelectedContentType(type);
    setShowModal(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedContentType || uploadedFiles.length === 0 || !title) {
      console.error('Please select a content type, upload files and provide a title');
      return;
    }

    setLoading(true);

    try {
      const selectedType = contentTypes.find(type => type.name === selectedContentType);
      if (!selectedType) return;

      let token;
      try {
        token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Authentication token not found');
      } catch (e) {
        throw new Error('Unable to access localStorage. Please ensure cookies are enabled.');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('auth_token', token);
      uploadedFiles.forEach(file => {
        formData.append('file', file);
      });

      const response = await fetch(`${baseUrl}${selectedType.endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Upload failed');
      }

      const data = await response.json();
      console.log('Backend Response:', data);

      // Save only the latest content ID
      if (data.contents?.id) {
        localStorage.setItem('selected_content_ids', JSON.stringify([data.contents.id]));
      }

      console.log('Upload successful!');
      setUploadedFiles([]);
      setTitle('');
      setSelectedContentType(null);
      setShowModal(false);
      fetchContentHistory(token);

    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error) {
        if (error.message === 'Authentication token not found') {
          console.error('Please login to upload files');
        } else if (error.message.includes('localStorage')) {
          console.error(error.message);
        } else {
          console.error(`Failed to upload files: ${error.message}`);
        }
      } else {
        console.error('Failed to upload files. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r from-green-100 to-white">
      <div className="text-center mb-10">
        {/* Content Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {contentTypes
            .filter((ct) => !['Free Text', 'Topic', 'Article', 'Youtube Videos'].includes(ct.name))
            .slice(0, showAll ? contentTypes.length : 6)
            .map((contentType) => (
              <div
                key={contentType.name}
                onClick={() => handleSelectContentType(contentType.name)}
                className={`cursor-pointer flex flex-col items-center p-6 border rounded-lg transition-transform transform hover:scale-105 ${
                  selectedContentType === contentType.name ? 'border-green-900 shadow-lg' : 'border-green-500 shadow-sm'
                } bg-gradient-to-r from-green-200 to-white hover:bg-gradient-to-l`}
              >
                <div className="text-4xl mb-4 text-green-900">{contentType.icon}</div>
                <h3 className="font-semibold text-lg text-green-900">{contentType.name}</h3>
                <p className="text-sm text-green-700 text-center mt-2">{contentType.description}</p>
              </div>
            ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Upload Content</h2>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter title for your content"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-green-300 rounded-lg"
                  multiple
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setTitle('');
                    setUploadedFiles([]);
                    setSelectedContentType(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        <div className="group bg-gradient-to-r from-green-200 via-white to-green-300 hover:bg-gradient-to-l transition-all duration-500 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-900 mb-2 border-b border-green-300 pb-2">
            Upload History
          </h2>
          {history.length > 0 ? (
            <div className="border border-green-200 rounded-md p-4">
              <ul className="list-none space-y-4">
                {history.map((item, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium text-green-800">Title: {item.title}</div>
                    <div className="text-sm text-green-600">Type: {item.file_type}</div>
                    <div className="text-xs text-gray-500">Created: {new Date(item.created_at).toLocaleDateString()}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No upload history</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentUpload;