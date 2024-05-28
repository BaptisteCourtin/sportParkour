import { useLogoutLazyQuery } from "@/types/graphql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const logout = () => {
  const router = useRouter();

  const [logout, { data, loading, error }] = useLogoutLazyQuery();

  useEffect(() => {
    logout({
      onCompleted() {
        router.push("/auth/login");
      },
    });
  }, [router.isReady]);

  return (
    <main className="logout">
      {loading ? "Veuillez patienter..." : "Vous êtes déconnectés!"}
    </main>
  );
};

export default logout;
