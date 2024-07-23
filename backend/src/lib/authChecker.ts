import { AuthChecker } from "type-graphql";
import { MyContext } from "..";

export const customAuthChecker: AuthChecker<MyContext> = (
  { context },
  roles
) => {
  // Si aucun rôle n'est spécifié, on autorise l'accès
  if (roles.length === 0) return true;

  // Si l'utilisateur n'est pas authentifié, on refuse l'accès
  if (!context.user) return false;

  // On vérifie si l'utilisateur a au moins un des rôles requis
  return roles.includes(context.user.role);
};
