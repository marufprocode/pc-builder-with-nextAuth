import { useRouter } from "next/router";
import Image from 'next/image';

const CategoryCard = ({ category }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${category?._id}`);
  };

  return (
    <div
      className="relative cursor-pointer overflow-hidden mb-10 rounded-lg shadow-md w-full h-full min-h-[150px]"
      onClick={handleCardClick}
    >
        <div className="z-10 absolute w-full h-full bg-black">
        <Image
          src={category?.image} 
          alt={category?.title} 
          layout="fill"
          objectFit="cover"
          className="transform transition-transform hover:scale-110 opacity-60"
        />
        </div>
      <div className="p-4 text-white z-20 absolute bottom-0">
        <div className="text-xl font-bold mb-2">{category?.title}</div>
        <p className="">{category?.description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
