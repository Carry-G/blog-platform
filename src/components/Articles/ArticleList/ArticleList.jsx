import React from "react";

import ArticleItem from "../ArticleItem";
import "./ArticleList.scss";

const ArticlList = (props) => {
  const { data } = props;
  const articles = data.map((item) => {
    return <ArticleItem key={item.slug} info={item} />;
  });
  return <ul>{articles}</ul>;
};

export default ArticlList;
