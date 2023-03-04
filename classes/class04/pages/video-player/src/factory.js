import Camera from '../../../lib/shared/camera.js'
import { supportsWorkerType } from '../../../lib/shared/utils.js'
import Service from './service.js'
import Controller from './controller.js'
import View from './view.js'

async function getWorker() {
  if (supportsWorkerType()) {
    console.log('initializing esm workers')

    const worker = new Worker('./src/worker.js', { type: 'module' })
    return worker;
  }

  console.warn('Your browser does not support esm workers!')
  console.warn('Importing libraries...')

  await import("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js")
  await import("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js")
  await import("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js")
  await import("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js")

  console.warn('Using mock workers...')

  const service = new Service({
    faceLandmarkDetection: window.faceLandmarkDetection
  })

  const workerMock = {
    async postMessage(video) {
      const blinked = await service.hadBlinked(video)

      if (!blinked) {
        return;
      }

      workerMock.onmessage({ data: { blinked } })

    },
    // sobrescrito pela controller
    onmessage(msg) { }
  }

  console.log('loading tf model')

  await service.loadModel()

  console.log('tf model ready')

  console.log('não suporta')

  setTimeout(() => worker.onmessage({ data: 'ready' }), 500)

  return workerMock;
}

const worker = await getWorker();
const view = new View();
const camera = await Camera.init();
const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initialize() {
    view.setVideoSrc(`${rootPath}/assets/video.mp4`)

    return Controller.initialize({
      camera,
      view,
      worker,
    })
  }
}

export default factory