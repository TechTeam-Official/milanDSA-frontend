import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get the email from the query string (e.g., ?email=test)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ paid: false, error: "Email missing" });
    }

    // 🚀 Ask AWS: "Did this person pay?"
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/check-payment?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // We don't verify SSL in dev/test if using IP, but for production domains it's fine.
        cache: "no-store", // Important: Don't cache this!
      },
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
