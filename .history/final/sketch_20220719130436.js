//TLDR NOT A FAN OF 3D AN SHADERS IN P5.JS JUST USE THREE.JS IF YOU CAN ! ! ! !
//our globals
let audio,
	amplitude,
	fft,
	binWidth,
	peakDetect,
	bassDetect,
	highMid,
	myShaders,
	bg
// our sample size
const bins = 16

//preloading both our audio and our shaders
// will not be going over shader code in this demo/tutorial but will be in the future dm me if interested
function preload() {
	audio = loadSound('../assets/audio/ethos.mp3')
	myShaders = loadShader(
		'../assets/shaders/vertex.vert',
		'../assets/shaders/fragment.frag'
	)
}

function setup() {
	//make sure our canvas is drawing in webgl mode
	//as usual make our canvas clickable and pass a callback function to play and pause our audio.
	const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
	canvas.mouseClicked(togglePlay)

	// a shader is a program that runs on the GPU
	shader(myShaders)
	// random bg color to start
	bg = random(255)

	//our amp stuff blah blah blah
	amplitude = new p5.Amplitude()

	// passing in 0 smoothing and our bins that we're sampling
	fft = new p5.FFT(0, bins)
	// i had planned to do some cool shit with multiple beat detections but frankly p5 beat detection algo isn't thaaaat great and also i learned that i hate p5 shaders so i'm not going to use all of them, just know you can have multiple beat dection objects focused on different frequencies.
	//on peak basically like oo i found a beat now ima call a function to do _______
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
//according to p5 sound
//bass = [20, 140]
//lowMid = [140, 400]
//mid = [400, 2600]
//highMid = [2600, 5200]
//treble = [5200, 14000]

function draw() {
	background(bg)
	// essentially an array with length of bins and values from 0 - 255
	// we gonna update our detection objects with the fft everyframe
	fft.analyze(bins)
	peakDetect.update(fft)
	bassDetect.update(fft)
	highMid.update(fft)
	const volume = amplitude.getLevel()
	//get centroid is essentially returning where the average
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
	sphere(width / 6, 200, 200)
	push()
	translate(-width / 3, -height / 4, 0)
	// normalMaterial()
	rotateX(frameCount * 0.01)
	rotateY(frameCount * 0.01)
	box(100)
	pop()
	push()
	translate(width / 3, height / 4, 0)
	// normalMaterial()
	rotateX(frameCount * 0.02)
	rotateZ(frameCount * 0.01)
	box(100)
	pop()
	push()
	translate(width / 3, -height / 4, 0)
	// normalMaterial()
	rotateY(frameCount * 0.02)
	rotateX(frameCount * 0.01)
	box(100)
	pop()
	push()
	translate(-width / 3, height / 4, 0)
	// normalMaterial()
	rotateY(frameCount * 0.01)
	rotateZ(frameCount * 0.01)
	box(100)
	pop()
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
