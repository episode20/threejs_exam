import * as THREE from "three";
import { CubeTextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * ----- 주제: EnvitonmentMap
 *  https://polyhaven.com/hdris
 *    exr -> hdr 이미지 다운로드
 *    hdr 파일 변환 (온라인) hdr to cubemap 검색
 *      https://matheowis.github.io/HDRI-to-CubeMap/
 *      3번째 옵션으로 processing 후 다운로드
 *    cubemap 폴더 생성
 *      n이미지 negative 방향
 *      p이미지 positive 방향
 */

export default function example() {
  // 텍스터 이미지 로드
  const cudeTextureLoader = new THREE.CubeTextureLoader();
  const envTex = cudeTextureLoader
    .setPath("/textures/cubemap/")
    .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  const directionalLight = new THREE.DirectionalLight("white", 1);
  scene.add(ambientLight, directionalLight);
  directionalLight.position.set(1, 1, 2);

  // directionalLight.position.x = 1;
  // directionalLight.position.z = 2;
  // scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.BoxGeometry(3, 3, 3);

  const material = new THREE.MeshBasicMaterial({
    metalness: 2,
    roughness: 0.1,
    envMap: envTex,
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
