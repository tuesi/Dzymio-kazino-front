import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CoinPosObject } from 'src/app/objects/coinPosObject';
import { BackendService } from 'src/app/services/backend/backend.service';
import * as THREE from "three";
import { Quaternion, Vector3 } from 'three';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit, AfterViewInit {

  animate = false;

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input() public rotationSpeedX: number = 0.002;
  @Input() public rotationSpeedY: number = 0.005;
  @Input() public size: number = 200;

  //* Stage Properties
  @Input() public cameraZ: number = 250;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlance: number = 1;
  @Input('farClipping') public farClippingPlance: number = 1000;

  private camera!: THREE.PerspectiveCamera;
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial();

  private coin: THREE.Mesh;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  rotationNumber = 0;
  sideNumber = 1;

  coinPos: CoinPosObject;


  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('coinPos').subscribe(data => {
      this.coinPos = data as CoinPosObject;
      this.animateCoin(this.coinPos.rotation, this.coinPos.positionZ);
    });
  }

  ngAfterViewInit(): void {
    //this.createScene();
    //this.startRenderingLoop();
    this.renderExample();
  }


  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderExample() {
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color('white');
    //const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let aspectRatio = this.getAspectRatio();
    const camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlance,
      this.farClippingPlance
    );
    camera.position.z = this.cameraZ;
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setPixelRatio(2);
    renderer.setPixelRatio(devicePixelRatio * 2);
    renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    //document.body.appendChild(renderer.domElement);
    const sideTexture = new THREE.TextureLoader().load('../../../assets/side.png');
    const headTexture = new THREE.TextureLoader().load('../../../assets/coin-head.png');
    const tailTexture = new THREE.TextureLoader().load('../../../assets/coin-tail.png');
    const geometry = new THREE.CylinderGeometry(1, 1, 0.4, 100);
    const sideMat = new THREE.MeshLambertMaterial({ map: sideTexture });
    const headMat = new THREE.MeshLambertMaterial({ map: headTexture });
    const tailMat = new THREE.MeshLambertMaterial({ map: tailTexture });
    const materials = [
      sideMat,
      headMat,
      tailMat
    ]
    const light = new THREE.AmbientLight(0xffffff, 0.49);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 80);
    directionalLight.castShadow = true
    scene.add(directionalLight);
    scene.add(light);
    //Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 512; // default
    directionalLight.shadow.mapSize.height = 512; // default
    directionalLight.shadow.camera.near = 0.5; // default
    directionalLight.shadow.camera.far = 500; // default
    this.coin = new THREE.Mesh(geometry, materials);
    this.coin.rotation.x = 1.55;
    this.coin.position.z = 1;
    this.coin.translateY(1);
    this.coin.castShadow = true;
    this.coin.receiveShadow = false;
    scene.add(this.coin);
    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry(4, 4);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x58c9fa })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.castShadow = false;
    scene.add(plane);
    //scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));
    const animate = () => {
      requestAnimationFrame(animate);
      //console.log(coin.rotation.x);
      if (this.animate) {
        this.coin.rotation.x += 0.1;
        if (this.coin.position.z < 100 && this.coin.rotation.x < this.rotationNumber) {
          //coin.scale.x += 0.01;
          //coin.scale.z += 0.01;
          this.coin.position.set(0, 0, this.coin.position.z + 0.5);
        } else if (this.coin.position.z > 1) {
          //coin.scale.x -= 0.01;
          //coin.scale.z -= 0.01;
          this.coin.position.set(0, 0, this.coin.position.z - 0.5);
        }
        if (this.coin.position.z <= 1) {
          if (this.sideNumber == 1) {
            this.coin.rotation.x = 1.55;
          } else {
            this.coin.rotation.x = 4.7;
          }
          this.animate = false;
        }
      }
      //coin.rotation.y += 0.01;
      //coin.rotation.z += 0.01;

      renderer.render(scene, camera);
    };
    //camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
  }

  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.coin);
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlance,
      this.farClippingPlance
    );
    this.camera.position.z = this.cameraZ;
  }

  private animateCoin(rotation: number, positionZ: number) {
    this.coin.rotation.x = rotation;
    // this.coin.position.z = positionZ;
    this.coin.position.lerp(new Vector3(this.coin.position.x, this.coin.position.y, positionZ), 0.1);
  }

  private startRenderingLoop() {
    //* Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CoinComponent = this;
    (function render() {
      requestAnimationFrame(render);
      //component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  rollCoin() {
    this.coin.rotation.x = 1.55;
    this.coin.position.z = 1;
    this.coin.translateY(1);
    this.sideNumber = Math.floor(Math.random() * 2) + 1;
    //15.6 blue z= 100
    //20.3 yellow
    if (this.sideNumber == 1) {
      this.rotationNumber = 17.2;
    } else {
      this.rotationNumber = 15.6;
    }
    console.log(this.sideNumber);
    this.animate = true;
  }

  // const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.body.appendChild(renderer.domElement);
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);
  //   const animate = function () {
  //     requestAnimationFrame(animate);

  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;

  //     renderer.render(scene, camera);
  //   };
  //   camera.position.z = 5;
  //   renderer.render(scene, camera);
  //   animate();

}
