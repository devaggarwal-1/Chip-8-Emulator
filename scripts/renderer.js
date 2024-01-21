class Renderer {

    //This constructor will take in a single argument, scale, which will allow us to scale the display up or down making pixels larger or smaller.
    constructor(scale) {
        //Chip-8 display size is 64x32 pixels.
        this.cols = 64;
        this.rows = 32;
        this.scale = scale;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        //we will scale up for modern display
        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        this.display = new Array(this.cols * this.rows);
    }

    //This function toggles a pixel on or off
    setPixel(x, y) {
        if (x > this.cols) {
            x -= this.cols
        } else if (x < 0) {
            x += this.cols
        }

        if (y > this.rows) {
            y -= this.rows
        } else if (y < 0) {
            y += this.rows
        }

        // y is multiplied by cols because display array is 1D
        let pixelLoc = x + (y * this.cols)

        //All that this line is doing is toggling the value at pixelLoc (0 to 1 or 1 to 0).
        //A value of 1 means a pixel should be drawn, a value of 0 means a pixel should be erased
        this.display[pixelLoc] ^= 1;

        return !this.display[pixelLoc]

    }

    //This function completely clears our display array by reinitializing it.
    clear() {
        this.display = new Array(this.cols * this.rows)
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let i = 0; i < this.cols * this.rows; i++) {
            let x = (i % this.cols) * this.scale;

            let y = Math.floor(i / this.cols) * this.scale;

            if (this.display[i]) {
                this.ctx.fillStyle = '#000'

                this.ctx.fillRect(x, y, this.scale, this.scale)
            }
        }
    }

    testRender() {
        this.setPixel(0, 0)
        this.setPixel(5, 2)
        this.setPixel(63, 31)
        this.setPixel(63, 30)
        this.setPixel(62, 31)

    }
}


export default Renderer;