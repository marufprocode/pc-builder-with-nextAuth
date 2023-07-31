import { Button } from "antd";
import ProductCard from "./productCard";
import usePcBuilderContext from "@/hooks/usePcBuilder";
import { useRouter } from "next/router";


export default function AddtoBuilder({products}) {
    const { addComponent, selectedComponents } = usePcBuilderContext();
    const router = useRouter()

    // console.log({selectedComponents})
    
    const addComponentToBuilder = async (component) => {
        await addComponent(component)
        router.push("/pc-builder")
    }

  return (
    <>
    {products?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-5">
          {products?.map((product) => {
            return (
                <div className="relative w-full h-full" key={product?._id}>
                <ProductCard product={product} />
                <Button type="primary" className="absolute bottom-12" block onClick={()=>addComponentToBuilder(product)}>Add To Builder</Button>
                </div>
              )
          })}
        </div>
      )}
    </>
  )
}
