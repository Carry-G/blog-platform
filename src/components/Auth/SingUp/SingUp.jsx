import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";

import AuthContex from "../../../context";
import "./SingUp.scss";
import ApiBlog from "../../../services/apiServices";

const api = new ApiBlog();

const SingUp = () => {
  const [form] = Form.useForm();
  const { setIsAuth } = useContext(AuthContex);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const onFinish = (values) => {
    const userInfo = JSON.stringify({
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    });

    api
      .postRegisterUser(userInfo)
      .then((result) => {
        if (result.status === 200) {
          setError(false);
          return result.json();
        }
        if (result.status === 422) {
          setError(true);
          return result.json();
        }
        throw new Error("Все сломалось");
      })
      .then((res) => {
        if (res.user) {
          localStorage.setItem("token", res.user.token);
          localStorage.setItem("username", res.user.username);
          localStorage.setItem("email", res.user.email);
          setIsAuth(true);
        }
        if (res.errors) {
          setErrorMessage(res.errors);
          setIsAuth(false);
        }
      })
      .catch(new Error("Все сломалось"));
  };

  return (
    <div className="wrapper">
      <h2 className="title-form">Create new account</h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        onSubmit
        initialValues={{
          agreement: true,
          requiredMarkValue: false,
        }}
        requiredMark={false}
        layout="vertical"
        style={{ width: "100%" }}
        size="large"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
            {
              max: 20,
              min: 3,
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              max: 40,
              min: 6,
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Repeat Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords must match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <hr />

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I agree to the processing of my personal information
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bnt-send">
            Create
          </Button>
        </Form.Item>
        {error ? (
          <Alert
            type="error"
            message={`${Object.keys(errorMessage)} is invalid`}
            banner
          />
        ) : null}
        <p className="footnote">
          Already have an account?{" "}
          <Link to="/sing-in" className="link-go">
            Sing In
          </Link>
        </p>
      </Form>
    </div>
  );
};
export default SingUp;
