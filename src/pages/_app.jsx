import MainLayout from "@/components/mainLayout";
import "@/styles/globals.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <StyleProvider hashPriority="high">
      <SessionProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      </SessionProvider>
    </StyleProvider>
  );
}
