
let isMouseDown = false;

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

const buttons = document.querySelectorAll('.toggle-btn');

buttons.forEach(button => {
  // 通常のクリックでも切り替え
  button.addEventListener('mousedown', toggle);

  // マウスオーバー中にドラッグで切り替え
  button.addEventListener('mouseenter', () => {
    if (isMouseDown) {
      toggle({ target: button });
    }
  });
});

function toggle(e) {
  e.target.classList.toggle('active');
}