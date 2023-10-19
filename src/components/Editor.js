// * 업데이트 될 때마다 이벤트를 통해 onEditing 콜백을 호출하여 상태 전달
export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  let isInit = false;

  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("input[name=title]").value = this.state.title;
    $editor.querySelector("textarea[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <input type="text" name="title" style="width:600px" value="${this.state.title}">
        <textarea name="content" style="width:600px; height:400px">${this.state.content}</textarea>
      `;
      isInit = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: e.target.value };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
