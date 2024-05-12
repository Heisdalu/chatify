import { useRouter } from "next/router";
import { ReactNode } from "react";

const DirectChatLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        html {
          overflow: hidden;
        }
        body {
          overflow: hidden;
        }
      `}</style>
      {children}
    </>
  );
};
export default DirectChatLayout;
