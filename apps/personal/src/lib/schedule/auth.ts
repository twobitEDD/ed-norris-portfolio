export function isValidAdminToken(token: string | null | undefined): boolean {
  const secret = process.env.SCHEDULE_ADMIN_SECRET?.trim();
  if (!secret) return false;
  if (!token) return false;
  return token === secret;
}

export function getAdminTokenFromRequest(request: Request): string | null {
  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token");
  if (queryToken) return queryToken;

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return null;
}
