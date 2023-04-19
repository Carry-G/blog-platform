export default class ApiBlog {
  baseUrl = "https://blog.kata.academy/api/";

  async getAllArticles(page) {
    const result = await fetch(
      `${this.baseUrl}articles?limit=5&offset=${page}`
    );

    return result;
  }

  async getUser(token) {
    const result = fetch(`${this.baseUrl}user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  }

  async getArticlNumber(slug) {
    const result = await fetch(`${this.baseUrl}articles/${slug}`);
    return result;
  }

  async postRegisterUser(userInfo) {
    const result = await fetch(`${this.baseUrl}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: userInfo,
    });
    // Отсюда заюираем токе который остается всегда для при регистарции
    return result;
  }

  async postLoginUser(userInfo) {
    const result = await fetch(`${this.baseUrl}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: userInfo,
    });
    return result;
  }

  async putEditUser(editInfo) {
    const result = await fetch(`${this.baseUrl}user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: editInfo,
    });
    return result;
  }

  async postCreatArticle(newArticle) {
    const result = await fetch(`${this.baseUrl}articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newArticle,
    });
    return result;
  }

  async putCreatArticle(newArticle, slug) {
    const result = await fetch(`${this.baseUrl}articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newArticle,
    });
    return result;
  }

  async deleteCreatArticle(slug) {
    const result = await fetch(`${this.baseUrl}articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result;
  }

  async postFavoritesArticle(article) {
    const result = await fetch(`${this.baseUrl}articles/${article}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result;
  }

  async deletFavoritesArticle(article) {
    const result = await fetch(`${this.baseUrl}articles/${article}/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result;
  }
}
