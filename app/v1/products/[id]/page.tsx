import { options } from "@/app/api/auth/[...nextauth]/options";
import ShopButton from "@/app/components/shopButton";
import ProductList from "@/services/productList";
import { getServerSession } from "next-auth";

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

const ProductbyId = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(options);
  const { id } = await params;
  const Data = await ProductList();
  const product = Data.find((item: Product) => item.id === Number(id));
  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container py-15 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap p-5">
          <div className="flex justify-center ">
            <img
              alt="ecommerce"
              className=" h-100 w-auto object-cover object-center"
              src={product.image}
            />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CATEGORY
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.category}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {Array.from({ length: 5 }, (_, index) =>
                  index < Math.round(product.rating.rate) ? (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ) : (
                    <svg
                      key={index}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  )
                )}
                <span className="text-gray-600 ml-3">
                  {product.rating.count} Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed my-10">{product.description}</p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                &#8377; {product.price}
              </span>
              <ShopButton product={product} user={session || null} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductbyId;
