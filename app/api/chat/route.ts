import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_MESSAGES = 20;

type ChatMessage = { role: "user" | "assistant"; content: string };

function validMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (item.role === "user" || item.role === "assistant") &&
    typeof item.content === "string" &&
    item.content.trim().length > 0 &&
    item.content.length <= MAX_MESSAGE_LENGTH;
}

export async function POST(request: NextRequest) {
  // Public preview protection: no AI calls until authentication and rate limits are configured.
  if (process.env.ENABLE_AI_CHAT !== "true") {
    return NextResponse.json(
      { error: "AI chat is not enabled. Configure authentication, rate limiting, and an AI provider first." },
      { status: 503 }
    );
  }

  // Fail closed until authenticated sessions and per-user limits are implemented.
  return NextResponse.json(
    { error: "Authentication and per-user rate limits are required before enabling chat." },
    { status: 503 }
  );
}

export { validMessage, MAX_MESSAGES };
