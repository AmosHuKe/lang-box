import fetch from 'node-fetch';

export class ApiClient {
  constructor(token) {
    this.token = token;
  }

  fetch = async (path, method = "GET", body) => {
    const res = await fetch(`https://api.github.com${path}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message);
    }
    return json;
  };

  fetchGq = async (query) => {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }).replace(/\\n/g, ""),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message);
    }
    return json;
  };
}
