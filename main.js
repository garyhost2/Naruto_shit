import * as THREE from 'three'
import anime from 'animejs'
import { lights,Controls,spot,spear,createLight,rotate } from './lights';
import { add,delay,lay,visible,last } from './extra';
import { but } from './final';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 10, 2000 );
camera.position.setX(0);
camera.position.setY(10)
camera.position.setZ(-140);
const renderer = new THREE.WebGLRenderer({antialias: true,
canvas: document.querySelector('#bg')
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const sper=spear();
scene.add(sper);
const geomentry =new THREE.TorusGeometry(25,4,26,29,10)
const material=new THREE.MeshPhongMaterial({color: 0x393737 ,emissive: 0x150306,transparent:true,shininess:10});
const torus=new THREE.Mesh(geomentry,material);
torus.castShadow=true;
torus.layers.set(0);
const clock = new THREE.Clock();
scene.add(torus);
const light=spot();
light.target=torus;
scene.add(light);
scene.add(light.target)
const control=Controls(camera,renderer);
const game=add(scene);
const ligh=lights();
const img=new THREE.TextureLoader().load('./images/img2.jpeg');
let t=0;
var frame = 0,
maxFrame = 500,
lt = new Date(),
fps = 24;
const raycaster = new THREE.Raycaster();
const lighet=lay(raycaster,torus,camera,scene,control);
const butr=document.getElementById('but');
butr.addEventListener('click',function (){
  but(lighet,sper,butr,nw);
})
const nw=document.querySelector('.letter');
let theme = document.getElementsByTagName('link')[1];
const revo=createLight(0xF4A50A);
revo.position.set(0,0,10);
revo.scale.set(200,200,200);
revo.intensity=12;
scene.add(revo);
let c=0,d=0;
let aa=document.querySelector('.sidemain');
let bb=document.querySelector('.first');
bb.addEventListener('click',ch);
function ch(){
 visible(revo,scene,light,ligh,bb,aa,img);
}
function ani(){
  const id=requestAnimationFrame(ani);
      if(camera.position.z>-130){
          c=delay(c,bb);
      }
        if(camera.position.z>-100){
        if(d==0){
          butr.style.visibility=  'visible';
          d=d+1;
          anime({
        targets: '#but',
        translateX:function(el, i) {
          return 500 + (90 * i);
        },
         translateY: function(el, i) {
          return -120 - (100 * i);
        },
        scale: function(el, i, l) {
          return (1 - i) + 0.5;
        },
        duration: function() { return anime.random(1200, 1800); },
        delay: function() { return anime.random(0, 400); },
        direction: 'alternate',
        loop: false
      });
        }
      } 
      let time = performance.now() * 0.001;
      const timer = 0.0001 * Date.now();
      for ( let i = 0, il = game.length; i < il; i ++ ) {
					const sphere = game[ i ];
					sphere.position.x = -90 * Math.cos( timer + i * 1.1);
				sphere.position.y = 44 * Math.sin( timer + i );
				}
       var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias=1 - Math.abs(0.5 - per) / 0.5;
    rotate(torus,revo,time)
time+=10000;
  sper.position.z-=0.8;
   if(camera.position.z>-6){
     last(control,torus,ligh,light,id,theme);
    }
  control.update();
render();
 if (secs > 1 / fps) {
            light.target.position.set(-1 * 2 * bias, 0, 0);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame = frame % maxFrame;
            lt = now;
        }
}
function render(){
    renderer.render(scene, camera)
}
ani();


// ===== Webcam button logic =====
document.addEventListener("DOMContentLoaded", () => {
  
  const openCam = document.getElementById("open-cam");
  const closeCam = document.getElementById("close-cam");
  const camModal = document.getElementById("cam-modal");
  const camStream = document.getElementById("cam-stream");

  openCam.onclick = () => {
    camModal.style.display = "block";
    camStream.src = "http://localhost:5000/video_feed?" + new Date().getTime();
  };

  closeCam.onclick = () => {
    camModal.style.display = "none";
    camStream.src = "";
  };

});

