import { AuthChecker } from "type-graphql";
import { MyContext } from "..";

export const customAuthChecker: AuthChecker<MyContext> = (
  { context },
  roles
) => {
  // roles = ce qui est mis dans le @authorized du resolver
  if (context.user) {
    // gère les roles quand besoin
    if (roles.length > 0) {
      if (roles.includes(context.user.role)) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
  return false;
};

// @Authorized("ADMIN", "CLIENT")
