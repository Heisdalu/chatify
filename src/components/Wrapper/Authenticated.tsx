import { Spinner } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Authenticated = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading")
    return (
      <div className="h-[100vh] grid place-items-center">
        <Spinner size="xl" />
      </div>
    );

  if (status === "unauthenticated") {
    router.push("/");
    return;
  }

  return <>{children}</>;
};
export default Authenticated;
