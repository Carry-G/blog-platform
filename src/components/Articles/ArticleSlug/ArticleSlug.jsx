import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Avatar, Card, Typography, Button, Popconfirm, Spin } from "antd";
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";

import ApiBlog from "../../../services/apiServices";
import useFetching from "../../../hooks/useFetching";
import "./ArticleSlug.scss";
import AuthContex from "../../../context";

const { Meta } = Card;
const { Text } = Typography;

const api = new ApiBlog();

const ArticlSlug = () => {
  const parans = useParams();
  const router = useHistory();
  const { isAuth } = useContext(AuthContex);
  const [articl, setArticl] = useState({});
  const [like, setLike] = useState(null);
  const [contLike, setCountLike] = useState(0);
  const [fetchSlugArticl, isArticlLoading, articlError] = useFetching(
    async (slug) => {
      const response = await api.getArticlNumber(slug);
      const resalt = await response.json();
      setArticl(resalt.article);
      setLike(resalt.article.favorited);
      setCountLike(resalt.article.favoritesCount);
    }
  );

  useEffect(() => {
    fetchSlugArticl(parans.slug);
  }, []);

  const articlTagList = () => {
    if (articl.tagList !== null && articl.tagList.length) {
      return articl.tagList.map((tag) => (
        <Text key={tag} className="tag">
          {tag}
        </Text>
      ));
    }
    return null;
  };
  const btnLike = () => {
    setLike((preLike) => !preLike);
    setCountLike(() => (like ? contLike - 1 : contLike + 1));
    const l = !like
      ? api.postFavoritesArticle(articl.slug)
      : api.deletFavoritesArticle(articl.slug);
    return l;
  };

  const deleteArticle = () => {
    api.deleteCreatArticle(articl.slug).then((res) => {
      if (res.ok) {
        router.push("/articles");
      }
    });
  };

  const editArticle = () => {
    router.push(`/articles/${articl.slug}/edit`);
  };

  return (
    <div>
      {articlError && <h1>Oooops, We have some problems...</h1>}
      {Object.keys(articl).length && !isArticlLoading ? (
        <Card>
          <div className="card-wrapper slug">
            <Meta
              title={
                <div className="title-left">
                  <span className="link">{articl.title}</span>
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    onClick={isAuth ? btnLike : null}
                  >
                    {" "}
                    {contLike}
                  </Button>
                </div>
              }
              description={
                <span className="tags slug">
                  {articlTagList(articl.tagList)}
                </span>
              }
            />
            <Meta
              avatar={<Avatar src={articl.author.image} />}
              title={articl.author.username}
              description={
                <span>
                  {format(new Date(articl.createdAt), "MMMM d, yyyy")}
                </span>
              }
            />
          </div>
          <div className="description">
            <Text type="secondary">{articl.description}</Text>
            {articl.author.username === localStorage.getItem("username") ? (
              <span className="bnts-user">
                <Popconfirm
                  title="Are you sure to delete this article?"
                  cancelText="NO"
                  okText="YES"
                  onConfirm={deleteArticle}
                >
                  <Button className="bnt red">Delete</Button>
                </Popconfirm>
                <Button className="bnt green" onClick={editArticle}>
                  Edit
                </Button>
              </span>
            ) : null}
          </div>

          <Markdown>{articl.body}</Markdown>
        </Card>
      ) : (
        <Spin
          style={{ display: "block" }}
          indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />}
        />
      )}
    </div>
  );
};
export default ArticlSlug;
