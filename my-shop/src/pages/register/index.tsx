import { Form, Input, Button } from "antd";
import useAuthenService from "../../service/authenService";
import { useContext } from "react";
import { authContext } from "@/context/authContext";

const Register = () => {
  const { uid } = useContext(authContext);
  const { signUp } = useAuthenService();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    signUp(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (uid) {
    return <></>;
  }

  return (
    <div className="w-[500px] mx-auto">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator(rule, value) {
                if (!value) {
                  return Promise.resolve();
                }
                if (value.length < 8) {
                  return Promise.reject(
                    "Password must be at least 8 characters long!"
                  );
                }
                if (!/\d/.test(value)) {
                  return Promise.reject(
                    "Password must contain at least one digit!"
                  );
                }
                if (!/[!@#$%^&*]/.test(value)) {
                  return Promise.reject(
                    "Password must contain at least one special character (!@#$%^&*)!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
