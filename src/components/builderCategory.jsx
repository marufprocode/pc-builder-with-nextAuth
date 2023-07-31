import usePcBuilderContext from "@/hooks/usePcBuilder";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function BuilderCategory({ category }) {
  const { selectedComponents, removeComponent } = usePcBuilderContext();
  const [addLimit, setAddLimit] = useState(1);
  const router = useRouter();

  const items = selectedComponents?.filter(
    (itm) => itm?.category?._id === category?._id
  );

  useEffect(()=>{
    if(items?.[0]?.category?.title === "RAM" || items?.[0]?.category?.title === "Storage Devices" || items?.[0]?.category?.title === "Monitor"){
      setAddLimit(2)
    } else{
      setAddLimit(1)
    }
  },[items, setAddLimit])

  const handleRemoveComponent = (productId) => {
    removeComponent(productId)
  }

  const handleNavigateSelectPage = () => {
    router.push(`/pc-builder/select-item/${category?._id}`);
  };
  return (
    <div className="p-3 border mb-2">
      <div className="flex gap-3">
        <div className="w-fit">
          {" "}
          <Image
            src={category?.image}
            alt={category?.title}
            width={50}
            height={50}
            className="w-12 h-12 rounded-md"
          />
        </div>
        <div className="flex-1 min-w-[80%]">
          <p className="text-sm font-bold">{category?.title}</p>
          {items?.length > 0 ? (
            items?.map((item, index) => (
              <div className={`${(items?.length > 1) && index !== (items?.length-1) && "mb-2"} flex justify-between items-center border rounded-sm`} key={item?._id}>
                <div className="flex gap-2" >
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-md"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{item?.name}</p>
                    <p className="text-sm">{item?.price}$</p>
                  </div>
                </div>
                <button onClick={()=>handleRemoveComponent(item?._id)}><AiOutlineDelete className="text-3xl text-red-400" /></button>
              </div>
            ))
          ) : (
            <div className="h-[20px] w-full bg-slate-200 border"></div>
          )}
        </div>
        <div className="flex-grow flex place-content-elnd" onClick={handleNavigateSelectPage}>
          <Button type="primary" className="ml-auto" disabled={items?.length >= addLimit}>{addLimit > 1 && items?.length >= 1 ? "Add Item":"Select Item"}</Button>
        </div>
      </div>
    </div>
  );
}
