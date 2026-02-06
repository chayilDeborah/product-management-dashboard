"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

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
			router.push("/");
		} catch {
			setError("Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#E7E2DC] flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 border border-[#D6CEC2]">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-[#B9AF9F] rounded-full mb-4">
							<Lock className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">
							Product Hub
						</h1>
						<p className="text-[#6B6B6B] text-sm">
							Sign in to manage your inventory
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
								{error}
							</div>
						)}

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-[#2B2B2B] mb-2"
							>
								Email
							</label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="productmgt@gmail.com"
								className="h-12"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-[#2B2B2B] mb-2"
							>
								Password
							</label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								className="h-12"
								required
							/>
						</div>

						<Button
							type="submit"
							className="w-full h-12 text-base"
							disabled={loading}
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>

					<div className="mt-6 pt-6 border-t border-[#D6CEC2]">
						<p className="text-center text-xs text-[#6B6B6B]">
							Test credentials:
							<br />
							<span className="font-mono text-[#2B2B2B]">
								productmgt@gmail.com / test123
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
