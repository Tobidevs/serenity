"use client";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { signInToSupabase, signUpToSupabase } from "../../db/supabase-client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const router = useRouter();

  const handleSubmit = () => {
    if (isSignIn) {
      signInToSupabase(email, password);
      router.push("/dashboard");
    } else {
      signUpToSupabase(email, password);
      router.push("/onboarding");
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      {isSignIn ? (
        <div className="flex w-9/10 h-3/4 mt-20 items-center flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-grey-primary">
              Login to Serenity
            </h1>
            <p className="text-sm text-grey-secondary flex text-center">
              Sign in to continue your study and stay connected with the Word.
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-8/10 flex flex-col">
              {/* Email Input */}
              <label className="input validator bg-grey-main border-none">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" placeholder="mail@site.com" required />
              </label>
              <div className="validator-hint hidden bg-grey-main border-none">
                Enter valid email address
              </div>
            </div>
            <div className="w-8/10 flex flex-col">
              {/* Password Input */}
              <label className="input validator bg-grey-main">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  className="bg-grey-main"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <button
                className="btn bg-grey-primary text-white rounded-xl w-6/8 hover:border"
                onClick={handleSubmit}
              >
                Continue
              </button>
              <button
                className="btn bg-grey-main border-none text-sm w-6/8"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                Create an Account
              </button>
            </div>

            <div className="divider">OR</div>
            <button className="btn bg-grey-main text-grey-primary border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-9/10 h-3/4 mt-20 items-center flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-grey-primary">
              Sign Up to Serenity
            </h1>
            <p className="text-sm text-grey-secondary flex text-center">
              Create an account to build study plans, save verses, and grow in
              the Word.
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-8/10 flex flex-col">
              {" "}
              {/* Email Input */}
              <label className="input validator bg-grey-main border-none">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" placeholder="mail@site.com" required />
              </label>
              <div className="validator-hint hidden bg-grey-main border-none">
                Enter valid email address
              </div>
            </div>
            <div className="w-8/10 flex flex-col">
              {/* Password Input */}
              <label className="input validator bg-grey-main">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  className="bg-grey-main"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              {/* Actions */}
              <button
                className="btn bg-grey-primary text-white rounded-xl w-6/8 hover:border"
                onClick={handleSubmit}
              >
                Continue
              </button>
              <button
                className="btn bg-grey-main border-none text-sm"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                Sign In
              </button>
            </div>

            <div className="divider">OR</div>
            <button className="btn bg-grey-main text-grey-primary border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Sign Up with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
