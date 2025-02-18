import React from "react";

export default function InfoSerDetail({ additionalInfo, showFullInfo, setShowFullInfo, image }) {
  return (
    <div>
      <div className="pt-4">
        <div className="bg-white p-4">
          <h2 className="text-2xl mb-5 font-bold text-gray-800">Service Information</h2>
          <div
            className={`text-gray-700 text-md space-y-3 ${
              showFullInfo ? "" : "line-clamp-3 overflow-hidden"
            }`}
          >
            <ul className="list-disc pl-5 space-y-2">
              {additionalInfo.map((info, index) => {
                if (info.includes(":")) {
                  const [title, content] = info.split(":");
                  return (
                    <li key={index} className="text-sd list-none">
                      <span className="font-bold text-lg">{title}:</span> {content}
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="text-sm ml-4">
                      {info}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          {showFullInfo && (
            <div className="mt-4 flex justify-center">
              <img
                src={image}
                alt="Dịch vụ"
                className="w-[800px] h-auto rounded-lg shadow-md"
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
      <hr className="my-4 border-gray-200" />
    </div>
  );
}
