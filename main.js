document.addEventListener("DOMContentLoaded", () => {
  // upper line means that we want our html file to be loaded before our script
  const board = document.querySelector(".board");
  width = 8;
  const boxes = [];
  const candyColors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#bdb2ff",
    "#caffbf",
    "#9bf6ff",
  ];
  //----------Creating Game Boards------------------*
  // Create 8 by 8 Game Board :
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const box = document.createElement("div");
      //   Make each box draggable
      box.setAttribute("draggable", true);
      //   Assign an id to each box (0 to 63)
      box.setAttribute("id", i);
      //  Random integer number between 0 to 5
      let randomColor = Math.floor(Math.random() * candyColors.length);
      //  and then assigned it to each box
      box.style.backgroundColor = candyColors[randomColor];
      box.classList.add("box");
      board.appendChild(box);
      boxes.push(box);
    }
  }
  createBoard();
  //---------------------Drag Candies------------------*
  let colorBeingDragged;
  let boxIdBeingDragged;
  let colorBeingReplaced;
  let boxIdBeingReplaced;

  boxes.forEach((box) => box.addEventListener("dragstart", dragStart));
  boxes.forEach((box) => box.addEventListener("dragover", dragOver));
  boxes.forEach((box) => box.addEventListener("dragenter", dragEnter));
  boxes.forEach((box) => box.addEventListener("dragleave", dragLeave));
  boxes.forEach((box) => box.addEventListener("drop", dragDrop));
  boxes.forEach((box) => box.addEventListener("dragend", dragEnd));

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    boxIdBeingDragged = this.id;
    // console.log(colorBeingDragged);
    // console.log(boxIdBeingDragged);
    console.log(this.id, "dragstart");
  }
  function dragOver(event) {
    event.preventDefault();
    // console.log(this.id, "dragover");
  }
  function dragEnter(event) {
    event.preventDefault();
    // console.log(this.id, "dragenter");
  }
  function dragLeave() {
    // console.log(this.id, "dragleave");
  }
  function dragDrop() {
    console.log(this.id, "dragdrop");
    colorBeingReplaced = this.style.backgroundColor;
    boxIdBeingReplaced = this.id;
    // console.log(colorBeingReplaced);
    // console.log(boxIdBeingReplaced);
    // Swap colors (aka candies ! )
    this.style.backgroundColor = colorBeingDragged;
    boxes[boxIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    // boxes[boxIdBeingReplaced].style.backgroundColor = colorBeingDragged;
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    boxIdBeingDragged = this.id;
    // What is a valid move? (+ cross movement)
    let validMoves = [
      boxIdBeingDragged - 1,
      boxIdBeingDragged - width,
      boxIdBeingDragged + 1,
      boxIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(boxIdBeingReplaced);
    if (validMove && boxIdBeingReplaced) {
      boxIdBeingReplaced = null;
    } else if (!validMove && boxIdBeingReplaced) {
      boxes[boxIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      boxes[boxIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      boxes[boxIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }
});
