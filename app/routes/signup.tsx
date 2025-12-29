import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button/Button";
import { useAuth } from "~/contexts/AuthContext";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await signup(data.email, data.password, data.firstName, data.lastName);

    if (result.success) {
      navigate("/overview");
    } else {
      setError(result.error || "Signup failed");
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
          <h2 className="text-2xl font-semibold mt-4">Create an account</h2>
          <p className="text-slate-500 mt-1">Join Corzhify today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                First name
              </label>
              <input
                {...register("firstName", { required: "First name is required" })}
                id="firstName"
                placeholder="John"
                className="input-field w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                Last name
              </label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                id="lastName"
                placeholder="Doe"
                className="input-field w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Create a password"
              className="input-field w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            label={isSubmitting ? "Creating account..." : "Create account"}
            color="primary"
            size="large"
            disabled={isSubmitting}
          />
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Already have an account? </span>
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
