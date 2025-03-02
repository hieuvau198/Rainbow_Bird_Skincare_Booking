import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function InfoSerDetail({ additionalInfo, showFullInfo, setShowFullInfo, image }) {
  return (
    <div>
      <div className="pt-4">
        <div className="bg-white p-4">
          <h2 className="text-2xl mb-5 font-bold text-gray-800">Service Information</h2>
          <div className={`text-gray-700 text-md space-y-3 ${showFullInfo ? "" : "line-clamp-3 overflow-hidden"}`}>
            <MDEditor.Markdown source={additionalInfo || "No additional information available."} />
          </div>

          {showFullInfo && (
            <div className="mt-4 flex justify-center">
              <img
                src={image}
                alt="Service"
                className="w-96 h-80 rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            className="mt-4 mx-auto block border border-green-500 text-green-500 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition-all"
            onClick={() => setShowFullInfo(!showFullInfo)}
          >
            {showFullInfo ? "Collapse" : "See More"}
          </button>
        </div>
      </div>
    </div>
  );
}
