import * as THREE from "three";
import { House } from "./House";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

console.log(window.innerWidth * 0.8);
renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
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
// camera.position.set(-5, 0, 30);
camera.position.y = 0;
camera.position.z = 60;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("white", 1.2);
spotLight.position.set(-5, 1, 100);
spotLight.castShadow = true; //그림자 설정
// spotLight.shadow.mapSize.width = 1024; // 그림자의 퀄리티 설정
// spotLight.shadow.mapSize.height = 1024; // 그림자의 퀄리티 설정
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

const gltfLoader = new GLTFLoader();
// Controls
// const controls = new OrbitControls(camera, renderer.domElement);

// mesh - 바닥
const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: "grey",
    map: texture,
  })
);
floorMesh.rotation.x = -THREE.MathUtils.degToRad(0); // 바닥을 눞혀줌.
floorMesh.receiveShadow = true;
scene.add(floorMesh);

const houses = [];
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: 0,
    z: 0,
    height: 0,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: -18,
    z: 0,
    height: -4,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: 15,
    z: 0,
    height: -15,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: 2,
    z: 0,
    height: 20,
  })
);
houses.push(
  new House({
    gltfLoader,
    scene,
    modelSrc: "/models/house.glb",
    x: 15,
    z: 0,
    height: 80,
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
  camera.aspect = (window.innerWidth * 0.8) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  renderer.render(scene, camera);
}

let currentSection = 0;
function setSection() {
  // window.pageYOffset  = window.scrollY

  const newSection = Math.round(window.scrollY / window.innerHeight);
  if (currentSection !== newSection) {
    gsap.to(floorMesh.rotation, {
      duration: 1,
      x: -THREE.MathUtils.degToRad(0), // 바닥을 눞혀줌.
    });
    console.log("anim");
    gsap.to(camera.position, {
      duration: 1,
      x: houses[newSection].x,
      z: houses[newSection].z + 10,
      y: houses[newSection].height / 2,
    });
    currentSection = newSection;
  }
}
// 이벤트
window.addEventListener("resize", setSize);
window.addEventListener("scroll", setSection);
draw();
