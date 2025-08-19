"use client";
import { useEffect, useState } from "react";
import {
  signInToSupabase,
  signUpToSupabase,
  supabase,
} from "../../db/supabase-client";
import { useRouter } from "next/navigation";
import { VerifyEmail } from "../../components/verify-email";
import { Input } from "../../components/ui/input";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifyEmailModal, setVerifyEmailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{email?: string, password?: string}>({});
  const router = useRouter();

  // Real-time field validation
  const validateField = (field: 'email' | 'password', value: string) => {
    const errors = { ...fieldErrors };

    if (field === 'email') {
      if (!value.trim()) {
        errors.email = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
      }
    }

    if (field === 'password') {
      if (!value) {
        errors.password = 'Password is required';
      } else if (value.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (!isSignIn) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(value)) {
          errors.password = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete errors.password;
        }
      } else {
        delete errors.password;
      }
    }

    setFieldErrors(errors);
  };

  // Handle input changes with real-time validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateField('email', value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validateField('password', value);
  };

  // Reset form when switching between sign-in and sign-up
  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError(null);
    setFieldErrors({});
    setEmail("");
    setPassword("");
  };

  // Comprehensive input validation
  const validateForm = () => {
    // Clear previous errors
    setError(null);

    // Email validation
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (!password) {
      setError('Password is required');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // For sign up, enforce stronger password requirements
    if (!isSignIn) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        return false;
      }
    }

    return true;
  };

  // Enhanced error handling for auth responses
  const handleAuthError = (error: string) => {
    switch (error) {
      case 'Invalid login credentials':
        return 'Email or password is incorrect';
      case 'User already registered':
        return 'Account already exists. Please sign in instead.';
      case 'Password should be at least 6 characters':
        return 'Password must be at least 6 characters long';
      case 'Signup requires a valid password':
        return 'Please enter a valid password';
      case 'Invalid email':
        return 'Please enter a valid email address';
      case 'Email not confirmed':
        return 'Please verify your email address before signing in';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  const handleSubmit = async () => {
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isSignIn) {
        // Sign In
        const error = await signInToSupabase(email, password);
        if (error) {
          setError(handleAuthError(error));
        } else {
          router.push("/dashboard");
        }
      } else {
        // Sign Up and send verification code
        const signUpError = await signUpToSupabase(email, password);
        if (signUpError) {
          setError(handleAuthError(signUpError));
        } else {
          // Prompt user for code
          setVerifyEmailModal(true);
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // clear the error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // cleanup if component unmounts
    }
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center">
      {verifyEmailModal && <VerifyEmail email={email} />}
      {isSignIn ? (
        <div className="flex w-9/10 h-3/4 mt-20 md:mt-40 items-center flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-grey-primary">
              Login to Serenity
            </h1>
            <p className="text-sm text-grey-secondary flex text-center">
              Sign in to continue your study and stay connected with the Word.
            </p>
          </div>
          <div className="w-full md:w-2/5 flex flex-col items-center gap-5 ">
            <div className="w-full flex flex-col items-center">
              {/* Email Input */}
              <Input
                type="email"
                placeholder="mail@site.com"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={isLoading}
                className={`input bg-grey-light border border-grey-alt-dark md:w-3/5 ${fieldErrors.email ? 'border-red-500' : ''}`}
              />
              <div className={`validator-hint ${fieldErrors.email ? 'block text-red-600 text-sm mt-1' : 'hidden'} w-full md:w-3/5 text-center`}>
                {fieldErrors.email || 'Enter valid email address'}
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              {/* Password Input */}
              <Input
                type="password"
                required
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className={`input bg-grey-light border border-grey-alt-dark md:w-3/5 ${fieldErrors.password ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                disabled={isLoading}
              />
              <p className={`validator-hint ${fieldErrors.password ? 'block text-red-600 text-sm mt-1' : 'hidden'} w-full md:w-3/5 text-center`}>
                {fieldErrors.password || 'Must be more than 8 characters'}
              </p>
            </div>
            {/* Actions */}
            <div className="w-full flex flex-col gap-2 items-center">
              <button
                className="btn bg-grey-primary border-none text-white rounded-xl w-6/8 hover:border disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Continue"
                )}
              </button>
              <button
                className="btn bg-grey-main border-none text-sm text-grey-primary shadow-none disabled:opacity-50"
                onClick={toggleAuthMode}
                disabled={isLoading}
              >
                Create an Account
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-100 rounded p-2">
                {error}
              </div>
            )}
            {/* 
            <div className="divider">OR</div>
            
            <button className="btn bg-grey-main text-grey-primary w-full md:w-3/5">
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
            </button> */}
          </div>
        </div>
      ) : (
        <div className="flex w-9/10 h-3/4 mt-20 md:mt-40 items-center flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-grey-primary">
              Sign Up to Serenity
            </h1>
            <p className="text-sm text-grey-secondary flex text-center">
              Create an account to build study plans, save verses, and grow in
              the Word.
            </p>
          </div>
          <div className="w-full md:w-2/5 flex flex-col items-center gap-5">
            <div className="w-full flex flex-col items-center">
              {/* Email Input */}
              <Input
                type="email"
                placeholder="mail@site.com"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={isLoading}
                className={`input bg-grey-light border border-grey-alt-dark md:w-3/5 ${fieldErrors.email ? 'border-red-500' : ''}`}
              />
              <div className={`validator-hint ${fieldErrors.email ? 'block text-red-600 text-sm mt-1' : 'hidden'} w-full md:w-3/5 text-center`}>
                {fieldErrors.email || 'Enter valid email address'}
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              {/* Password Input */}
              <Input
                type="password"
                required
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className={`input bg-grey-light border border-grey-alt-dark md:w-3/5 ${fieldErrors.password ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                disabled={isLoading}
              />
              <p className={`validator-hint ${fieldErrors.password ? 'block text-red-600 text-sm mt-1' : 'hidden'} w-full md:w-3/5 text-center`}>
                {fieldErrors.password || 'Must be more than 8 characters, including at least one number, lowercase letter, and uppercase letter'}
              </p>
            </div>
            <div className="w-full flex flex-col gap-2 items-center">
              {/* Actions */}
              <button
                className="btn bg-grey-primary text-white rounded-xl border-none w-6/8 hover:border disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Continue"
                )}
              </button>
              <button
                className="btn bg-grey-main border-none text-sm text-grey-primary shadow-none disabled:opacity-50"
                onClick={toggleAuthMode}
                disabled={isLoading}
              >
                Sign In
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-100 rounded p-2">
                {error}
              </div>
            )}
            {/*
            <div className="divider">OR</div>
            
            <button className="btn bg-grey-main text-grey-primary w-full md:w-3/5">
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
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
