let audio, amplitude, x, y, progress, xVal
let oldVar, fft
const easing = 0.15

function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	amplitude = new p5.Amplitude()
	xVal = 0
	x = 15
	y = 15
	oldVar = 0
	progress = 0
	fft = new p5.FFT()
	rectMode(CENTER)
	// frameRate(60)
}

function draw() {
	background(200, 200, 200)
	push()
	const fftwave = fft.waveform()
	noFill()
	strokeWeight(3)
	stroke(255)

	for (let i = 0; i < fftwave.length; i++) {
		const x = map(i, 0, fftwave.length, 0, width)
		const y = map(fftwave[i], -10, 10, 0, height)
		point(x, y)
	}
	pop()

	// // if (oldVar != progress) {
	// // 	let temp = abs(oldVar - progress)
	// // 	if (progress > width / 2) {
	// // 		xVal -= temp
	// // 	}
	// // }

	// oldVar = progress
	stroke(255)
	translate(xVal, height / 1.25)
	const waveform = audio.getPeaks()
	progress = map(audio.currentTime(), 0, audio.duration(), 0, waveform.length)
	// var oldVar = progress
	// if (oldVar != progress) alert('testVariable has changed!')

	for (let i = 0; i < waveform.length; i++) {
		if (i > progress) {
			stroke(255, 0, 0)
		}
		line(i, waveform[i] * 100, i, waveform[i] * -100)
	}
	// Current second is displayed
	// second example 0
	// let s = second()
	//
	if (audio.isPlaying()) {
		// xVal--
		text('Current second: \n' + ~~progress, 500, 50)
		text('Current second: \n' + (~~frameCount % 60), 500, 100)
		// if (progress > width / 2) xVal -= 0.51
		// if(progress > 100){
		// 	if(waveform.progress){
		// 		xVal += 0.51
		// 	}
		// }
	}
}

function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
