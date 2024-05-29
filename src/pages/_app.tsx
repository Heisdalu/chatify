import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MessageProvider from "@/context/MessageProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <MessageProvider>
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
          </MessageProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
