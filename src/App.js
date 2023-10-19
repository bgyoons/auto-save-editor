import PostEditPage from "./pages/PostEditPage.js";
import PostsPage from "./pages/PostsPage.js";
import { initRouter } from "./router.js";

// * 1. 페이지 컴포넌트 생성
// * 2. 라우트를 통해 url path에 따라 페이지 컴포넌트를 렌더링
// * 3. 커스텀 이벤트를 통해 라우팅 처리

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
    if (pathname === "/") postsPage.setState();
    else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();
  initRouter(this.route);
}
