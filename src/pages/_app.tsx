import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import ChatReplyingProvider from "@/context/ChatReplyingProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChatReplyingProvider>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
        <ProgressBar
          height="4px"
          color="#000"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <div>
          <Toaster />
        </div>
      </ChatReplyingProvider>
    </>
  );
}
