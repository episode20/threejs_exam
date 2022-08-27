import * as THREE from "three";

/**
 * 애니메이션 기본
 * - getDelta()
 * - Date.now() 함수의 시간값을 이용하면 getDelta 값을 얻을 수 있으.ㅁ
 */
export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // ex02 threejs에서 고해상도 픽셀표시를 위해 사용함.
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearAlpha(0.5);
  // renderer.setClearColor("#00ff00");
  // renderer.setClearAlpha(0.5);

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color("blue");

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // near
    1000 // far
  );

  camera.position.z = 5;
  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight("ffffff", 100); // 색상, 감도(클수록 밝아짐)
  light.position.z = 5;
  light.position.x = 2;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const matrial = new THREE.MeshStandardMaterial({
    color: "red", // 'red', '#ff0000
  });

  const mesh = new THREE.Mesh(geometry, matrial);

  scene.add(mesh);
  console.log(window.devicePixelRatio); // 장비의 픽셀 밀도

  // threejs animation 기본
  let oldTime = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    mesh.rotation.y += deltaTime * 0.005;
    mesh.position.y += deltaTime * 0.001;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  // ex02의 주요내용
  function setSize() {
    // 카메라 조정 (종횡비)
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", setSize);
  draw();
}
