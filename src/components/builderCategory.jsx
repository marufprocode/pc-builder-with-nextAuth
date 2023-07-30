import { Button, Skeleton } from "antd";
import Image from "next/image";


export default function BuilderCategory({category}) {
  return (
    <div className="p-3 border mb-2">
        <div className="flex gap-3">
           <div className="w-fit"> <Image src={category?.image} alt={category?.title} width={50} height={50} className="w-12 h-12 rounded-md"/></div>
            <div className=" flex-1">
                <p className="text-sm font-bold">{category?.title}</p>
                <Skeleton.Input size="small" className="w-[100px] min-w-[100px]"/>
            </div>
            <div className="">
                <p className="text-lg font-bold">Price: </p>
            </div>
            <div className="">
                <Button type="primary">Select Item</Button>
            </div>
        </div>
        <div></div>
    </div>
  )
}
