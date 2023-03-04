import { prepareRunChecker } from "../../../../lib/shared/utils.js"

const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 })

export default class HandGestureController {
  #camera
  #view
  #service
  #lastDirection = {
    direction: '',
    y: 0
  }

  constructor({ camera, view, service }) {
    this.#camera = camera;
    this.#view = view;
    this.#service = service;
  }

  async init() {
    return this.#loop()
  }

  #scrollPage(direction) {
    const pixelsPerScroll = 100;

    if (this.#lastDirection.direction === direction) {
      this.#lastDirection.y = (
        direction === 'scroll-down'
          ? this.#lastDirection.y + pixelsPerScroll
          : this.#lastDirection.y - pixelsPerScroll
      )
    } else {
      this.#lastDirection.direction = direction;
    }

    this.#view.scrollPage(this.#lastDirection.y)
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video)

      for await (const { event, string, x, y } of this.#service.detectGestures(hands)) {
        if (event.includes('scroll')) {
          if (!scrollShouldRun()) {
            continue;
          }

          this.#scrollPage(event)
        }
      }

      console.log(hands)
    } catch (error) {
      console.error(error);
    }
  }

  #loop = async () => {
    await this.#service.initializeDetector()
    await this.#estimateHands()
    this.#view.loop(this.#loop)
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps)
    return controller.init()
  }
}