"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../providers/auth-context";

export default function ProfilePage() {
  const { user, authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [loading, authenticated, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="profile-container pt-[30px]">
      <div className="container mx-auto">
        <div className="profile-info text-center">
          <div className="profile-avatar">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={200}
                height={200}
                className="rounded-full max-w-[250px]"
              />
            ) : (
              <div className="text-avatar w-[200px] h-[200px] mx-auto text-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                <span className="leading-[200px] text-white text-5xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="profile-name font-medium text-lg mt-4">
            <h2>{user.name}</h2>
            <p className="profile-email font-normal text-gray-600">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
