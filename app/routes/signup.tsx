import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../components/Button/Button";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign up</h2>
        <form
          onSubmit={handleSubmit((data) => {
            console.log("data ===>", data);
          })}
          className="flex flex-col gap-4"
        >
          <input
            {...register("firstName", { required: "This is required." })}
            placeholder="First name"
            className="border rounded p-2 w-full"
          />
          <input
            {...register("lastName", { required: "This is required." })}
            placeholder="Last name"
            className="border rounded p-2 w-full"
          />
          <input
            {...register("email", { required: "This is required." })}
            placeholder="email@mail.com"
            className="border rounded p-2 w-full"
          />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className="border rounded p-2 w-full"
          />
          <Button label="Submit" color="blue" size="large" />
        </form>
      </div>
    </div>
  );
}
