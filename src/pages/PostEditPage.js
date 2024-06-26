import Editor from "./components/Editor.js";
import LinkButton from "./components/LinkButton.js";
import { request } from "./request.js";
import { getItem, removeItem, setItem } from "./storage.js";

// * 로컬 스토리지를 이용해 임시 데이터 저장 + 포스팅, 글 불러오기
export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;
  const post = getItem(postLocalSaveKey, { title: "", content: "" });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === "new";
        if (isNew) {
          const createdPost = await request("/posts", {
            method: "POST",
            body: JSON.stringify(post),
          });
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createdPost.id,
          });
        } else {
          await request(`/posts/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, { title: "", content: "" });
        this.render();
        editor.setState(post);
      } else await fetchPost();
      return;
    }
    this.state = nextState;
    this.render();
    editor.setState(
      this.state.post ?? {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;
    if (postId !== "new") {
      const post = await request(`/posts/${postId}`);
      const tempPost = getItem(postLocalSaveKey, { title: "", content: "" });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        confirm("저장되지 않은 임시 데이터가 있습니다. 불러오시겠습니까?") &&
          this.setState({
            ...this.state,
            post: tempPost,
          });
        return;
      }

      this.setState({
        ...this.state,
        post,
      });
    }
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: "목록으로 이동",
      link: "/",
    },
  });
}
