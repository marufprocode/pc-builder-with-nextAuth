import { PCBuilderContext } from "@/components/pcBuilderContext";
import { useContext } from "react";

const usePcBuilderContext = () => {
    const context = useContext(PCBuilderContext);
    if (!context) {
      throw new Error('usePcBuilderContext must be used within a PCBuilderProvider');
    }
    return context;
  };
  
  export default usePcBuilderContext;