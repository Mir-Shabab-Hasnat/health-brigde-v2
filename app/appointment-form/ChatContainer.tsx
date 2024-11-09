"use client";

import AIChatBox from "@/components/Chatbot/AIChatBox";
import AIChatButton from "@/components/Chatbot/AIChatButton";
import { useEffect, useState } from "react";

// API response from ChatGPT analysis
interface ApiResponse {
  issue: string;
  symptom: string;
  medication: string;
  others: string;
  severity: number;
}

interface ChatContainerProps {
  setChatResponse: (response: ApiResponse) => void;
}

const ChatContainer = ({ setChatResponse }: ChatContainerProps) => {
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);


  useEffect(() => {
    if (apiResponse) {
        setChatResponse(apiResponse);
      }
  }, [apiResponse, setChatResponse])
  
  console.log(apiResponse)

    return (
        <div className="flex flex-col items-center justify-center rounded-lg p-4 h-auto">
            <div className='flex flex-col items-center justify-center w-full max-w-mdd '> {/* Add max width to center and contain the button */}
                <AIChatButton onClick={() => setOpen(!open)} />
                {open && (
                    <AIChatBox
                        open={open}
                        onClose={() => setOpen(false)}
                        setApiResponse={setApiResponse} />
                )}
            </div>
            {apiResponse && (
                <div className="summary-ai">
                    <h3 className="text-lg font-semibold mb-2">Summary of Conversation:</h3>
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
}

export default ChatContainer;