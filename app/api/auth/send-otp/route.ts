import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 🚀 Forward the request to your AWS Backend
    // Note: We point to /api/auth/send-otp because that's where your Express router listens
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    // Return whatever AWS sent back (success or error)
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reach backend" },
      { status: 500 },
    );
  }
}
