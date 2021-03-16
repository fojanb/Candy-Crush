document.addEventListener("DOMContentLoaded", () => {
  // upper line means that we want our html file to be loaded before our script.
  const board = document.querySelector(".board"); //Grab <div class="board"></>div from HTML code.
  const displayScore = document.getElementById('score');
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

  //--------------------Cheking for matches-----------------*
  // <<rows of 3 or 4 or 5 candies / colums of 3 or 4 or 5 candies>>

  // 1- Check for row of 3 candies :
  function checkRowForThree() {
    for (let i = 0; i < boxes.length - 3; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = boxes[i].style.backgroundColor;
      const isBlank = boxes[i].style.backgroundColor === "";
      let notValidStartBoxIndexes = [
        6,
        7,
        14,
        15,
        22,
        23,
        30,
        31,
        38,
        39,
        46,
        47,
        54,
        55,
      ];
      if (notValidStartBoxIndexes.includes(i)) continue;
      if (
        rowOfThree.every(
          (item) =>
            boxes[item].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        displayScore.innerHTML = score;
        rowOfThree.forEach((item) => {
          boxes[item].style.backgroundColor = "";
        });
      } //End of if
    } //End of for
  }
  checkRowForThree();

  // 2- Check for column of 3 candies :
  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + 8, i + 16];
      let decidedColor = boxes[i].style.backgroundColor;
      const isBlank = boxes[i].style.backgroundColor === "";

      if (
        columnOfThree.every(
          (item) =>
            boxes[item].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        displayScore.innerHTML = score;
        columnOfThree.forEach((item) => {
          boxes[item].style.backgroundColor = "";
        });
      } //End of if
    } //End of for
  }
  checkColumnForThree();

  // 3- Check for row of 4 candies :
  function checkRowForFour() {
    for (let i = 0; i < boxes.length - 4; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = boxes[i].style.backgroundColor;
      const isBlank = boxes[i].style.backgroundColor === "";
      let notValidStartBoxIndexes = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ];
      if (notValidStartBoxIndexes.includes(i)) continue;
      if (
        rowOfFour.every(
          (item) =>
            boxes[item].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 4;
        displayScore.innerHTML = score;
        rowOfFour.forEach((item) => {
          boxes[item].style.backgroundColor = "";
        });
      } //End of if
    } //End of for
  }
  checkRowForFour();

  // 4- Check for column of 4 candies :
  function checkColumnForFour() {
    for (let i = 0; i < 47; i++) {
      let columnOfFour = [i, i + 8, i + 16, i + 24];
      let decidedColor = boxes[i].style.backgroundColor;
      const isBlank = boxes[i].style.backgroundColor === "";

      if (
        columnOfFour.every(
          (item) =>
            boxes[item].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 4;
        displayScore.innerHTML = score;
        columnOfFour.forEach((item) => {
          boxes[item].style.backgroundColor = "";
        });
      } //End of if
    } //End of for
  }
  checkColumnForFour();
  // ----------------Drop Down Candies-------------
  function moveDown() {
    // Drop down candies once some have been cleared
    for (let i = 0; i < 55; i++) {
      if (boxes[i + width].style.backgroundColor === "") {
        boxes[i + width].style.backgroundColor = boxes[i].style.backgroundColor;
        boxes[i].style.backgroundColor = "";
        // Now let's fill out empty box (aka candy) with random color:
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isInFirstRow = firstRow.includes(i); //Returns boolean
        if (isInFirstRow && boxes[i].style.backgroundColor === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          boxes[i].style.backgroundColor = candyColors[randomColor];
        }
      }
    }
  }
  // ---------------------------------------------

  window.setInterval(function () {
    moveDown();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }, 100); //Invoke every 100 milli-seconds
});
