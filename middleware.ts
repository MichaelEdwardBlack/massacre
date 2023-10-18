import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(request) {
  console.log(request);
});

// Private Routes
export const config = { matcher: ["/game"] };
