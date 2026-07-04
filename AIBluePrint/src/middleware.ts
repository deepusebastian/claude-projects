import * as Sentry from "@sentry/nextjs";
import { withAuth } from "next-auth/middleware";

export default Sentry.wrapMiddlewareWithSentry(
  withAuth({
    pages: {
      signIn: "/login",
    },
  })
);

// Only protect the dashboard route — builder is accessible to everyone
export const config = {
  matcher: ["/dashboard"],
};
