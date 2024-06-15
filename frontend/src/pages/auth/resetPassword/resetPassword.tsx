import { useResetPasswordMutation } from "@/types/graphql";
import toast from "react-hot-toast";

function ResetByEmail() {
  const [resetPassword, { data, loading, error }] = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as { email: string };

    resetPassword({
      variables: { email: data.email },
      onCompleted(data) {
        console.log(data.resetPassword.resetToken);
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return (
    <main>
      <div>
        {!data?.resetPassword.resetToken ? (
          <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Indiquez votre email" />
            <input type="submit" />
          </form>
        ) : (
          <div>
            <p>Vérifiez vos emails</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ResetByEmail;
