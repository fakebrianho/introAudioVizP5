let audio, amplitude, x, y, progress, xVal
let oldVar
const easing = 0.15

function preload() {
	audio = loadSound('assets/audio/sketch.mp3')
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
	rectMode(CENTER)
	// frameRate(60)
}

function draw() {
	background(200, 200, 200)
	push()
	translate(width / 2, height / 2)
	const mapX = map(amplitude.volume, 0, 1, 0, width / 2)
	let dX = 0
	dX = mapX - x
	x += dX * easing
	rect(0, 0, x + 100, x + 100)
	pop()
	if (oldVar != progress) {
		console.log(abs(oldVar - progress))
		// if (progress > 100) {
		// xVal--
		// }
	}

	oldVar = progress
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
