let move_speed = 3, gravity = 0.5;
let bard = document.querySelector(".bard");
let image = document.getElementById("bard-01");

let bard_props = bard.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score-value");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score-title")

let game_state = "start";
image.style.display = "none"
message.classList.add("messgeStyle");


document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && game_state != "play") {
    document.querySelectorAll(".pipe").forEach((item) => {
      item.remove()
    })
    image.style.display = "block"
    bard.style.top = "40vh";
    game_state = "play"
    message.innerHTML = "";
    score_title.innerHTML = "Score : "
    score_val.innerHTML = 0;
    message.classList.remove("messgeStyle");

    play()
  }
})


const play = () => {
  function move() {
    if (game_state != "play") return;
    let pipes = document.querySelectorAll(".pipe");
    pipes.forEach((item) => { 
      let pipe_props = item.getBoundingClientRect();
      console.log(pipe_props)
      if (pipe_props.right <= 0 ) {
          item.remove()
      } else {
        if (bard_props.left < pipe_props.left + pipe_props.width && bard_props.left + bard_props.width > pipe_props.left && bard_props.top < pipe_props.top + pipe_props.height && bard_props.top + bard_props.height > pipe_props.top) {
          game_state = "End"
          message.innerHTML = "Game over";
          message.classList.add("messgeStyle");
          image.style.display = "none"
          return
        } else {
          if (pipe_props.right < bard_props.left && pipe_props.right + move_speed >= bard_props.left && item.increase_score == 1) {
            score_val.innerHTML += score_val.innerHTML + 1;
          }
          item.style.left = pipe_props.left - move_speed + "px";
        }
      }
        
   })

 requestAnimationFrame(move)
    
  }
  requestAnimationFrame(move)



  let bard_dy = 0;
  function apply_gravity() {
    if (game_state != "play") return;
    bard_dy = bard_dy + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.key = "ArrowUp" || e.key == " ") {
        image.src = "./bard-image/frame-2d-removebg-preview.png";
        bard_dy = -7.6;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key = "ArrowUp" || e.key == " ") {
        image.src = "./bard-image/frame-1d-removebg-preview.png";
      }
    });
    if (bard_props.top <= 0 || bard_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = '28vw';
      window.location.reload();
      message.classList.remove("messgeStyle");
      return
    }
    bard.style.top = bard_props.top + bard_dy + "px";
    bard_props = bard.getBoundingClientRect();
   requestAnimationFrame(apply_gravity)
  }

  requestAnimationFrame(apply_gravity)
  

  let pipeSeperation = 0;
  let pipeGap = 35;
  function creapePipe() {
    if (game_state != "play") return;
    if (pipeSeperation > 115) {
      pipeSeperation = 0;
      let pipePosi = Math.floor(Math.random() * 43 + 8);
      let pipe_ele = document.createElement("div");
      pipe_ele.className = "pipe";
      pipe_ele.style.top = pipePosi - 70 + "vh";
      pipe_ele.style.left = "100vw";
      document.body.appendChild(pipe_ele)
      let pipe_ele_bottom = document.createElement("div");
      pipe_ele_bottom.className = "pipe";
      pipe_ele_bottom.style.top = pipePosi + pipeGap + "vh";
      pipe_ele_bottom.style.left = "100vw";
      pipe_ele_bottom.increase_score = 1;
      document.body.appendChild(pipe_ele_bottom)
    }

    pipeSeperation += 1
    requestAnimationFrame(creapePipe)

  }
   requestAnimationFrame(creapePipe)

}

console.log(bard_props)