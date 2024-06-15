import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  CheckResetTokenQuery,
  CheckResetTokenQueryVariables,
  useChangePasswordMutation,
  useCheckResetTokenLazyQuery,
} from "@/types/graphql";
import { useEffect } from "react";
import Link from "next/link";

function Reset() {
  const router = useRouter();

  const [
    checkToken,
    { data: dataCheck, loading: loadingCheck, error: errorCheck },
  ] = useCheckResetTokenLazyQuery();

  const [
    changePassword,
    { data: dataChange, loading: loadingChange, error: errorChange },
  ] = useChangePasswordMutation();

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.token;
      if (token) {
        checkToken({
          variables: {
            token: token as string,
          },
        });
      }
    }
  }, [router.isReady]);

  // --- RESET PASSWORD ---

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as { password: string };

    const token = router.query.token;
    if (token) {
      changePassword({
        variables: {
          data: { password: data.password, token: token as string },
        },
        onCompleted(data) {
          console.log("data", data);
        },
      });
    }
  };

  if (loadingCheck) {
    <div>Vérification en cours</div>;
  }
  return (
    <main>
      {dataCheck?.checkResetToken.success ? (
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Réinitialisation de mot de passe</h1>
            {!dataChange?.changePassword.success && (
              <>
                <input
                  name="password"
                  placeholder="Indiquez votre nouveau mot de passe"
                />
                <input type="submit" />
              </>
            )}
          </div>
          {dataChange?.changePassword.success && (
            <div>
              <Link href="/auth/login">
                {dataChange?.changePassword.message}
              </Link>
            </div>
          )}
        </form>
      ) : (
        <div>
          Vous n'avez pas un jeton valide, merci de relancer la réinitialisation
          du mot de passe
        </div>
      )}
    </main>
  );
}

export default Reset;
