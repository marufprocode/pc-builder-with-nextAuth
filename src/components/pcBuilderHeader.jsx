import usePcBuilderContext from "@/hooks/usePcBuilder";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function PcBuilderHeader() {
  const { selectedComponents, completeBuild } = usePcBuilderContext();
  const { status } = useSession();
  const router = useRouter();

  const isAuth = status === "authenticated";

  useEffect(()=>{
    if (router?.path?.startsWith("/pc-builder") && !isAuth)
    return router.push("/login");
  },[isAuth, router])

  const totalPrice = selectedComponents?.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const handleCompleteBuild = () => {
    completeBuild();
    Modal.success({
      content:
        "Congratulations! Your dream build has been completed successfully...",
    });
  };

  return (
    <div className="flex justify-between border border-dashed border-blue-500 p-3 items-center">
      <div>
        <h1 className="text-3xl font-bold">PC Builder</h1>
        <p>PC Builder - Let's Build your Dream PC</p>
      </div>
      <div>
        <Button
          type="primary"
          block
          danger
          disabled={selectedComponents?.length < 6}
          onClick={handleCompleteBuild}
        >
          Complete Build
        </Button>
        <h2 className="text-xl font-bold">Total Price: {totalPrice} $</h2>
      </div>
    </div>
  );
}
