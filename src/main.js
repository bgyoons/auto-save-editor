import App from "./App.js";
import Editor from "./Editor.js";
import { setItem, getItem } from "./storage.js";

const $target = document.querySelector("#app");

const TEMP_POST_SAVE_KEY = "temp-post";
const post = getItem(TEMP_POST_SAVE_KEY, { title: "", content: "" });

new Editor({
  $target,
  initialState: post,
  onEditing: (post) => {
    setItem("temp-post", {
      ...post,
      tempSaveDate: new Date(),
    });
  },
});

// new App({ $target });
