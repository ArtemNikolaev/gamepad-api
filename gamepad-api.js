function gearSelector(buttons) {
  switch (true) {
    case buttons[12].pressed:
      return '1';
    case buttons[13].pressed:
      return '2';
    case buttons[14].pressed:
      return '3';
    case buttons[15].pressed:
      return '4';
    case buttons[16].pressed:
      return '5';
    case buttons[17].pressed:
      return '6';
    case buttons[18].pressed:
      return 'R';
    default:
      return 'N';
  }
}

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepadconnected", function(e) {
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log(gp.buttons);
  gameLoop();
});

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }

  var gp = gamepads[0];
  document.querySelector('body').innerHTML = `
    <div>
      <h2>Steering Wheel</h2>
      <div class="slidecontainer">
            <input type="range" min="-1000000" max="1000000" value="${gp.axes[0]*1_000_000}" id="steeringWheel">
      </div>
      <h2>Gear: <span id="gearBox">
        ${gearSelector(gp.buttons)}</span></h2>
      <p>
      <h2>Clutch</h2>
      <div class="slidecontainer">
            <input type="range" min="-1000000" max="1000000" value="${gp.axes[1]*-1_000_000}" id="clutch">
      </div>
      <h2>Brake</h2>
      <div class="slidecontainer">
            <input type="range" min="-1000000" max="1000000" value="${gp.axes[5]*-1_000_000}" id="brake">
      </div>
      <h2>Accelerator</h2>
      <div class="slidecontainer">
            <input type="range" min="-1000000" max="1000000" value="${gp.axes[2]*-1_000_000}" id="accelerator">
      </div>
      <h2>Hand Brake: <span id="handBrake">
        ${gp.buttons[2].pressed ? 'On' : 'Off'}</span></h2>
      <p>
    </div>
  `;

  requestAnimationFrame(gameLoop);
}
