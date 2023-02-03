import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthenService from "../../service/authenService";
import { loginSchema, LoginFormData } from "../../utils/yup";
import * as yup from "yup";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuthenService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data", data);
    signIn(data);
  };

  return (
    <div className="h-auto w-full flex flex-col justify-center items-center space-y-5">
      <h1>Welcome to my sh</h1>
      <div className="w-[500px] bg-gray-100  px-[80px] py-[80px] my-[50px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input {...register("email")} />
          <p style={{ height: "10px" }}>{errors?.email?.message}</p>
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p style={{ height: "10px" }}>{errors?.password?.message}</p>

          <input type="submit" />
        </form>
      </div>
      <button>Sign Up</button>
    </div>
  );
};

export default Login;
