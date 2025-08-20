"use client";
import { useState } from "react";
import { supabase } from "../db/supabase-client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { useRouter } from "next/navigation";

export const VerifyEmail = ({ email }: { email: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // Validate code length
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    // Validate code contains only numbers
    if (!/^\d{6}$/.test(code)) {
      setError("Verification code must contain only numbers");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Verify Email
      const {
        data: { session },
        error: verifyEmailError,
      } = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: "email",
      });

      if (verifyEmailError) {
        // Handle specific error messages
        if (verifyEmailError.message.includes("expired")) {
          setError("Verification code has expired. Please request a new one.");
        } else if (verifyEmailError.message.includes("invalid")) {
          setError("Invalid verification code. Please check and try again.");
        } else {
          setError("Verification failed. Please try again.");
        }
      } else {
        // Email verified successfully, check if user needs onboarding
        try {
          const { data: accountData } = await supabase
            .from("account")
            .select("onboarding_complete")
            .eq("user_id", session?.user?.id)
            .single();

          if (accountData?.onboarding_complete) {
            // User has already completed onboarding, go to dashboard
            router.push("/dashboard");
          } else {
            // User needs onboarding, go to onboarding page
            router.push("/onboarding");
          }
        } catch (accountError) {
          // If there's an error checking account (likely user doesn't exist yet), go to onboarding
          router.push("/onboarding");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
      <div className="bg-grey-main h-3/8 w-5/6 md:w-3/8 md:h-3/9 rounded-2xl shadow-lg p-6 mt-20">
        <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
        <p className="text-gray-700 mb-6">
          A verification link has been sent to{" "}
          <span className="font-bold">{email}</span>. Please check your inbox
          and enter the given code.
        </p>
        <div className="w-full flex justify-center">
          <InputOTP
            maxLength={6}
            onChange={(value: string) => {
              setCode(value);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading || code.length !== 6}
          className="w-full bg-grey-primary text-white py-2 px-4 font-bold rounded-xl mt-7 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Verify Email"
          )}
        </button>
        {error && (
          <div className="text-red-600 text-sm m-3 bg-red-100 rounded p-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
