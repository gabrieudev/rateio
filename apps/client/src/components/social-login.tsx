import { Button } from "@/components/ui/button";
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "@/lib/constants";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface SocialLoginProps {
  method: "signup" | "signin";
}

export default function SocialLogin({ method }: SocialLoginProps) {
  return (
    <div className="social-login space-y-3">
      <a href={GOOGLE_AUTH_URL} className="block">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <FaGoogle />
          {method === "signup" ? "Sign up with Google" : "Log in with Google"}
        </Button>
      </a>
      <a href={GITHUB_AUTH_URL} className="block">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <FaGithub />
          {method === "signup" ? "Sign up with Github" : "Log in with Github"}
        </Button>
      </a>
    </div>
  );
}
