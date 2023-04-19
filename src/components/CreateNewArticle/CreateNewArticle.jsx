import React, { useEffect, useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useParams, useHistory } from "react-router-dom";

import "./CreateNewArticle.scss";
import ApiBlog from "../../services/apiServices";

const api = new ApiBlog();

const CreateNewArticle = () => {
  const router = useHistory();
  const parans = useParams();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [article, setArticle] = useState({});
  const { TextArea } = Input;
  const formRef = React.useRef(null);
  const onFinish = (values) => {
    const newArticle = JSON.stringify({
      article: {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tagList,
      },
    });
    const apiCreay = Object.keys(parans).length
      ? api.putCreatArticle(newArticle, parans.slug)
      : api.postCreatArticle(newArticle);

    apiCreay
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
        if (res.article) {
          formRef.current?.resetFields();
          router.push(`/articles/${res.article.slug}`);
        }
        if (res.errors) {
          setErrorMessage(res.errors);
        }
      })
      .catch(new Error("Все сломалось"));
  };

  useEffect(() => {
    if (Object.keys(parans).length) {
      api
        .getArticlNumber(parans.slug)
        .then((resalt) => resalt.json())
        .then((res) => setArticle(res.article));
    }
  }, [parans]);

  const complete = [
    {
      name: ["title"],
      value: article.title ? article.title : null,
    },
    {
      name: ["description"],
      value: article.description ? article.description : null,
    },
    {
      name: ["body"],
      value: article.body ? article.body : null,
    },
    {
      name: ["tagList"],
      value: article.tagList ? article.tagList : [],
    },
  ];
  return (
    <div className="wrapper creat-article">
      <h2 className="title-form">Create new article</h2>
      <Form
        ref={formRef}
        fields={complete}
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{
          agreement: true,
          requiredMarkValue: false,
        }}
        requiredMark={false}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              max: 60,
              min: 3,
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Short description"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              max: 250,
              min: 6,
            },
          ]}
        >
          <Input placeholder="Short description" />
        </Form.Item>

        <Form.Item
          label="Text"
          name="body"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              max: 1000,
              min: 6,
            },
          ]}
        >
          <TextArea rows={4} placeholder="Tex" />
        </Form.Item>
        <p>Tags</p>
        <Form.List name="tagList" initialValue={[]}>
          {(fields, { add, remove }, { errors }) => (
            <div className="tag-list">
              {fields.map((field) => (
                <Form.Item className="prob" key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tag" className="input-tag" />
                  </Form.Item>
                  <Button
                    type="primary"
                    danger
                    ghost
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  >
                    Delete
                  </Button>
                </Form.Item>
              ))}

              <Button
                className="button-add"
                type="primary"
                ghost
                onClick={() => {
                  add();
                }}
              >
                Add tag
              </Button>
              <Form.ErrorList errors={errors} />
            </div>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bnt-send">
            Send
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
export default CreateNewArticle;
