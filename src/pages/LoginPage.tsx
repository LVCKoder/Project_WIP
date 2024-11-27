import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users: { email: string; password: string; token: string }[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("authToken", foundUser.token);
      localStorage.setItem("userEmail", foundUser.email); // Ukladáme email aktuálneho používateľa
      alert("Login successful!");
      navigate("/main");
    } else {
      alert("Invalid email or password. Try again.");
    }
  };

	return (
				<section className="bg-white">
					<div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
						<form
							className="w-full max-w-md"
							onSubmit={(e) => {
								e.preventDefault();
								handleLogin();
							}}
						>
							<div className="flex items-center justify-center mt-6">
								<div
									className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500"
								>
									sign in
								</div>
							</div>

							<div className="relative flex items-center mt-8">
								<span className="absolute">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 mx-3 text-gray-300 "
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width={2}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</span>

								<input
									type="email"
									className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="relative flex items-center mt-4">
								<span className="absolute">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 mx-3 text-gray-300"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width={2}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</span>

								<input
									type="password"
									className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className="mt-6">
								<button
									type='submit'
									className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
								>
									sign in
								</button>

								<div className="mt-6 text-center ">
									<Link
										to="/"
										className="text-sm text-blue-500 hover:underline"
									>
										Go to Home Page
									</Link>
								</div>
							</div>
						</form>
					</div>
				</section>
	);
};