import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

/**
 * ----- 주제: 그림자 설정
 *
 * 
 * 
    - 그림자 사용설정
      renderer.shadowMap.enabled = true;

    * 그림자 표시 픽셀 표시 타입
      radius를 적용하고 싶다면 기본값으로 놔두면 된다.
    
      renderer.shadowMap.type = THREE.PCFShadowMap;
      THREE.PCFShadowMap
      THREE.BasicShadowMap;
      THREE.PCFShadowMap

    - 그림자를 어디까지 표시할건지?
      light.shadow.camera.far = 10;
      light.shadow.camera.near = 1;
    - 2가지 고려 (light, mesh)
      : 다른 물체에 그림자를 영향을 고려할지? castShadow
        light.castShadow  = true;
      : 영향을 고려하여 나한테 그림자의 영향을 받을지? reciveShdow

    - 그림자 mapSize 지정   
      : mapsize가 너무크면 성능에 영향을 미친다.
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
      

        plane.receiveShadow = true;
        box.castShadow = true;
        box.receiveShadow = true;
        sphere.castShadow = true;
        sphere.receiveShadow = true;


    - 그림자 blur 효과를 줄수있음.
      light.shadow.radius = 5;
      
 */

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFShadowMap;
  // renderer.shadowMap.type = THREE.BasicShadowMap;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene
  const scene = new THREE.Scene();

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
  scene.add(ambientLight);

  // 태양광 light
  const light = new THREE.DirectionalLight("red", 0.5);
  light.rotation.y = 3;
  scene.add(light);

  const lightHelper = new THREE.DirectionalLightHelper(light);
  scene.add(lightHelper);

  // 그림자 설명
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  // light.shadow.radius = 5;
  light.shadow.camera.far = 10;
  light.shadow.camera.near = 1;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Geometry
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  // Material
  const material1 = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const material2 = new THREE.MeshStandardMaterial({
    color: "royalblue",
  });
  const material3 = new THREE.MeshStandardMaterial({
    color: "gold",
  });

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  // 그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  plane.rotation.x = -Math.PI * 0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);
  scene.add(plane, box, sphere);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(light.position, "x", -5, 5).name("카메라 X");
  gui.add(light.position, "y", -5, 5).name("카메라 Y");
  gui.add(light.position, "z", -5, 5).name("카메라 Z");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    // light.position.x = Math.cos(time) * 5;
    // light.position.z = Math.sin(time) * 5;
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
