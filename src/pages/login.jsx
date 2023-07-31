import { Form, Input, Button } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    setLoading(false);
    if (response.error) return setError(response.error);
    router.push("/");
  };

  return (
    <div className="w-full flex-1 flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md h-fit my-10 bg-white">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <Form
          onFinish={onFinish}
          className="space-y-6"
          layout="vertical"
          validateTrigger="onSubmit"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Username" autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
            validateStatus={error ? error : ""}
            help={<p className="text-red-600">{error}</p> || ""}
          >
            <Input.Password
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end text-xs">
              <Link rel="noopener noreferrer" href="#">
                Forgot Password?
              </Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <div className="flex items-center w-full mt-4">
          <hr className="w-full" />
          <p className="px-3">OR</p>
          <hr className="w-full" />
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex-1 sm:w-16"></div>
          <p className="px-3 text-sm">Login with social accounts</p>
          <div className="flex-1 sm:w-16"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center bg-blue-50 w-full p-4 space-x-4 border rounded-md focus:ri focus:ri focus:ri hover:bg-blue-200 transition-all"
            onClick={()=> signIn("google", {callbackUrl:`https://pc-builder-application-xi.vercel.app`})}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <p className="text-xs text-center sm:px-6">
          Don't have an account?
          <Link
            rel="noopener noreferrer"
            href="/signup"
            className="underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
