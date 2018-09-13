import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.1, 2000);
renderer.setSize(1280,720);

document.body.appendChild(renderer.domElement);

const box = new THREE.BoxGeometry(100,100,100);
const boxMesh = new THREE.Mesh(box);
boxMesh.position.z = -500;

scene.add(boxMesh);

renderer.render(scene,camera);