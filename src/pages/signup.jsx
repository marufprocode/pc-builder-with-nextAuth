import { Form, Input, Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setLoading(false);
      if (response.ok) {
        // Signup was successful
        const data = await response.json();
        message.success(data?.message)
        form.resetFields();
        router.push("/login")
      } else {
        // Signup failed
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        setErrorMessage(errorData?.error || "An error occurred during signup. Please try again later.");
      }
    } catch (error) {
      // Perform any necessary error handling, e.g., displaying an error message to the user
      console.error("Error occurred during signup:", error);
      setLoading(false);
      setErrorMessage("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <div className="w-full flex-1 flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md h-fit my-10 bg-cyan-700 bg-opacity-5">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <Form
          onFinish={onFinish}
          className="space-y-6"
          layout="vertical"
          validateTrigger="onSubmit"
          form={form}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Name" autoComplete="username" />
          </Form.Item>
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
            <Input placeholder="Email" autoComplete="email"/>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
            validateStatus={errorMessage ? errorMessage:""}
            help={<p className="text-red-600">{errorMessage}</p> || ""}
          >
            <Input.Password placeholder="Password" autoComplete="current-password"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <p className="text-xs text-center sm:px-6">
          Already have an account?
          <Link
            rel="noopener noreferrer"
            href="/login"
            className="underline ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
