import * as THREE from "three";

/**
 * 애니메이션 기본
 * - requestAnimationFrame
 *  repaint 전에 영역의 위치를 변경해주는 역할을 함.
 * - renderer의 setAnimationLoop도 동일하게 사용가능함
 *  vr, webxr 기능을 제공할때 사용해야 함.
 * - pc의 성능차이에 따라 animation 동작이 상이할수 있음을 보정해줘야함.
 *  const clock = new THREE.Clock(); 활용
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
  const clock = new THREE.Clock();

  function draw() {
    // 각도는 radian 값을 사용
    // 360도 = 2파이
    // console.log(clock.getElapsedTime());
    const time = clock.getElapsedTime();

    // mesh.rotation.y += 0.1;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y = time * 2;
    // mesh.position.y += 0.01;
    mesh.position.y = time;
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
