"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function DashboardPage() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Image src="/assets/LOGO.png" alt="logo" width={400} height={400} />
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary "></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>
    </div>
  );
}
