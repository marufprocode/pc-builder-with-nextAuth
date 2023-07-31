import MainLayout from "@/components/mainLayout";
import { PCBuilderProvider } from "@/components/pcBuilderContext";
import "@/styles/globals.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <StyleProvider hashPriority="high">
      <PCBuilderProvider>
      <SessionProvider session={pageProps?.session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      </SessionProvider>
      </PCBuilderProvider>
    </StyleProvider>
  );
}
