import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button/Button";
import { useAuth } from "~/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LogIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await login(data.email, data.password);

    if (result.success) {
      navigate("/overview");
    } else {
      setError(result.error || "Login failed");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-100 via-orange-50 to-secondary-100">
      <div className="bg-white p-8 rounded-2xl shadow-card-hover w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <Link to="/overview" className="inline-block">
            <span className="bg-gradient-to-r from-secondary-500 to-yellow-500 text-transparent bg-clip-text text-5xl font-extrabold">
              C
            </span>
            <span className="text-2xl font-bold text-slate-700">orzhify</span>
          </Link>
          <h2 className="text-2xl font-semibold mt-4">Welcome back</h2>
          <p className="text-slate-500 mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="input-field w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input-field w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            label={isSubmitting ? "Signing in..." : "Sign in"}
            color="primary"
            size="large"
            disabled={isSubmitting}
          />
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-slate-400 text-center mb-2">Demo credentials:</p>
          <p className="text-xs text-slate-500 text-center">
            Email: <code className="bg-gray-100 px-1 rounded">demo@corzhify.com</code>
          </p>
          <p className="text-xs text-slate-500 text-center">
            Password: <code className="bg-gray-100 px-1 rounded">demo123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
