import p5 from 'p5'
const ROTATION_SPEED = 0.0005
const width = 400
const height = 400

const drawAxis = (p:p5) => {
  p.push()
  p.stroke(255, 0, 0)
  p.line(0, 0, 0, 100, 0, 0)
  p.stroke(0, 255, 0)
  p.line(0, 0, 0, 0, 100, 0)
  p.stroke(0, 0, 255)
  p.line(0, 0, 0, 0, 0, 100)
  p.pop()
}
const drawSphere = (p:p5) => {
  p.push()
  p.noFill()
  p.stroke(p.color(0, 0, 0, 10))
  p.sphere(100)
  p.pop()
}
let theta = 0
let phi = 0
const drawQBit = (p:p5) => {
  p.push()
  p.noFill()
  p.stroke('black')
  p.strokeWeight(4)
  p.rotateX(theta)
  p.rotateY(phi)
  p.line(0, 0, 0, 0, 0, 100)
  p.pop()
}


interface Slider {
  value(): number
}
const isSlider = (s: any): s is Slider =>
  typeof s.value === 'function' &&
  typeof s.value() === 'number'

let thetaSlider: Slider
let phiSlider: Slider
const createSliders = (p:p5) => {
  const thetaSliderTmp = p.createSlider(0, 2 * Math.PI, 0, 0.01)
  if (isSlider(thetaSliderTmp)) {
    thetaSlider = thetaSliderTmp
  }
  const phiSliderTmp = p.createSlider(0, 2 * Math.PI, 0, 0.01)
  if (isSlider(phiSliderTmp)) {
    phiSlider = phiSliderTmp
  }
}

const s = (p:p5) => {

  p.setup = function() {
    p.createCanvas(width, height, p.WEBGL)
    createSliders(p)
  }

  p.draw = function() {
    theta = thetaSlider.value()
    phi = phiSlider.value()
    p.background(200)


    p.rotateY(p.millis() * ROTATION_SPEED)
    p.rotateX(0.2)
    drawAxis(p)
    drawSphere(p)
    drawQBit(p)

  }
}

new p5(s)