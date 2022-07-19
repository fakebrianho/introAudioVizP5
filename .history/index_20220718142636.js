let audio, amplitude

const easing = 0.05

function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
}
function setup() {
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.mouseClicked(togglePlay)
	amplitude = new p5.Amplitude()
	rectMode(CENTER)
}

function draw() {
	background(200, 200, 200)
	translate(width / 2, height / 2)
	console.log(amplitude.volume)
	const mapX = map(amplitude.volume, 0, 1, 0, width)
	let anim = lerp(0, mapX, 1)
	rect(0, 0, 15 + mapX * easing, 15 + mapX * easing)
	// rect(0, 0, 15 + anim, 15 + anim)
}

function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}
