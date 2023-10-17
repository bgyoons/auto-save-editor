export default function Editor({ $target, initialState = "" }) {
  const $editor = document.createElement("textarea");

  $editor.style.width = "500px";
  $editor.style.height = "500px";
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.value = this.state;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    this.state = e.target.value;
  });
}
