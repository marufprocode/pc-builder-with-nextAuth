import BuilderCategory from "@/components/builderCategory";
import PcBuilderHeader from "@/components/pcBuilderHeader";

export default function PcBuilderPage({ categories }) {
  return (
      <div className="max-w-screen-xl w-full mx-auto m-10">
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
         <PcBuilderHeader/>
         <div className="my-3">
         {categories.map((category) => (
            <BuilderCategory key={category?._id} category={category} />
          ))}
         </div>
      </div>
      </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/categories`
  );
  const categories = await res.json();
  return { props: { categories } };
};
