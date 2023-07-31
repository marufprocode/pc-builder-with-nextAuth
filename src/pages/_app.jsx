import MainLayout from "@/components/mainLayout";
import { PCBuilderProvider } from "@/components/pcBuilderContext";
import "@/styles/globals.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {

  return (
    <SessionProvider session={pageProps?.session}>
      <StyleProvider hashPriority="high">
        <PCBuilderProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </PCBuilderProvider>
      </StyleProvider>
    </SessionProvider>
  );
}
