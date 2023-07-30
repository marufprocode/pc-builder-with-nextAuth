import CategoryCard from "@/components/categoryCard";
import ProductCard from "@/components/productCard";

export default function Home({ featuredProducts, featuredCategories }) {
  return (
    <main className="px-10">
      <h3 className="my-5 text-2xl font-semibold">Featured Products:</h3>
      {featuredProducts?.length > 0 && (
        <div className="grid grid-cols-5 place-items-center gap-5">
          {featuredProducts?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
      <h3 className="my-10 text-2xl font-semibold">Featured Categories:</h3>
      {featuredCategories?.length > 0 && (
        <div className="grid grid-cols-2 place-items-center gap-5">
          {featuredCategories?.map((category) => (
            <CategoryCard key={category?._id} category={category} />
          ))}
        </div>
      )}
    </main>
  );
}

export const getServerSideProps = async () => {
  const products = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/featured-products`
  );
  const featuredProducts = await products.json();
  const categories = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/featured-categories`
  );
  const featuredCategories = await categories.json();
  return {
    props: {
      featuredProducts,
      featuredCategories,
    },
  };
};
