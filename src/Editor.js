export default function Editor({
  $target,
  initialState = { title: "", content: "" },
}) {

  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
      $editor.innerHTML = `
        <input type="text" name="title" style="width:600px" value=${this.state.title} />
        <textarea name="content" style="width:600px; height:400px">${this.state.content}</textarea>
      `;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (this.state[name]) {
      const nextState = { ...this.state, [name]: e.target.value };
      this.setState(nextState);
    }
  });
}
