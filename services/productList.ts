import { unstable_cache } from "next/cache";

const ProductList = unstable_cache(async () => {
  // const ProductList = async () => {
  try {
    const list = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Data = await list.json();
    return Data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
});
// };
export default ProductList;
