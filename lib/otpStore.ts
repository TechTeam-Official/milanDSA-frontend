
type OtpEntry = {
    otp: string;
    expiresAt: number;
};

// Global store for development (in-memory)
// Note: In production, use Redis or a database table.
const otpStore = new Map<string, OtpEntry>();

export const storeOtp = (email: string, otp: string) => {
    // Expires in 10 minutes
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt });
};

export const verifyOtpInStore = (email: string, otp: string): boolean => {
    const entry = otpStore.get(email);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
        otpStore.delete(email);
        return false;
    }

    if (entry.otp === otp) {
        otpStore.delete(email); // One-time use
        return true;
    }

    return false;
};
