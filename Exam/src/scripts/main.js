import * as THREE from './lib/three.js';
import { OrbitControls } from './lib/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,2000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera,renderer.domElement);
controls.update();

let stars,galaxy,planet1,planet2,planet3,clouds;

particles();
insertGeometry();
lighting();
animate();

//Add Particles 
function particles() {
    const starTexture = new THREE.TextureLoader().load('/Exam/assets/textures/star.png');

    let points = [];

    for (let i = 0; i < 600; i++) {
        let star = new THREE.Vector3(
        Math.random() * 1100 - 500,
        Math.random() * 1100 - 500,
        Math.random() * 1100 - 500
        );
        points.push(star);
    }

    const starGeometry = new THREE.BufferGeometry().setFromPoints(points);

    const starMaterial = new THREE.PointsMaterial({
        color:0xFFFFFF,
        map:starTexture
    });

    stars = new THREE.Points(starGeometry,starMaterial);
    scene.add(stars);
}

//Insert textures, geometries
function insertGeometry() {
    //Textures
    const space = new THREE.TextureLoader().load('/Exam/assets/textures/space.jpg');
    const planetTexture = new THREE.TextureLoader().load('/Exam/assets/textures/snowplanet.jpg'); 
    const cloudTexture = new THREE.TextureLoader().load('/Exam/assets/textures/clouds.jpg'); 
   
    //Geometries
    const spaceGeometry = new THREE.SphereGeometry(450,100);
    const spaceMaterial = new THREE.MeshBasicMaterial({color:0x00FFFF,map:space,side:THREE.BackSide});
    galaxy = new THREE.Mesh(spaceGeometry, spaceMaterial);
    scene.add(galaxy);

    const planet1Geometry = new THREE.SphereGeometry(100,100);
    const planet1Material = new THREE.MeshStandardMaterial({map:planetTexture});
    planet1 = new THREE.Mesh(planet1Geometry,planet1Material);
    planet1.position.set(150,0,0);
    scene.add(planet1);

    const planet2Geometry = new THREE.SphereGeometry(10,12);
    const planet2Material = new THREE.MeshStandardMaterial({map:planetTexture});
    planet2 = new THREE.Mesh(planet2Geometry,planet2Material);
    planet2.position.set(90, -5,-130);
    scene.add(planet2);

    const planet3Geometry = new THREE.SphereGeometry(20,30);
    const planet3Material = new THREE.MeshStandardMaterial({map:planetTexture});
    planet3 = new THREE.Mesh(planet3Geometry,planet3Material);
    planet3.position.set(-250,150,200);
    scene.add(planet3);

    const cloudGeometry = new THREE.SphereGeometry(100,100);
    const cloudMaterial = new THREE.MeshStandardMaterial({map:cloudTexture,transparent:true,opacity:0.4});
    clouds = new THREE.Mesh(cloudGeometry,cloudMaterial);
    clouds.position.set(150,0,0);
    scene.add(clouds);
}

//Insert lighting
function lighting() {
    const ambientLighting = new THREE.AmbientLight(0x0B5394,0.5);
    scene.add(ambientLighting);

    const directionalLighting = new THREE.DirectionalLight(0xffffff, 2);
    directionalLighting.position.set(0,250,250);
    scene.add(directionalLighting);

}
    camera.position.set(-25, 0,-220);
    camera.lookAt(40,0,10);

    function animate() { 
        requestAnimationFrame(animate);
        controls.update();
        renderer.render( scene, camera );
}
