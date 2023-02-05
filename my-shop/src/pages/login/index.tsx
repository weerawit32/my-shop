import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthenService from "../../service/authenService";
import { loginSchema } from "../../utils/yup";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useContext } from "react";
import { authContext } from "@/context/authContext";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { uid } = useContext(authContext);
  const router = useRouter();
  const { signIn } = useAuthenService();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("data", data);
    await signIn(data);
    reset();
  };

  // if (uid) {
  //   return <></>;
  // }

  return (
    <div className="h-auto w-full flex flex-col justify-center items-center space-y-5">
      <h1>Welcome to my shop</h1>
      <div className="w-[500px] bg-gray-100  px-[80px] py-[80px] my-[50px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input {...register("email")} />
          <p className="pb-6" style={{ height: "10px" }}>
            {errors?.email?.message}
          </p>
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p className="pb-6" style={{ height: "10px" }}>
            {errors?.password?.message}
          </p>

          <input type="submit" />
        </form>
      </div>
      <Button onClick={() => router.push("/register")}>Sign Up</Button>
    </div>
  );
};

export default Login;
