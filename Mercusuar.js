//import *as THREE from  "./three.js-master/build/three.module.js";
import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";
let scene, camera, renderer, controls;

const createPlane = (width, height)=>{
let geometry = new THREE.PlaneGeometry(width, height);
let material = new THREE.MeshStandardMaterial({ color: "#EFDBB9", side: THREE.DoubleSide});
let plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
return plane;
}

const createBox = (width, height, depth) =>{
    let geometry = new THREE.BoxGeometry(width, height, depth);
    let material = new THREE.MeshStandardMaterial({color : "#888888"});
    let box = new THREE.Mesh(geometry, material);
    box.castShadow = true;
    return box;
}

const createCylinder = (color,topRad, botRad, height, rSeg, hSeg, OpenEnded)=>{
let geometry = new THREE.CylinderGeometry(topRad, botRad, height, rSeg, hSeg, OpenEnded);
let material = new THREE.MeshStandardMaterial({color: color});
let cylinder = new THREE.Mesh(geometry, material);
cylinder.castShadow = true;
return cylinder;
}

const createFence = (color,topRad, botRad, height, rSeg, hSeg, OpenEnded)=>{
    let geometry = new THREE.CylinderGeometry(topRad, botRad, height, rSeg, hSeg, OpenEnded);
    let material = new THREE.MeshStandardMaterial({color:color, wireframe : true, roughness: 0.3, metalness: 0.7});
    let Fencen = new THREE.Mesh(geometry, material);
    Fencen.castShadow = true;
    return Fencen;
}

const createCone = (radius, h, segRa, segH, openEnded)=>{
    let geometry = new THREE.ConeGeometry(radius, h, segRa, segH, openEnded);
    let material = new THREE.MeshStandardMaterial({color: "#AC443C", roughness:0.6, metalness:1});
    let Cone = new THREE.Mesh(geometry,material);
    Cone.castShadow = true;
    return Cone;
}

const createSphere = (radius)=>{
    let geometry = new THREE.SphereGeometry(0.5);
    let material = new THREE.MeshStandardMaterial({color:"#AC443C" ,roughness:0.6, metalness:1});
    let sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    return sphere;
}
const createAmbientLight = (intensity) =>{
    const light = new THREE.AmbientLight("#ffffff", intensity);
    return light;
}

const createPointLight = (color, intesity,distance, decay)=>{
    let light = new THREE.PointLight(color,intesity,distance, decay);
    light.castShadow = true;
    return light;
}

let init = ()=>{
scene = new THREE.Scene();

let fov = 75;
let w = window.innerWidth;
let h = window.innerHeight;
let aspect = w/h;
let near = 0.1;
let far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0,20,45);

renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.setClearColor("#000000");



controls = new OrbitControls(camera, renderer.domElement);

//Ground===
let Ground = createPlane(100,100);
Ground.position.set(0, -1,0);
Ground.rotation.x = Math.PI/2;

 //Floor
 let Floor = createBox(9 ,2, 9);
 Floor.position.set(0,0,0);

 //Body
 let Body = createCylinder("#ffffff",2.6,4,20,100,1,false);
 Body.position.set(0,10,0);

 //Neck
 let Neck = createCylinder("#AC443C",3.6,3.6,0.5,20,1,false);
 Neck.position.set(0,20,0);

 //Fence
 let Fencen = createFence("#5C0000", 3.2,3.2,1,10,1,true);
 Fencen.position.set(0,21,0);

 //Head
 let Head = createCylinder("#ffffff", 2.2,2.2,3,30,1,false);
 Head.position.set(0,22,0);

 //Roof
 let Roof = createCone(3.5,3.5,100,1,1,false);
 Roof.position.set(0, 25, 0);

 //Top Part
 let Top = createSphere(0.5);
 Top.position.set(0,26.5,0);
 let groundObj = [Ground,Floor, Body, Neck,
    Fencen,Head, Roof, Top];
 groundObj.forEach(obj=>{
    scene.add(obj);
 });

 //light
 let AmbientLight = createAmbientLight(0.2);

 //pointLight
 let    PointLight = createPointLight("#ffffff",3.2,1000,0);
 PointLight.position.set(80,100,100);
//  let PointLightHelper = new THREE.PointLightHelper(SpotLight);
 let lightObj = [AmbientLight, PointLight];

 lightObj.forEach(obj=>{
    scene.add(obj);
 });
 
};

let render = ()=>{
    //Shadow
    renderer.shadowMap.enabled = true;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
    controls.update();
};

window.onload =()=>{
    init();
    render();
};

window.onresize=()=>{
    let w = window.innerWidth;
    let h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect =w/h;
    camera.updateProjectionMatrix();
};