import App from "./App.js";
import Editor from "./Editor.js";
import { setItem, getItem } from "./storage.js";

const $target = document.querySelector("#app");

const TEMP_POST_SAVE_KEY = "temp-post";
const post = getItem(TEMP_POST_SAVE_KEY, { title: "", content: "" });

let timer = null;
new Editor({
  $target,
  initialState: post,
  onEditing: (post) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      setItem("temp-post", {
        ...post,
        tempSaveDate: new Date(),
      });
    }, 500);
  },
});

// new App({ $target });
