"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();
  useEffect(() => {
    console.error("Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center border">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>

        <p className="text-gray-700 mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
