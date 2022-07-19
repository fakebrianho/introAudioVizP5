let audio, amplitude, fft, binWidth, peakDetect, bassDetect, highMid, myShaders
const bins = 16
function preload() {
	audio = loadSound('assets/audio/ethos.mp3')
	myShaders = loadShader(
		'assets/shaders/vertex.vert',
		'assets/shaders/fragment.frag'
	)
}

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
	canvas.mouseClicked(togglePlay)
	shader(myShaders)
	// rectMode(CENTER)
	// audio.play()
	amplitude = new p5.Amplitude()
	fft = new p5.FFT(0, bins)

	// peakDetect = new p5.PeakDetect(5200, 14000, 0.1)
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
	background(0)
	// noStroke()
	// translate(width / 2, height / 2)
	// const volume = amplitude.getLevel()
	// const mapVolume = map(volume, 0, 0.1, 0, windowWidth)
	// const waveForm = audio.getPeaks()
	// rect(0, 0, mapVolume, mapVolume)
	// for (let i = 0; i < waveForm.length; i++) {
	// 	line(i, waveForm[i] * 100, i, waveForm[i] * -100)
	// }
	// essentially an array with length of bins and values from 0 - 255
	fft.analyze(bins)
	peakDetect.update(fft)
	bassDetect.update(fft)
	highMid.update(fft)
	const volume = amp.getLevel()
	const freq = fft.getEnergy('bass')
	// const spectrum = fft.analyze()

	// for (let i = 0; i < spectrum.length; i++) {
	// 	const x = i * binWidth
	// 	const y = map(spectrum[i], 0, 255, height, 0)
	// 	rect(x, y, binWidth, height - y)
	// }
	myShaders.setUniform('u_time', frameCount)
	myShaders.setUniform('u_freq', frameCount)
	myShaders.setUniform('u_amp', frameCount)
	sphere(width / 8, 200, 200)
}

function peakDetected() {
	console.log('peak detected')
}
function bassDetected() {
	console.log('bass detected')
}
function highMidDetected() {
	console.log('high mid detected')
}
function togglePlay() {
	if (audio.isPlaying()) {
		audio.pause()
	} else {
		audio.play()
	}
}
