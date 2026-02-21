"use client";

import SocialLogin from "@/components/social-login";
import Link from "next/link";
import SignupForm from "./components/signup-form";

export default function SignupPage() {
  return (
    <div className="signup-container text-center">
      <div className="signup-content bg-white shadow-lg rounded-lg w-[500px] inline-block mt-[30px] p-[35px]">
        <h1 className="signup-title text-2xl font-medium text-gray-700 mb-[30px]">
          Signup with SpringSocial
        </h1>
        <SocialLogin method="signup" />
        <div className="or-separator border-b border-gray-200 py-2 relative my-5 mb-[30px]">
          <span className="or-text absolute left-[46%] top-0 bg-white px-2 text-gray-500">
            OR
          </span>
        </div>
        <SignupForm />
        <span className="login-link text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login!
          </Link>
        </span>
      </div>
    </div>
  );
}
