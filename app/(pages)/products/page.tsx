import Link from "next/link";

const Products = async () => {
  const ProductList = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const Data = await ProductList.json();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl py-10">
          Product List
        </h1>
        <div className="flex flex-wrap">
          {Data.map((product: any) => {
            return (
              <div
                className="p-5 md:w-1/4 sm:mb-0 mb-6 border border-gray-300 border-dashed space-y-4 flex justify-between flex-col "
                key={product.id}>
                <div>
                  <div className="flex justify-center rounded-lg h-64 overflow-hidden mb-5">
                    <img
                      src={product.image}
                      width={300}
                      height={300}
                      className="object-contain object-center"
                      alt={product.name}
                    />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900">
                    {product.title.substring(0, 50)}
                    {product.title.length > 110 && "..."}
                  </h2>
                  <p className="text-base leading-relaxed my-2">
                    {product.description.toLowerCase().substring(0, 110)}
                    {product.description.length > 110 && "..."}
                  </p>
                </div>
                <div className="">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center font-semibold cursor-pointer hover:text-blue-500 transition">
                    View More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
