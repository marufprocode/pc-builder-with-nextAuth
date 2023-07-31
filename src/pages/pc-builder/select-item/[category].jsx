import AddtoBuilder from "@/components/addtoBuilder";

export default function SelectBuildItemPage({products}) {
  return (
    <div className="px-10 mb-10">
       <h3 className="my-5 text-2xl font-semibold">Select {products?.[0]?.category?.title} Products:</h3>
      <AddtoBuilder products={products}/>
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const { params } = context;
    const res = await fetch(
      `${process.env.NEXT_API_BASE_URL}/api/products/category/${params?.category}`
    );
    const products = await res.json();
    return { props: { products } };
  };
  
