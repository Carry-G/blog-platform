import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { useHistory } from "react-router-dom";

import ApiBlog from "../../services/apiServices";

const api = new ApiBlog();

const Profile = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [form] = Form.useForm();
  const router = useHistory();
  const onFinish = (values) => {
    const editInfo = JSON.stringify({
      user: {
        email: values.email,
        password: values.password,
        username: values.username,
        bio: "",
        image: values.url || "",
      },
    });
    api
      .putEditUser(editInfo)
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
          localStorage.setItem("image", res.user.image);
          router.push("/articles");
        }
        if (res.errors) {
          setErrorMessage(res.errors);
        }
      })
      .catch(new Error("Все сломалось"));
  };

  return (
    <div className="wrapper">
      <h2 className="title-form">Edit Profile</h2>
      <Form
        fields={[
          {
            name: ["email"],
            value: localStorage.getItem("email")
              ? localStorage.getItem("email")
              : null,
          },
          {
            name: ["username"],
            value: localStorage.getItem("username")
              ? localStorage.getItem("username")
              : null,
          },
        ]}
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
        style={{ width: 320 }}
        size="large"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              max: 20,
              min: 3,
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
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
          label="New password"
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
          <Input.Password placeholder="New password" />
        </Form.Item>
        <Form.Item
          name="url"
          label="Avatar image (url)"
          rules={[
            { required: true },
            { type: "url", warningOnly: true },
            { type: "string", min: 6 },
          ]}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bnt-send">
            Save
          </Button>
        </Form.Item>
        {error ? (
          <Alert
            type="error"
            message={`${Object.keys(errorMessage)} is invalid`}
            banner
          />
        ) : null}
      </Form>
    </div>
  );
};
export default Profile;
