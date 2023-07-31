import usePcBuilderContext from "@/hooks/usePcBuilder";
import { Button, Modal } from "antd";

export default function PcBuilderHeader() {
    const { selectedComponents, completeBuild } = usePcBuilderContext();

    const totalPrice = selectedComponents?.reduce((acc, curr) => {
        return acc+curr.price
    },0)

    const handleCompleteBuild = () => {
      completeBuild()
      Modal.success({
        content: 'Congratulations! Your dream build has been completed successfully...',
      });
    }
    
  return (
    <div className="flex justify-between border border-dashed border-blue-500 p-3 items-center">
            <div>
            <h1 className="text-3xl font-bold">PC Builder</h1>
            <p>PC Builder - Let's Build your Dream PC</p>
            </div>
            <div>
                <Button type="primary" block danger disabled={selectedComponents?.length < 6} onClick={handleCompleteBuild}>Complete Build</Button>
                <h2 className="text-xl font-bold">Total Price: {totalPrice} $</h2>
            </div>
         </div>
  )
}
