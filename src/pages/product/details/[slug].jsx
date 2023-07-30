import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

export default function ProductDetailsPage({ product }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
            {/* Product Image */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Image
                src={product?.image}
                width={400}
                height={400}
                alt={product?.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div className="col-span-1 lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
              <p className="text-gray-600 mb-4">
                Category: {product?.category?.title}
              </p>
              <p className="text-green-600 font-bold mb-4">
                Status: {product?.status}
              </p>
              <p className="text-2xl font-bold mb-4">${product?.price}</p>
              <p className="text-gray-800 mb-4">{product?.description}</p>
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Key Features:</h2>
                <ul>
                  {product?.keyFeatures?.map((feature, index) => (
                    <li key={index} className="text-gray-800">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-lg font-bold mr-2">Individual Rating:</p>
                {Array.from({ length: 5 }).map((_, index) => (
                  <AiFillStar
                    key={index}
                    className={`text-yellow-500 ${
                      index + 1 >= product?.rating
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center mb-4">
                <p className="text-lg font-bold mr-2">Average Rating:</p>
                {Array.from({ length: 5 }).map((_, index) => (
                  <AiFillStar
                    key={index}
                    className={`text-yellow-500 ${
                      index + 1 >= product?.rating
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                  />
                ))}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">Reviews:</h2>
                <ul>
                  {product?.reviews?.map((review, index) => (
                    <li key={index} className="text-gray-800">
                      <p className="text-yellow-500 font-bold">
                        {review?.rating} Stars
                      </p>
                      <p>{review?.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_API_BASE_URL}/api/products`);
  const data = await res.json();

  const paths = data?.map((product) => ({
    params: { slug: product?._id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `${process.env.NEXT_API_BASE_URL}/api/products/slug/${params?.slug}`
  );
  const product = await res.json();
  return { props: { product } };
};
