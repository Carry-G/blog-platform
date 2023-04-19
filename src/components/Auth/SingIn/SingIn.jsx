import React, { useContext, useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";

import ApiBlog from "../../../services/apiServices";
import "./SingIn.scss";
import AuthContex from "../../../context";

const api = new ApiBlog();

const SingIn = () => {
  const { setIsAuth } = useContext(AuthContex);
  console.log(AuthContex);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const onFinish = (values) => {
    const userInfo = JSON.stringify({
      user: { email: values.email, password: values.password },
    });

    api
      .postLoginUser(userInfo)
      .then((result) => {
        if (result.status === 200) {
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
          localStorage.setItem("image", res.user.image ? res.user.image : "");
          setIsAuth(true);
        }
        if (res.errors) {
          setErrorMessage(res.errors);
          setIsAuth(false);
        }
      })
      .catch(new Error("Все сломалось"));
  };

  const autocomplete = [
    {
      name: ["email"],
      value: localStorage.getItem("email")
        ? localStorage.getItem("email")
        : null,
    },
  ];

  return (
    <div className="wrapper">
      <h2 className="title-form">Sign In</h2>
      <Form
        fields={autocomplete}
        name="basic"
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={{ agreement: true, requiredMarkValue: false }}
        onFinish={onFinish}
        size="large"
        requiredMark={false}
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email address!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bnt-send">
            Login
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
          Don’t have an account?{" "}
          <Link to="/sing-in" className="link-go">
            Sing Up
          </Link>
        </p>
      </Form>
    </div>
  );
};
export default SingIn;
