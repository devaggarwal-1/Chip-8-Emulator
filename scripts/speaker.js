class Speaker {
    constructor() {
        // const AudioContext = window.AudioContext || window.webkitAudioContext;

        // this.audioCtx = new AudioContext();

        // // Create a gain, which will allow us to control the volume
        // this.gain = this.audioCtx.createGain();
        // this.finish = this.audioCtx.destination;

        // this.gain.connect(this.finish);

        this.audioCtx = new window.AudioContext()
        this.audioCtx.resume()

        window.addEventListener('click', () => {
            this.audioCtx.resume()
        })
    }

    play(frequency) {
        if (this.audioCtx && !this.oscillator) {
            this.oscillator = this.audioCtx.createOscillator();

            //set the freq
            this.oscillator.frequency.setValueAtTime(frequency || 440, this.audioCtx.currentTime);

            //square wave
            this.oscillator.type = 'square'

            this.oscillator.connect(this.audioCtx.destination)
            this.oscillator.start()
        }
    }

    stop() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    }
}

export default Speaker;