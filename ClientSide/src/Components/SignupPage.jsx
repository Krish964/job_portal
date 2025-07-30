import React from "react";
import SignupPageImg from "/src/assets/Working-cuate.png";
import { Link , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("password", data.password);

    // Append the resume file (file comes as an array)
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }

    try {
      const res = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      console.log("Server Response:", text);
      navigate("/mainpage")
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-blue-300">
      <div className="flex justify-around items-center h-auto w-[80vw] rounded-2xl bg-white">
        <div className="left">
          <img className="w-[600px]" src={SignupPageImg} alt="" />
        </div>
        <div className="right flex flex-col gap-5 p-6">
          <h1 className="text-6xl font-bold font-mono text-blue-900">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="email flex flex-col gap-2">
              <label className="text-2xl text-blue-900 font-semibold">
                Username
              </label>
              <input
                className="border-2 border-blue-300 px-7 py-3 w-[25vw] rounded-xl"
                {...register("username", { required: true })}
                type="text"
                required
              />
            </div>

            <div className="Email flex flex-col gap-2">
              <label className="text-2xl text-blue-900 font-semibold">Email</label>
              <input
                className="border-2 border-blue-300 px-7 py-3 w-[25vw] rounded-xl"
                {...register("email", { required: true })}
                type="email"
                required
              />
            </div>

            <div className="number flex flex-col gap-2">
              <label className="text-2xl text-blue-900 font-semibold">
                Mobile No.
              </label>
              <input
                className="border-2 border-blue-300 px-7 py-3 w-[25vw] rounded-xl"
                {...register("number", { required: true })}
                type="number"
                required
              />
            </div>

            <div className="password flex flex-col gap-2">
              <label className="text-2xl text-blue-900 font-semibold">
                Password
              </label>
              <input
                className="border-2 border-blue-300 px-7 py-3 w-[25vw] rounded-xl"
                {...register("password", {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 3, message: "Min length is 3" },
                  maxLength: { value: 8, message: "Max length is 8" },
                })}
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="resume flex flex-col gap-2">
              <label className="text-2xl text-blue-900 font-semibold" htmlFor="resume">
                Upload Resume
              </label>
              <input
                className="border-2 border-blue-300 px-4 py-3 w-[25vw] rounded-xl text-xl text-purple-700"
                {...register("resume", { required: true })}
                type="file"
                required
              />
            </div>

            {isSubmitting && <div>Loading...</div>}

            <input
              className="border-2 px-7 py-5 w-[25vw] rounded-xl bg-blue-600 text-white text-2xl font-semibold cursor-pointer font-sans"
              type="submit"
              value={isSubmitting ? "Loading..." : "Sign Up"}
              disabled={isSubmitting}
            />

          </form>
          <p className="text-xl font-medium text-center">
            Already have an account?
            <Link to="/login" className="text-xl text-blue-500 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
