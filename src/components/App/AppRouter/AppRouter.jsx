import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Articles from "../../Articles";
import ArticleSlug from "../../Articles/ArticleSlug";
import SingUp from "../../Auth/SingUp";
import SingIn from "../../Auth/SingIn";
import Profile from "../../Profile";
import CreateNewArticle from "../../CreateNewArticle";
import AuthContex from "../../../context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContex);
  return isAuth ? (
    <Switch>
      <Route path="/articles" component={Articles} exact />
      <Route path="/articles/:slug" component={ArticleSlug} exact />
      <Route path="/articles/:slug/edit" component={CreateNewArticle} />
      <Route path="/profile" component={Profile} exact />
      <Route path="/new-article" component={CreateNewArticle} exact />
      <Redirect to="/articles" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/articles" component={Articles} exact />
      <Route path="/articles/:slug" component={ArticleSlug} exact />
      <Route path="/sign-up" component={SingUp} exact />
      <Route path="/sign-in" component={SingIn} exact />
      <Route path="/" component={Articles} />
    </Switch>
  );
};
export default AppRouter;
