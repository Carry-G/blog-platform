import React, { useState, useContext } from "react";
import { Avatar, Card, Typography, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import "./ArticleItem.scss";
// import { useHistory } from "react-router-dom";

import AuthContex from "../../../context";
import ApiBlog from "../../../services/apiServices";

const api = new ApiBlog();

const ArticlItem = ({ info }) => {
  const { Meta } = Card;
  const { Text } = Typography;
  // const router = useHistory();
  const { isAuth } = useContext(AuthContex);
  const {
    slug,
    title,
    createdAt,
    author,
    favoritesCount,
    tagList,
    description,
    favorited,
  } = info;
  const [like, setLike] = useState(favorited);
  const [contLike, setCountLike] = useState(favoritesCount);
  let tags;
  if (tagList !== null && tagList.length) {
    tags = tagList.map((tag) => (
      <Text key={tag} className="tag">
        {tag}
      </Text>
    ));
  } else {
    tags = [];
  }

  // const movePage = () => {
  //   router.push(`/articles/${slug}`);
  // };

  const btnLike = () => {
    setLike((perLike) => !perLike);
    setCountLike(() => (like ? contLike - 1 : contLike + 1));
    const l = !like
      ? api.postFavoritesArticle(slug)
      : api.deletFavoritesArticle(slug);
    return l;
  };

  return (
    <li className="articl-item">
      <Card>
        <div className="card-wrapper">
          <Meta
            title={
              <div className="title-left">
                <a href={`/articles/${slug}`} className="link">
                  {title}
                </a>
                <Button
                  type="text"
                  icon={<HeartOutlined />}
                  onClick={isAuth ? btnLike : null}
                >
                  {contLike}
                </Button>
              </div>
            }
            description={
              <>
                {" "}
                <span className="tags">{tags}</span>
                <Text type="secondary">{description}</Text>
              </>
            }
          />
          <Meta
            className="meta-right"
            avatar={<Avatar src={author.image} />}
            title={author.username}
            description={format(new Date(createdAt), "MMMM d, yyyy")}
          />
        </div>
      </Card>
    </li>
  );
};
export default ArticlItem;
