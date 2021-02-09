

const mainMenu = () => {
  const wrap = document.createElement('div');
  wrap.classList.add('main-menu__menu-container', 'animate__animated', 'animate__fadeIn');
  // Opción play
  const optionPlay = document.createElement('div');
  optionPlay.classList.add('main-menu__option',
  'main-menu__option-primary');
  optionPlay.innerText = 'Play';
  // Opción enter room
  const optionEnterRoom = document.createElement('div');
  optionEnterRoom.classList.add('main-menu__option');
  optionEnterRoom.innerText = 'Enter room';

  mainMenuEvents(optionPlay, optionEnterRoom);
  wrap.appendChild(optionPlay);
  wrap.appendChild(optionEnterRoom);

  const footer = document.createElement('footer');
  footer.classList.add('base__footer');
  footer.innerText = 'Aarón Sibaja Méndez';

  wrap.appendChild(footer);

  return wrap;
}

const mainMenuEvents = (optionPlay, optionEnterRoom) => {
  optionPlay.addEventListener('click', () => {
    setComponent(createPlayer());
  });

  optionEnterRoom.addEventListener('click', () => {
    setComponent();
  });
}
