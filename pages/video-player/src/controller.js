export default class Controller {
  #view
  #camera
  #worker

  constructor({ view, worker, camera }) {
    this.#view = view
    this.#camera = camera
    this.#worker = this.#configureWorker(worker)
  }

  static async initialize(deps) {
    const controller = new Controller(deps)
    return controller.init()
  }

  #configureWorker(worker) {
    let ready = false
    worker.onmessage = ({ data }) => {
      if ('ready' === data) {
        ready = true;
        console.log('worker ready')
        return;
      }

      const blinked = data.blinked
      this.#view.togglePlayVideo()
      console.log(`Blink count: ${blinked}`);
    }

    return {
      send(msg) {
        if (!ready) {
          return;
        }

        worker.postMessage(msg)
      }
    }
  }

  async init() {
    this.#startBlinkDetection();
  }

  #startBlinkDetection() {
    const video = this.#camera.video
    const img = this.#view.getVideoFrame(video)
    this.#worker.send(img)
    setTimeout(() => this.#startBlinkDetection(), 100);
  }
}