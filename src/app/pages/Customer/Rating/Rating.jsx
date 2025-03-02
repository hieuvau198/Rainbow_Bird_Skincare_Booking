import React, { useState } from 'react';

const possibleTags = [
  'Great quality',
  'Very professional',
  'Worth the money',
  'Relaxing environment',
  'Friendly staff'
];

export default function SkincareServiceReview() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Limit to 3 files maximum
    setFileList(files.slice(0, 3));
  };

  const handleSubmit = () => {
    // Here you could call an API to store the review
    console.log({
      rating,
      selectedTags,
      comment,
      fileList
    });
    alert('Your review has been submitted!');

    // Reset the form
    setRating(0);
    setSelectedTags([]);
    setComment('');
    setFileList([]);
  };

  return (
    <div className=" pt-10 pb-24 bg-slate-50">
    <div className="max-w-[1080px] mx-auto my-10 p-6 bg-green-100/70 shadow rounded">
      <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">Review Your Skincare Service</h2>
      <p className="text-gray-500 mb-4"></p>

      {/* Star Rating */}
      <div className="mb-6 text-center">
        <div className="flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              type="button"
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            </button>
          ))}
        </div>
        <div className="mt-2">
          {rating
            ? `You have rated ${rating} star${rating > 1 ? 's' : ''}`
            : 'Tap on a star to rate'}
        </div>
      </div>

      {/* Tag Selection */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Select your remarks:</p>
        <div className="flex flex-wrap gap-2">
          {possibleTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                type="button"
                className={`px-3 py-1 rounded-full border text-sm focus:outline-none ${
                  isSelected
                    ? 'bg-green-400 text-white border-green-400'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comment Box */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Share your experience:</p>
        <textarea
          rows="4"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
          placeholder="Tell us what you enjoyed about this service..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Image Upload */}
      {/* <div className="mb-6">
        <p className="font-semibold mb-2">Upload photos (max 3):</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {fileList.length > 0 && (
          <ul className="mt-2">
            {fileList.map((file, index) => (
              <li key={index} className="text-gray-600 text-sm">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!rating || !comment}
        className={`w-full py-2 px-4 rounded text-white text-lg ${
          !rating || !comment
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        Submit Review
      </button>
    </div>
    </div>
  );
}
