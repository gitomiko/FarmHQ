import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // In real system this will route to n8n / MQTT / DB
  console.log("[FarmHQ Action]", JSON.stringify(body, null, 2));

  return NextResponse.json({
    status: "accepted",
    received: body,
    routed_to: "mock-handler",
  });
}
