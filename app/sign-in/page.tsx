"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
	const router = useRouter();
	const { signIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await signIn(email, password);
			router.push("/dashboard");
		} catch {
			setError("Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white flex flex-col">
			{/* Top bar */}
			<div className="border-b border-[#EBEBEB] px-6 py-5">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-[#FF385C] text-2xl font-bold tracking-tight">
						FashionHub
					</h1>
				</div>
			</div>

			{/* Sign-in card */}
			<main className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">
					<div className="border border-[#DDDDDD] rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-8">
						<div className="text-center mb-8">
							<h2 className="text-2xl font-semibold text-[#222222] mb-2">
								Welcome back
							</h2>
							<p className="text-[#717171] text-sm">
								Sign in to manage your product inventory
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							{error && (
								<div
									role="alert"
									className="bg-[#FFF8F6] border border-[#C13515] text-[#C13515] text-sm p-3 rounded-lg"
								>
									{error}
								</div>
							)}

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-[#222222] mb-2"
								>
									Email
								</label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="h-12"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-[#222222] mb-2"
								>
									Password
								</label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="Enter your password"
									className="h-12"
									required
								/>
							</div>

							<Button
								type="submit"
								className="w-full h-12 text-base rounded-lg"
								disabled={loading}
							>
								{loading ? "Signing in..." : "Continue"}
							</Button>
						</form>

						<div className="mt-6 pt-6 border-t border-[#EBEBEB]">
							<p className="text-center text-xs text-[#717171]">
								Test credentials
							</p>
							<p className="text-center text-sm text-[#222222] font-medium mt-1">
								productmgt@gmail.com · test123
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
