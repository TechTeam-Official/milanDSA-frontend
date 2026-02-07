import { NextResponse } from "next/server";

// 👇 FIX: This tells TypeScript that 'lastPaymentData' exists on the global object
declare global {
  var lastPaymentData:
    | {
        status: string;
        timestamp: number;
        data: Record<string, unknown>; // Better than 'any'
      }
    | undefined;
}
export async function GET() {
  try {
    // Now TypeScript knows this property exists
    const memory = global.lastPaymentData;

    // Check if data exists AND if it is "COMPLETED"
    if (memory && memory.status === "COMPLETED") {
      // Optional: Check if the payment happened recently (e.g., within 60 seconds)
      // This prevents old payments from triggering new redirects if the server hasn't restarted
      const timeDiff = Date.now() - memory.timestamp;

      if (timeDiff < 60000) {
        // 60 seconds
        return NextResponse.json({ paid: true, data: memory.data });
      }
    }

    return NextResponse.json({ paid: false });
  } catch (error) {
    console.error("Check-Payment Error:", error);
    return NextResponse.json({ paid: false });
  }
}
