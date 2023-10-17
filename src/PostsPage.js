import PostList from "./PostList.js";
import { request } from "./request.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target,
    initialState: [],
    onPostClick: (id) => {},
  });

  const $newPostButton = document.createElement("button");
  $newPostButton.textContent = "새 포스트 작성하기";
  $page.appendChild($newPostButton);

  const fetchPosts = async () => {
    const posts = await request("/posts");
    postList.setState(posts);
  };

  this.render = async () => {
    console.log("render");
    await fetchPosts();
    $target.appendChild($page);
  };

  // this.render();
}
