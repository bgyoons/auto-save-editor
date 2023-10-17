import Editor from "./Editor.js";
import PostsPage from "./PostsPage.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  postsPage.render();

  new Editor({ $target, initialState: "hello" });
}
