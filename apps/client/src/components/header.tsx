"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/providers/auth-context";

export default function Header() {
  const { authenticated, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="app-header h-[60px] relative z-10 border-b">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="app-branding">
          <Link href="/" className="app-title text-lg font-medium">
            Spring Social
          </Link>
        </div>
        <div className="app-options">
          <nav className="app-nav">
            <ul className="flex space-x-1">
              {authenticated ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className={`px-4 py-2 rounded-md transition-colors ${
                        pathname === "/profile"
                          ? "text-blue-500"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button variant="ghost" onClick={logout}>
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`px-4 py-2 rounded-md transition-colors ${
                        pathname === "/login"
                          ? "text-blue-500"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className={`px-4 py-2 rounded-md transition-colors ${
                        pathname === "/signup"
                          ? "text-blue-500"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
