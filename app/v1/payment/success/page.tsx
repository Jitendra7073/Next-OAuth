"use client";

import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-8 text-center relative">
        {/* Success Icon */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-100 rounded-full p-4 border-4 border-white shadow-md">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>

        {/* Message */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-5">
          Payment Successful!
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          The payment has been done successfully. <br />
          Thanks for being there with us.
        </p>

        {/* Done Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
          DONE
        </button>
      </div>
    </div>
  );
}
