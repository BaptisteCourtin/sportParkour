import { useEffect } from "react";
import { useRouter } from "next/router";

import { useLogoutLazyQuery } from "@/types/graphql";

import toast from "react-hot-toast";

const logout = () => {
  const router = useRouter();

  const [logout, { data, loading, error }] = useLogoutLazyQuery();

  useEffect(() => {
    logout({
      onCompleted(data) {
        toast.success(data.logout.message);
        router.push("/auth/login");
      },
    });
  }, []);

  return (
    <main className="logout">
      {loading ? "Veuillez patienter..." : "Vous êtes déconnectés!"}
    </main>
  );
};

export default logout;
