// app/api/auth/[auth0]/route.ts
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin((req) => {
    const url = new URL(req.url as string);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    return {
      authorizationParams: { connection: queryParams.connection },
    };
  }),
});
