"use client";

import Link from "next/link";
// import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ShopButton = ({ product, user }: { product: Product; user: any }) => {
  // const route = useRouter();
  const handleBuyNow = async () => {
    const response = await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
        user,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.paymentURL;
    }
    console.log("Response From backend : ", JSON.stringify(response));
  };

  return user ? (
    <button
      onClick={handleBuyNow}
      className="flex items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
      Buy Now
      <svg
        fill="none"
        stroke="currentColor"
        className="w-4 h-4 ml-2"
        viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  ) : (
    <div className="flex items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
      <Link href="/auth/signin">Buy Now</Link>
    </div>
  );
};

export default ShopButton;
