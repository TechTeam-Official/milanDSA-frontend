import { NextResponse } from "next/server";

// ⚠️ GLOBAL VARIABLE (Dev Only)
declare global {
  var lastPaymentStatus: { status: string; email: string } | null;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // 🔍 LOGGING FOR DEBUGGING
    console.log("------------------------------------------------");
    console.log("🔔 KONFHUB WEBHOOK RECEIVED");

    // Parse the specific path from your JSON
    // Note: We use ["Bracket Notation"] because keys have spaces
    const attendee = payload.Data?.["Attendee Details"];
    const email = attendee?.["Email Address"];
    const name = attendee?.Name;

    console.log(`👤 User: ${name} (${email})`);
    console.log("------------------------------------------------");

    // Save to global memory
    global.lastPaymentStatus = {
      status: "COMPLETED",
      email: email || "unknown",
    };

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
