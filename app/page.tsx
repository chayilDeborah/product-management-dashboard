"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";

export default function Home() {
	const router = useRouter();
	const { user, loading } = useAuth();

	useEffect(() => {
		if (!loading) {
			if (user) {
				router.replace("/dashboard");
			} else {
				router.replace("/sign-in");
			}
		}
	}, [user, loading, router]);

	return (
		<div className="min-h-screen bg-white flex items-center justify-center">
			<div className="text-center" role="status" aria-label="Redirecting">
				<div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#DDDDDD] border-t-[#FF385C]"></div>
				<p className="text-[#717171] mt-4 text-sm">Redirecting...</p>
			</div>
		</div>
	);
}
