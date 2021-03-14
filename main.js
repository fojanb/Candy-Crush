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
      // so far : <div id="2" class="box" style="background-color:"" ,draggable="true">
    }
  }
  createBoard();
  //---------------------Drag Candies------------------*
  let colorDragged;
  let boxIdDragged;
  let colorTarget;
  let boxIdTarget;

  boxes.forEach((box) => box.addEventListener("dragstart", dragStart));
  boxes.forEach((box) => box.addEventListener("dragover", dragOver));
  boxes.forEach((box) => box.addEventListener("dragenter", dragEnter));
  boxes.forEach((box) => box.addEventListener("dragleave", dragLeave));
  boxes.forEach((box) => box.addEventListener("drop", dragDrop));
  boxes.forEach((box) => box.addEventListener("dragend", dragEnd));

  function dragStart() {
    colorDragged = this.style.backgroundColor;
    boxIdDragged = this.id;
    // console.log(colorDragged);
    // console.log(boxIdDragged);
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
    console.log(this.id, this.style.backgroundColor, "dragdrop");
    colorTarget = this.style.backgroundColor;
    boxIdTarget = this.id;
    // console.log(colorTarget);
    // console.log(boxIdTarget);
    // console.log(colorDragged);
    // Swap colors (aka candies ! )
    // this.style.backgroundColor = colorDragged;
    // boxes[boxIdDragged].style.backgroundColor = colorTarget;
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    colorDragged = this.style.backgroundColor;
    boxIdDragged = this.id;
    // // What is a valid move? (+ cross movement)
    let validMoves = [
      parseInt(boxIdDragged) - 1,
      parseInt(boxIdDragged) - 8,
      parseInt(boxIdDragged) + 1,
      parseInt(boxIdDragged) + 8,
    ];
    let validMove = validMoves.includes(parseInt(boxIdTarget));
    console.log(validMove);
    if (validMove) {
      boxes[parseInt(boxIdTarget)].style.backgroundColor = colorDragged;
      boxes[parseInt(boxIdDragged)].style.backgroundColor = colorTarget;
    } else {
      boxes[parseInt(boxIdDragged)].style.backgroundColor = colorDragged;
      boxes[parseInt(boxIdTarget)].style.backgroundColor = colorTarget;
    }
  }
});
