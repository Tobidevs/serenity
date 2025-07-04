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
  const router = useRouter();

  const handleSubmit = async () => {
    // Verify Email
    const {
      data: { session },
      error: verifyEmailError,
    } = await supabase.auth.verifyOtp({
      email: `${email}`,
      token: `${code}`,
      type: "email",
    });
    if (verifyEmailError) {
      console.log("Verify Email Error:", verifyEmailError);
      setError(verifyEmailError.message);
    } else {
      // Route user to Onboarding
      router.push("/onboarding"); // todo visual confirmation of account created successful
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
          onClick={() => handleSubmit()}
          className="w-full bg-grey-primary text-white py-2 px-4 font-bold rounded-xl mt-7"
        >
          Enter
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
