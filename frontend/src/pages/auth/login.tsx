import {
  UserInputAuthEntity,
  useAuthentificationLazyQuery,
} from "@/types/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const login = () => {
  const router = useRouter();

  const [authentification, { data, loading, error }] =
    useAuthentificationLazyQuery();

  const handleAuthentification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as UserInputAuthEntity;

    if (data.email && data.password) {
      authentification({
        variables: { infos: data },
        onCompleted() {
          router.push(`/`);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  };

  return (
    <main className="auth">
      <Link href="/auth/inscription">Inscription</Link>

      <form onSubmit={handleAuthentification}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Indiquez votre email"
          />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
          />
        </div>
        <input type="submit" className="butt" />

        <div>
          {data && (
            <span className="text-red-500">
              {data.authentification.message}
            </span>
          )}

          {error && <span className="text-red-500">{error.message}</span>}
        </div>
      </form>
    </main>
  );
};

export default login;
