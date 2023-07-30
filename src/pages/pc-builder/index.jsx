import BuilderCategory from "@/components/builderCategory";
import { PCBuilderProvider } from "@/components/pcBuilderContext";

export default function PcBuilderPage({ categories }) {
  return (
    <PCBuilderProvider>
      <div className="max-w-screen-xl w-full mx-auto m-10">
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between border border-dashed border-blue-500 p-3 items-center">
            <div>
            <h1 className="text-3xl font-bold">PC Builder</h1>
            <p>PC Builder - Let's Build your Dream PC</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold">Total Price: </h2>
            </div>
         </div>
         <div className="my-3">
         {categories.map((category) => (
            <BuilderCategory key={category.id} category={category} />
          ))}
         </div>
      </div>
      </div>
    </PCBuilderProvider>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/categories`
  );
  const categories = await res.json();
  return { props: { categories } };
};
