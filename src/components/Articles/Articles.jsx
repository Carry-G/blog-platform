import React, { useState, useEffect } from "react";
import { Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import useFetching from "../../hooks/useFetching";
import ApiBlog from "../../services/apiServices";

import ArticlList from "./ArticleList";

const api = new ApiBlog();

const Articls = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);
  const [fetchArticle, isArticleLoading, articleError] = useFetching(
    async () => {
      const response = await api.getAllArticles(page);
      const posts = await response.json();
      setData(posts.articles);
      setArticlesCount(posts.articlesCount);
    }
  );

  useEffect(() => {
    fetchArticle(page);
  }, [page]);

  return (
    <main className="main">
      {articleError && <h1>Oooops, We have some problems...</h1>}
      {isArticleLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 45 }} spin />} />
      ) : (
        <>
          <ArticlList data={data} />
          <section className="pagination">
            <Pagination
              defaultCurrent={page}
              total={articlesCount}
              defaultPageSize={5}
              current={page}
              onChange={(pageNumber) => setPage(pageNumber)}
            />
          </section>
        </>
      )}
    </main>
  );
};

export default Articls;
