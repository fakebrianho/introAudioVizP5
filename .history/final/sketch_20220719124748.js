let audio,
	amplitude,
	fft,
	binWidth,
	peakDetect,
	bassDetect,
	highMid,
	myShaders,
	bg
const bins = 16
function preload() {
	audio = loadSound('../assets/audio/ethos.mp3')
	myShaders = loadShader(
		'../assets/shaders/vertex.vert',
		'../assets/shaders/fragment.frag'
	)
}

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
	canvas.mouseClicked(togglePlay)
	shader(myShaders)
	bg = random(255)
	amplitude = new p5.Amplitude()
	fft = new p5.FFT(0, bins)
	bassDetect = new p5.peakDetect(20, 140, 0.8)
	bassDetect.onPeak(bassDetected)
	peakDetect = new p5.PeakDetect()
	peakDetect.onPeak(peakDetected)
	highMid = new p5.peakDetect(2600, 5200, 0.1)
	highMid.onPeak(highMidDetected)

	binWidth = width / bins
}

/*------------------------------
Frequency Domain
------------------------------*/
//bass = [20, 140]
//lowMid = [140, 400]
//mid = [400, 2600]
//highMid = [2600, 5200]
//treble = [5200, 14000]

function draw() {
	background(bg)
	// essentially an array with length of bins and values from 0 - 255
	fft.analyze(bins)
	peakDetect.update(fft)
	bassDetect.update(fft)
	highMid.update(fft)
	const volume = amplitude.getLevel()
	let freq = fft.getCentroid()
	freq *= 0.001
	const mapF = map(freq, 0, 1, 0, 20)
	const mapA = map(volume, 0, 0.2, 0, 0.5)
	myShaders.setUniform('u_time', frameCount)
	myShaders.setUniform('u_freq', mapF)
	myShaders.setUniform('u_amp', mapA)
	let locX = mouseX - width / 2
	let locY = mouseY - height / 2
	// ambientLight(60, 60, 60)
	// pointLight(255, 255, 255, locX, locY, 50)
	// specularMaterial(250)
	// translate(-25, 0, 0)
	// shininess(1)
	// sphere(width / 6, 200, 200)
	// plane(500, 500, 200, 200)
	translate(-240, -100, 0)
	normalMaterial()
	push()
	rotateZ(frameCount * 0.01)
	rotateX(frameCount * 0.01)
	rotateY(frameCount * 0.01)
	plane(70)
	pop()
	rotateX(frameCount * 0.01)
	rotateY(frameCount * 0.01)
	box(150)
}

function peakDetected() {
	bg = color(random(255), random(255), random(255), 80)
}
function bassDetected() {
	console.log('bass detected')
}
function highMidDetected() {
	console.log('high mid detected')
	// bg = random(255)
}
function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}
