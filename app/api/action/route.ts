import { NextRequest, NextResponse } from "next/server";
import { routeAction } from "@/src/lib/action/router";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await routeAction(body);

  return NextResponse.json({
    status: "accepted",
    result,
  });
}
