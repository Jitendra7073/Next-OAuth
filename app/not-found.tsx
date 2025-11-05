import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="py-10 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="mt-6 text-4xl font-bold text-gray-800">
          Page Not Found
        </h1>
        <p className="mt-3 text-gray-600">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 hover:underline font-semibold text-gray-500 rounded-lg hover:text-gray-800 transition">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
