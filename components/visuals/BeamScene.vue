<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSG } from 'three-csg-ts'

const container = ref<HTMLDivElement | null>(null)

interface BeamData {
  poutre: { long: number; haut: number; epais: number }
  reser: { long: number; haut: number; epais: number; posi: number }
  rehaus: { long: number; haut: number; epais: number; posi: number }
  centreGx: number
  centreGy: number
  volumeTotal: number
  ancre1: number
  ancre2: number
}

const props = defineProps<{ beamData: BeamData }>()

onMounted(() => {
  if (!container.value) return

  const scale = 0.01
  const beamL = props.beamData.poutre.long * scale
  const beamH = props.beamData.poutre.haut * scale
  const beamD = props.beamData.poutre.epais * scale

  const reserL = props.beamData.reser.long * scale
  const reserH = props.beamData.reser.haut * scale
  const reserD = props.beamData.reser.epais * scale
  const reserPos = props.beamData.reser.posi * scale

  const rehausL = props.beamData.rehaus.long * scale
  const rehausH = props.beamData.rehaus.haut * scale
  const rehausD = props.beamData.rehaus.epais * scale
  const rehausPos = props.beamData.rehaus.posi * scale

  const ancre1 = props.beamData.ancre1 * scale
  const ancre2 = (props.beamData.poutre.long - props.beamData.ancre2) * scale // mesuré depuis droite

  // 🎬 Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  const camera = new THREE.PerspectiveCamera(
      75,
      container.value.clientWidth / container.value.clientHeight,
      0.1,
      1000
  )
  camera.position.set(0, 0, 5)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  // 💡 Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight.position.set(2, 2, 5)
  scene.add(dirLight)

  // 🧱 Poutre
  const beamGeom = new THREE.BoxGeometry(beamL, beamH, beamD)
  const beamMat = new THREE.MeshStandardMaterial({ color: 0x8fa3bf })
  const beamMesh = new THREE.Mesh(beamGeom, beamMat)
  beamMesh.updateMatrix()

  // 🔲 Réservation
  const reserGeom = new THREE.BoxGeometry(reserL, reserH, reserD)
  const reserMesh = new THREE.Mesh(reserGeom)
  reserMesh.position.set(
      -beamL / 2 + reserPos + reserL / 2,
      -beamH / 2 + reserH / 2,
      0
  )
  reserMesh.updateMatrix()

  // ➖ CSG
  const resultMesh = CSG.subtract(beamMesh, reserMesh)
  resultMesh.material = beamMat
  resultMesh.geometry.computeVertexNormals()
  scene.add(resultMesh)

  // 🧱 Rehausse
  const rehausGeom = new THREE.BoxGeometry(rehausL, rehausH, rehausD)
  const rehausMat = new THREE.MeshStandardMaterial({ color: 0x99cc99 })
  const rehausMesh = new THREE.Mesh(rehausGeom, rehausMat)
  rehausMesh.position.set(
      -beamL / 2 + rehausPos + rehausL / 2,
      beamH / 2 + rehausH / 2,
      0
  )
  scene.add(rehausMesh)

  // 📍 Ancrages

  function createUAnchor(height = 0.3, radius = 0.05): THREE.Group {
    const group = new THREE.Group()

    // Tubes latéraux
    const tubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff6600 })

    const straightPathLeft = new THREE.LineCurve3(
        new THREE.Vector3(-radius, 0, 0),
        new THREE.Vector3(-radius, height, 0)
    )
    const straightPathRight = new THREE.LineCurve3(
        new THREE.Vector3(radius, 0, 0),
        new THREE.Vector3(radius, height, 0)
    )

    const arcPath = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-radius, height, 0),
        new THREE.Vector3(0, height + radius, 0),
        new THREE.Vector3(radius, height, 0)
    )

    const tubeGeom1 = new THREE.TubeGeometry(straightPathLeft, 8, 0.01, 8, false)
    const tubeGeom2 = new THREE.TubeGeometry(straightPathRight, 8, 0.01, 8, false)
    const tubeGeom3 = new THREE.TubeGeometry(arcPath, 16, 0.01, 8, false)

    const leftMesh = new THREE.Mesh(tubeGeom1, tubeMaterial)
    const rightMesh = new THREE.Mesh(tubeGeom2, tubeMaterial)
    const arcMesh = new THREE.Mesh(tubeGeom3, tubeMaterial)

    group.add(leftMesh, rightMesh, arcMesh)
    return group
  }
// 📍 Ancre 1 (mesurée depuis la gauche)
  const anchor1 = createUAnchor()
  anchor1.position.set(-beamL / 2 + ancre1, beamH / 2 - 0.2, 0)
  anchor1.rotation.z = -Math.PI / 16
  scene.add(anchor1)

// 📍 Ancre 2 (mesurée depuis la droite)
  const anchor2 = createUAnchor()
  anchor2.position.set(-beamL / 2 + ancre2, beamH / 2 - 0.2, 0)
  anchor2.rotation.z = Math.PI / 16
  scene.add(anchor2)

  // 🎮 Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = true

  // 🧪 Helpers
  scene.add(new THREE.AxesHelper(2))
  scene.add(new THREE.GridHelper(15, 15))

  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<template>
  <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-md w-10/12 m-auto overflow-x-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Représentation de la poutre</h2>
    <div ref="container" class="w-full h-[400px] bg-gray-200 rounded-lg shadow" />
  </div>
</template>
