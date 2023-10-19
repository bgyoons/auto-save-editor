import LinkButton from "./LinkButton.js";
import PostList from "./PostList.js";
import { request } from "./request.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "새 포스트 작성하기",
      link: "/posts/new",
    },
  });

  this.setState = async () => {
    const posts = await request("/posts");
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
