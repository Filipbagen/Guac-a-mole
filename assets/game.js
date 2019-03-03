const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const avocados = document.querySelectorAll('.avocado')
let lastHole
let timeUp = false
let score = 0

const init = () => {
  dropText()
  dropSign()
}

const dropText = () => {
  const elem = document.querySelector('.drop')
  let pos = -160
  const id = setInterval(frame, 1)
  function frame() {
    if (pos === 0) {
      clearInterval(id)
    } else {
      pos++
      elem.style.top = pos + 'px'
    }
  }
}

const dropSign = () => {
  const elem = document.querySelector('#sign')
  let pos = -300
  const id = setInterval(frame, 1)
  function frame() {
    if (pos === 40) {
      clearInterval(id)
    } else {
      pos++
      elem.style.top = pos + 'px'
    }
  }
}

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const randomHole = (holes) => {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) {
    console.log('Oopsi diddlie doo')
    return randomHole(holes)
  }
  lastHole = hole
  return hole
}

const pop = () => {
  const time = randomTime(300, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!timeUp) pop()
  }, time)
}

const startGame = () => {
  setTimeout(() => {
    scoreBoard.textContent = 'score: ' + 0
    timeUp = false
    score = 0
    pop()
    setTimeout(() => timeUp = true, 10000)
  }, 500)
  gun()
}

function bonk (e) {
  gun()
  if (!e.isTrusted) return // cheater!
  score++
  this.parentNode.classList.remove('up')
  scoreBoard.textContent = 'score: ' + score
}

avocados.forEach(avocado => avocado.addEventListener('click', bonk))

const loadGame = () => {
  const game = document.querySelector('.playGame')
  game.style.visibility = 'hidden'
  init()
  const mute = document.querySelector('#mute')
  mute.style.visibility = 'visible'
  const unmute = document.querySelector('#unmute')
  unmute.style.visibility = 'hidden'
  const music = document.querySelector('.background')
  music.play()
  music.muted = true
}

const toMute = () => {
  const mute = document.querySelector('#mute')
  mute.style.visibility = 'visible'
  const unmute = document.querySelector('#unmute')
  unmute.style.visibility = 'hidden'
  const gunSound = document.querySelector('.gun')
  const music = document.querySelector('.background')
  gunSound.muted = true
  music.muted = true
}

const toPlay = () => {
  const mute = document.querySelector('#mute')
  mute.style.visibility = 'hidden'
  const unmute = document.querySelector('#unmute')
  unmute.style.visibility = 'visible'
  const music = document.querySelector('.background')
  music.muted = false
}

const goToGame = () => {
  const menu = document.querySelector('.menu')
  menu.classList.add('up')
  const game = document.querySelector('.playGame')
  game.style.visibility = 'visible'
  game.classList.add('up')
  gun()
}

const gun = () => {
  const gunSound = document.querySelector('.gun')
  gunSound.play()
}
