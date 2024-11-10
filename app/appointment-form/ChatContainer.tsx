"use client";

import AIChatBox from "@/components/Chatbot/AIChatBox";
import AIChatButton from "@/components/Chatbot/AIChatButton";
import ApiResponse from "@/schema/ApiResponse";
import { useEffect, useState } from "react";

interface ChatContainerProps {
  setChatResponse: (response: ApiResponse) => void;
}

const ChatContainer = ({ setChatResponse }: ChatContainerProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    if (apiResponse) {
      setChatResponse(apiResponse);
      setLoading(false)
    }
  }, [apiResponse, setChatResponse]);

  const handleApiResponse = (response: ApiResponse) => {
    setLoading(false)
    setApiResponse(response)
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-4 h-auto">
      <div className="flex flex-col items-center justify-center w-full max-w-mdd ">
        {" "}
        {/* Add max width to center and contain the button */}
        <AIChatButton onClick={() => setOpen(!open)} />
        {open && (
          <AIChatBox
            open={open}
            onClose={() => setOpen(false)}
            setApiResponse={handleApiResponse}
            setLoading={setLoading}
          />
        )}
      </div>
      {loading && (
        <div className="text-center mt-4">
        <p>Loading, please wait...</p>
        {/* Optionally add a spinner here */}
      </div>
      )}
      {apiResponse && !loading && (
        <div className="summary-ai">
          <h3 className="text-lg font-semibold mb-2">
            Summary of Conversation:
          </h3>
          <div className="mb-2">
            <strong>Issue:</strong> {apiResponse.issue || "N/A"}
          </div>
          <div className="mb-2">
            <strong>Symptoms:</strong> {apiResponse.symptom || "N/A"}
          </div>
          <div className="mb-2">
            <strong>Medication:</strong> {apiResponse.medication || "N/A"}
          </div>
          <div className="mb-2">
            <strong>Other:</strong> {apiResponse.others || "N/A"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
