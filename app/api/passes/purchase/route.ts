import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    // FIX: Log the error so it is "used"
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "Backend unreachable" },
      { status: 500 },
    );
  }
}
