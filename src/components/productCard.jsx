import { useRouter } from "next/router"
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/details/${product?._id}`);
  };

  return (
    <div
      className="relative p-4 cursor-pointer border rounded-lg shadow-md transition-shadow hover:shadow-xl bg-white mb-5 min-w-full min-h-full max-w-[250px]"
      onClick={handleCardClick}
    >
      <div className="relative w-40 h-40 mb-4 mx-auto">
        <Image
          src={product?.image}
          alt={product?.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="font-semibold text-xl mb-2">{product?.name}</div>
      <div className="text-gray-600 mb-2">{product?.category?.title}</div>
      <div className="font-bold mb-2">${product?.price}</div>
      <div className="text-sm mb-2">
        Status: {product?.status}
      </div>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <AiFillStar
            key={index}
            className={`text-yellow-500 ${
              index+1 >= product?.rating ? 'opacity-30' : 'opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;

