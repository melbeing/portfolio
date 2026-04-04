// Netlify Serverless Function — handles password validation.
// The password lives only here, on the server. It is never in any
// file the browser can read.

const PASSWORD = 'pinegreen';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = new URLSearchParams(event.body || '');
  const submitted = params.get('password') || '';
  const redirect  = params.get('redirect')  || '/';

  if (submitted === PASSWORD) {
    // Correct — set a secure HttpOnly cookie and send the user on their way
    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': [
          'portfolio-auth=authorized',
          'Path=/',
          'HttpOnly',
          'Secure',
          'SameSite=Strict',
          `Max-Age=${COOKIE_MAX_AGE}`,
        ].join('; '),
        'Location': decodeURIComponent(redirect),
      },
      body: '',
    };
  }

  // Wrong password — bounce back to login with an error flag
  return {
    statusCode: 302,
    headers: {
      'Location': `/login.html?redirect=${encodeURIComponent(redirect)}&error=1`,
    },
    body: '',
  };
};
