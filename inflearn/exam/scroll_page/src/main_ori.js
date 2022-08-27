import * as THREE from "three";
import { House } from "./House";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

/**
 * ----- 주제: 스크롤에 따라 움직이는 3D 페이지
		- mesh 삭제
		- spot light 추가
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "/textures/map_1214_.png",
  () => {
    console.log("로드완료");
  },
  () => {
    console.log("로드중");
  },
  () => {
    console.log("로드 에러");
  }
);

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadow를 부드럽게 함.

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white"); // scene에 배경설정 -> 바닥 mesh와 동일하게
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-5, 2, 25);
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("white", 0.7);
spotLight.position.set(0, 150, 100);
spotLight.castShadow = true; //그림자 설정
spotLight.shadow.mapSize.width = 1024; // 그림자의 퀄리티 설정
spotLight.shadow.mapSize.height = 1024; // 그림자의 퀄리티 설정
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

const gltfLoader = new GLTFLoader();

// mesh - 바닥
const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: "grey",
  })
);
floorMesh.rotation.x = -Math.PI / 2; // 바닥을 눞혀줌.
floorMesh.receiveShadow = true;
scene.add(floorMesh);

const houses = [];
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: -5,
    z: 20,
    height: 2,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: 7,
    z: 10,
    height: 2,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: -10,
    z: 0,
    height: 2,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: 10,
    z: -10,
    height: 2,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: -5,
    z: -20,
    height: 2,
  })
);
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

let currentSection = 0;
function setSection() {
  // window.pageYOffset  = window.scrollY

  const newSection = Math.round(window.scrollY / window.innerHeight);
  if (currentSection !== newSection) {
    console.log("anim");
    gsap.to(camera.position, {
      duration: 1,
      x: houses[newSection].x,
      z: houses[newSection].z + 5,
    });
    currentSection = newSection;
  }
}

// 이벤트
window.addEventListener("resize", setSize);
window.addEventListener("scroll", setSection);
draw();
