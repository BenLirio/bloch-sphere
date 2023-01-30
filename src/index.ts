import p5 from 'p5'
const RADIUS = 300
const Y_ROTATION_SPEED = 0.0005
const X_ROTATION_SPEED = 0.0002
const width = 800
const height = 800
const DETAIL = 15

const drawAxis = (p:p5) => {
  p.push()
  p.stroke('red')
  p.line(0, 0, 0, RADIUS, 0, 0)
  p.stroke('green')
  p.line(0, 0, 0, 0, RADIUS, 0)
  p.stroke('blue')
  p.line(0, 0, 0, 0, 0, RADIUS)
  p.pop()
}

const drawSphere = (p:p5) => {
  p.push()
  p.noFill()
  p.rotateX(p.PI/2)
  p.stroke(p.color(0, 0, 0, 10))
  p.sphere(RADIUS, DETAIL, DETAIL)
  p.pop()
}
let theta = 0
let phi = 0
const drawQBit = (p:p5) => {
  p.push()
  p.fill('black')
  p.noStroke()
  p.rotateZ(phi)
  p.rotateY(theta)

  p.push()
  p.stroke(p.color(0, 0, 0, 75))
  p.line(0, 0, 0, 0, 0, RADIUS)
  p.pop()

  p.translate(0, 0, RADIUS)
  p.sphere(5, DETAIL, DETAIL)
  p.pop()

  p.push()
  p.translate(0, 0, p.cos(theta)*RADIUS)
  p.noFill()
  p.circle(0, 0, p.sin(theta)*2*RADIUS)
  p.stroke(p.color(255, 0, 0, 75))
  p.line(0, 0, 0, p.sin(theta)*RADIUS, 0, 0)
  p.stroke(p.color(0, 255, 0, 75))
  p.line(0, 0, 0, 0, p.sin(theta)*RADIUS, 0)
  p.pop()
}


interface Slider {
  value(): number
  value(v: number): void
  elt: { onchange: (e: { target: { value: number }}) => void }
}
interface TextInput {
  value(): number
  value(s: number): void 
  elt: { onchange: (e: { target: { value: number }}) => void }
}

let thetaSlider: Slider
let phiSlider: Slider
let thetaTextBox: TextInput
let phiTextBox: TextInput

const createSliders = (p:p5) => {
  p.createDiv('theta')
  thetaSlider = p.createSlider(0, 2 * Math.PI, 1, 0.01) as Slider
  thetaSlider.elt.onchange = ({target: { value }}) => thetaTextBox.value(value)
  p.createDiv()
  thetaTextBox = p.createInput(thetaSlider.value().toString()) as TextInput
  thetaTextBox.elt.onchange = ({target: { value }}) => thetaSlider.value(value)

  p.createDiv('phi')
  phiSlider = p.createSlider(0, 2 * Math.PI, Math.PI/6, 0.01) as Slider
  phiSlider.elt.onchange = ({target: { value }}) => phiTextBox.value(value)
  p.createDiv()
  phiTextBox = p.createInput(phiSlider.value().toString()) as TextInput
  phiTextBox.elt.onchange = ({target: { value }}) => phiSlider.value(value)
}

const s = (p:p5) => {

  p.setup = function() {
    p.createCanvas(width, height, p.WEBGL)
    createSliders(p);
  }

  p.draw = function() {
    p.orbitControl(5)
    p.scale(1, 1, -1)
    theta = thetaSlider.value()
    phi = phiSlider.value()
    p.background(200)

    p.rotateX(p.PI/2)
    p.rotateZ(-3*p.PI/4)
    p.rotate(p.PI/6, [-1, 1, 0])


    drawAxis(p)
    drawSphere(p)
    drawQBit(p)

  }
}

new p5(s)