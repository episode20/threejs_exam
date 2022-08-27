import * as THREE from "three";

/**
 * 기본장면 만들기
 */
export default function example() {
  // 1. renderer 생성
  // canvas 생성 renderer.domElement
  // html body에 <canvas>를 만들어서 활용할수 있고, 좀 더 명확하고 활용범위가 넓음.
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 2. scene 생성 (간단함.)
  const scene = new THREE.Scene();

  // 3. camera 생성 - 공식문서 확인
  // 원근카메라(perspective)
  //
  // fov(시야각), aspect(종횡비), near, far
  // Streo카메라

  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각
  //   window.innerWidth / window.innerHeight, // 종횡비
  //   0.1, // near
  //   1000 // far
  // );
  // // 카메라의 위치설정은 없는 상태 (0,0,0)
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;

  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight,
    -1,
    1,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 3;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix(); // 카메라 설정 변경시 호출해줘야 함.
  // scene에 camera를 add
  scene.add(camera);

  // 4. mesh 생성 (geometri + material)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const matrial = new THREE.MeshBasicMaterial({
    color: 0xff0000, // 'red', '#ff0000
  });
  const mesh = new THREE.Mesh(geometry, matrial);

  // scene에 mesh를 add
  scene.add(mesh);

  // 5. render
  renderer.render(scene, camera);
}
