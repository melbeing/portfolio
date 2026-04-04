// Netlify Edge Function — runs on the server before any HTML is sent.
// Checks for a valid auth cookie. If missing, redirects to /login.html.
// The protected page is never delivered to the browser without it.

export default async (request, context) => {
  const cookie = request.headers.get('cookie') || '';
  const isAuthorized = cookie.includes('portfolio-auth=authorized');

  if (isAuthorized) {
    // Cookie present — serve the page normally
    return context.next();
  }

  // No cookie — redirect to the login page, remembering where to return
  const destination = encodeURIComponent(request.url);
  return Response.redirect(
    new URL(`/login.html?redirect=${destination}`, request.url),
    302
  );
};
