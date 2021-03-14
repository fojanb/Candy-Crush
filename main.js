document.addEventListener("DOMContentLoaded", () => {
  // upper line means that we want our html file to be loaded before our script.
  const board = document.querySelector(".board"); //Grab <div class="board"></>div from HTML code.
  // Global Variables.
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
  let colorDragged;
  let boxIdDragged;
  let colorTarget;
  let boxIdTarget;
  let score = 0;
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
  //---------------------Drag Candies start------------------*
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
    console.log(this.id, "dragdrop");
    colorTarget = this.style.backgroundColor;
    boxIdTarget = this.id;
    // console.log(colorTarget);
    // console.log(boxIdTarget);
    // console.log(colorDragged);
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
      // Swap colors (aka candies ! )
      boxes[parseInt(boxIdTarget)].style.backgroundColor = colorDragged;
      boxes[parseInt(boxIdDragged)].style.backgroundColor = colorTarget;
    } else {
      // Do not swap colors (aka candies ! )
      boxes[parseInt(boxIdDragged)].style.backgroundColor = colorDragged;
      boxes[parseInt(boxIdTarget)].style.backgroundColor = colorTarget;
    }
  }
  //---------------------Drag Candies end------------------*

  // Cheking for matches : rows of 3 or 4 or 5 candies / colums of 3 or 4 or 5 candies
  // Check for row of 3 candies :
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1,i + 2];
      let decidedColor = boxes[parseInt(i)].style.backgroundColor;
      let isBlank = boxes[parseInt(i)].style.backgroundColor === "";
      
      if (rowOfThree.every(item => {boxes[parseInt(item)].style.backgroundColor === (decidedColor && !isBlank)})) 
      {
        score += 3;
        rowOfThree.forEach(
          item => boxes[parseInt(item)].style.backgroundColor = ""
        )
      } //End of if
    } //End of for
  }
  checkRowForThree();
 
});
