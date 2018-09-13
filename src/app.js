import * as THREE from 'three';
import { renderTarget, TextureOffSet, planeMat } from './planeMat';
import { lerp } from './calc'
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.1, 2000);
renderer.setSize(1280, 720);

document.body.appendChild(renderer.domElement);

const boxGeo = new THREE.BoxGeometry(100, 100, 100);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const boxMesh = new THREE.Mesh(boxGeo, boxMaterial);
boxMesh.position.z = -500;

const boxLight = new THREE.PointLight(0xffffff, 0.4);
boxLight.position.set(0, 150, -250);

const vibroScene = new THREE.Scene();
const vibroCamera = new THREE.PerspectiveCamera(70, 16 / 9, 0.1, 2000);

// const renderTarget = new THREE.WebGLRenderTarget(1280, 720);
// const planeMat = new THREE.MeshBasicMaterial({ map: renderTarget.texture});
const planeGeo = new THREE.PlaneGeometry(512, 288);
const planeMesh = new THREE.Mesh(planeGeo, planeMat)

planeMesh.position.z = -200;
const boxMesh2 = new THREE.Mesh(boxGeo, planeMat);
boxMesh2.position.z = -500;

boxMesh.rotateX(0.5)

scene.add(boxMesh, boxLight);
vibroScene.add(planeMesh);
let start = false
document.addEventListener('click', () => {
  start = !start;
  console.log(start);
})

TextureOffSet.set(0.015, 0.015);

render();


function render() {
  boxMesh.rotateX(0.001);
  boxMesh.rotateY(0.002);
  // const randomVec = new THREE.Vector2(0.1,0.1).rotateAround(new THREE.Vector2(0,0),lerp(0,Math.PI*2,Math.random()));
  const randomVec = new THREE.Vector2(
    lerp(-1, 1, Math.random()),
    lerp(-1, 1, Math.random())
  );
  // TextureOffSet.rotateAround(new THREE.Vector2(0,0),Math.PI*2 / 60);
  // console.log(randomVec);
  let time = new Date().getTime() / 1000;
  let timeFract = time - Math.floor(time);
  const synchVec = new THREE.Vector2(0.015, 0.015);
  synchVec.rotateAround(new THREE.Vector2(0, 0), lerp(0, Math.PI, timeFract))
  if (start) {
    // TextureOffSet.copy(synchVec);
    TextureOffSet.rotateAround(new THREE.Vector2(0, 0), (Math.PI * 2) / (60 * 2));
    // TextureOffSet.rotateAround(new THREE.Vector2(0,0),0.009);
  }
  renderer.render(scene, camera, renderTarget);
  renderer.render(vibroScene, vibroCamera);
  requestAnimationFrame(render);
}
