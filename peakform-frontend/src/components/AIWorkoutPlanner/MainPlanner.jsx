"use client";
import { useState, useEffect } from "react";
import WorkoutPlannerForm from "./WorkoutPlannerForm";
import WorkoutPlanDisplay from "./WorkoutDisplay";

export default function Home() {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState(null);

  const handleSubmitForm = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const dataWithUuid = {
        userUuid: localStorage.getItem("user_uuid"),
        ...formData,
      };

      // Save request data for debugging display
      setRequestData(dataWithUuid);

      // Print the request body data to the console
      console.log("Submitting workout request with data:", dataWithUuid);
      console.log(
        "JSON.stringify request body:",
        JSON.stringify(dataWithUuid, null, 2)
      );

      const response = await fetch(
        "http://localhost:8080/user/ai-generate-workout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataWithUuid),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate workout plan");
      }

      const data = await response.json();
      setWorkoutPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 p-6 rounded-lg border border-[#05A31D]">
            <h2 className="text-2xl font-bold mb-6">
              Create Your Workout Plan
            </h2>
            <WorkoutPlannerForm
              onSubmit={handleSubmitForm}
              isLoading={isLoading}
            />

            {/* Request data display for debugging */}
            {requestData && (
              <div className="mt-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700 overflow-auto max-h-64">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-zinc-400">
                    Request Body Data:
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(requestData, null, 2)
                      );
                      alert("Request data copied to clipboard!");
                    }}
                    className="text-xs bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded"
                  >
                    Copy to clipboard
                  </button>
                </div>
                <pre className="text-xs text-zinc-300 whitespace-pre-wrap">
                  {JSON.stringify(requestData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-[#05A31D]">
            <h2 className="text-2xl font-bold mb-6">Your AI Workout Plan</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#05A31D]"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-900/20 rounded">
                <p>Error: {error}</p>
                <p className="mt-2">Please try again later.</p>
              </div>
            ) : workoutPlan ? (
              <WorkoutPlanDisplay workoutPlan={workoutPlan} />
            ) : (
              <div className="text-zinc-400 flex flex-col items-center justify-center h-64">
                <p>
                  Fill out the form and submit to generate your personalized
                  workout plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
