import ProductCard from "@/components/productCard";

export default function ProductsByCategory({ products }) {
  return (
    <div className="px-10">
       <h3 className="my-5 text-2xl font-semibold">All {products?.[0]?.category?.title} Products:</h3>
      {products?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/categories`
  );
  const data = await res.json();

  const paths = data?.map((category) => ({
    params: { category: category?._id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/category/${params?.category}`
  );
  const products = await res.json();
  return { props: { products } };
};
