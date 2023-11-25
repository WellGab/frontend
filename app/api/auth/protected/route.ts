// app/api/protected/route.js
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function myApiRoute(req) {
  const res = new NextResponse();
  const session = (await getSession(req, res)) as any;
  return NextResponse.json({ token: session.idToken }, res);
});
