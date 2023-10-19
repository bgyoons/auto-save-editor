import PostEditPage from "./PostEditPage.js";
import PostsPage from "./PostsPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: { title: "", content: "" },
    },
  });

  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    if (pathname === "/") postsPage.render();
    else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();
  initRouter(this.route);
}
