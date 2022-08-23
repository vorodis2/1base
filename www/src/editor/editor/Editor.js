export class Editor  {
  	constructor(par,fun) {       
        this.type="Editor";

        var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param ;

        this._width=600;
        this._height=600;

        this.window=new DWindow(this.par.dCont,this.param.otstup,this.param.otstup,"Пока тут повисит")
        this.window.minimize=true
        this.window.hasMinimizeButton=false
        this.panel=new DPanel(this.window.content, this.param.otstup, this.param.otstup)
        this.panel.width=this._width
        this.panel.height=this._height

        this.window.width=this.panel.width+this.param.otstup*2;
        this.window.height=this.panel.height+this.param.otstup*2+32;

        this.chek=new DCheckBox(this.window, 500,0,"test")
        self.chek.visible=false;
        this.button=new DButton(this.window,200,0,"start cesium",function(){
            this.visible=false;
            self.window.minimize=false;
            self.chek.visible=true;
            main();

        })
        this.button.width=200
       
        function main(){
          // boundaries in WGS84 to help with syncing the renderers
            var minWGS84 = [115.23,39.55];
            var maxWGS84 = [116.23,41.55];
            //var cesiumContainer = document.getElementById("cesiumContainer");
           // var ThreeContainer = document.getElementById("ThreeContainer");

            var cesiumContainer= document.createElement('div');
            cesiumContainer.style.position = 'fixed';
            cesiumContainer.style.top = '0px';         
            cesiumContainer.style.left = '0px';
            cesiumContainer.style.width = self._width  + 'px';
            cesiumContainer.style.height = self._height  + 'px';
            self.panel.div.appendChild(cesiumContainer);

            var ThreeContainer= document.createElement('div');
            ThreeContainer.style.position = 'fixed';
            ThreeContainer.style.top = '0px';         
            ThreeContainer.style.left = '0px';
            ThreeContainer.style.width = self._width  + 'px';
            ThreeContainer.style.height = self._height  + 'px';
            ThreeContainer.style.pointerEvents = 'none';
            self.panel.div.appendChild(ThreeContainer);


            var _3Dobjects = []; //Could be any Three.js object mesh
            var three = {
                renderer: null,
                camera: null,
                scene: null
            };

            var cesium = {
                viewer: null
            };



            function initCesium(){
                Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTk4ODE3ZS0zNGI5LTQ2NjYtYWFmMi1mMjEwM2NhMTEwMmMiLCJpZCI6OTE2ODQsImlhdCI6MTY1MTE3MDMxNH0.pFrUc1_NUXivWboLf2nYKgjBzm2a7TaI9mvOC9OHXAE"
            
                cesium.viewer = new Cesium.Viewer(cesiumContainer,{
                    // useDefaultRenderLoop: false,
                    selectionIndicator : false,
                    homeButton:false,
                    sceneModePicker:false,
                    navigationHelpButton:false,
                    infoBox : false,
                    navigationHelpButton:false,
                    navigationInstructionsInitiallyVisible:false,
                    animation : false,
                    timeline : false,
                    fullscreenButton : false,
                    allowTextureFilterAnisotropic:false,
                    contextOptions:{
                    webgl: {
                    alpha: false,
                    antialias: true,
                    preserveDrawingBuffer : true,
                    failIfMajorPerformanceCaveat: false,
                    depth:true,
                    stencil:false,
                    anialias:false
                    },
                    },
                    targetFrameRate:60,
                    resolutionScale:0.1,
                    orderIndependentTranslucency : true,
                    imageryProvider : undefined,
                    baseLayerPicker : false,
                    geocoder : false,
                    automaticallyTrackDataSourceClocks: false,
                    dataSources: null,
                    clock: null
                });

                var center = Cesium.Cartesian3.fromDegrees(
                    (minWGS84[0] + maxWGS84[0]) / 2,
                    ((minWGS84[1] + maxWGS84[1]) / 2)-1,
                    200000
                );
                cesium.viewer.camera.flyTo({
                    destination : center,
                    orientation : {
                        heading : Cesium.Math.toRadians(0),
                        pitch : Cesium.Math.toRadians(-60),
                        roll : Cesium.Math.toRadians(0)
                    },
                    duration: 3
                });
            }

            function initThree(){
                var fov = 45;
                var width = window.innerWidth;
                var height = window.innerHeight;
                var aspect = width / height;
                var near = 1;
                var far = 10*1000*1000; // needs to be far to support Cesium's world-scale rendering

                three.scene = new THREE.Scene();
                three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                three.renderer = new THREE.WebGLRenderer({alpha: true});
                ThreeContainer.appendChild(three.renderer.domElement); 

                var group = new THREE.Object3D();           
                three.scene.add(group);
                //this.group.position.z=-333
                let geometry = new THREE.BoxGeometry( 1, 1, 1);            
                var r=3;
                var r1=200;
                for (var i = 0; i <212; i++) {
                    let cube = new THREE.Mesh( geometry );
                    cube.scale.set(r*Math.random()+1,r*Math.random()+1,r*Math.random()+1)
                    cube.position.set(r1*Math.random()-r1/2,r1*Math.random()-r1/2,r1*Math.random()-r1/2)
                    group.add(cube); 

                }
              

            }

            function _3DObject(){
              this.graphMesh = null; //Three.js 3DObject.mesh
              this.minWGS84 = null; //location bounding box
              this.maxWGS84 = null;
            }



            function init3DObject(){
              //Cesium entity
              var entity = {
                name : 'Polygon',
                polygon : {
                  hierarchy : Cesium.Cartesian3.fromDegreesArray([
                    minWGS84[0], minWGS84[1],
                    maxWGS84[0], minWGS84[1],
                    maxWGS84[0], maxWGS84[1],
                    minWGS84[0], maxWGS84[1],
                  ]),
                  material : Cesium.Color.RED.withAlpha(0.2)
                }
              };
              var Polygon = cesium.viewer.entities.add(entity);

              // Lathe geometry
              var doubleSideMaterial = new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
              });
              var segments = 10;
              var points = [];
              for ( var i = 0; i < segments; i ++ ) {
                  points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * segments + 5, ( i - 5 ) * 2 ) );
              }
              var geometry = new THREE.LatheGeometry( points );
              var latheMesh = new THREE.Mesh( geometry, doubleSideMaterial ) ;
              latheMesh.scale.set(1500,1500,1500); //scale object to be visible at planet scale
              latheMesh.position.z += 15000.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
              latheMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
              var latheMeshYup = new THREE.Group();
              latheMeshYup.add(latheMesh)
              three.scene.add(latheMeshYup); // don’t forget to add it to the Three.js scene manually

              //Assign Three.js object mesh to our object array
              var _3DOB = new _3DObject();
              _3DOB.threeMesh = latheMeshYup;
              _3DOB.graphMesh = latheMeshYup;
              _3DOB.minWGS84 = minWGS84;
              _3DOB.maxWGS84 = maxWGS84;
              _3Dobjects.push(_3DOB);

              // dodecahedron
              geometry = new THREE.DodecahedronGeometry();
              var dodecahedronMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()) ;
              dodecahedronMesh.scale.set(5000,5000,5000); //scale object to be visible at planet scale
              dodecahedronMesh.position.z += 15000.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
              dodecahedronMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
              var dodecahedronMeshYup = new THREE.Group();
              dodecahedronMeshYup.add(dodecahedronMesh)
              three.scene.add(dodecahedronMeshYup); // don’t forget to add it to the Three.js scene manually

              //Assign Three.js object mesh to our object array
              _3DOB = new _3DObject();
              _3DOB.threeMesh = dodecahedronMeshYup;
              _3DOB.graphMesh = dodecahedronMeshYup;
              _3DOB.minWGS84 = minWGS84;
              _3DOB.maxWGS84 = maxWGS84;
              _3Dobjects.push(_3DOB);
            }

            function loop(){
              requestAnimationFrame(loop);
              renderCesium();
              renderThreeObj();
            }

            function renderCesium(){
              cesium.viewer.render();
            }

            function renderThreeObj(){
              // register Three.js scene with Cesium
              three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
              three.camera.updateProjectionMatrix();
              if(self.chek.value==true){
                return
              }
              var cartToVec = function(cart){
                return new THREE.Vector3(cart.x, cart.y, cart.z);
              };

              // Configure Three.js meshes to stand against globe center position up direction
              for(var id in _3Dobjects){
                minWGS84 = _3Dobjects[id].minWGS84;
                maxWGS84 = _3Dobjects[id].maxWGS84;
                // convert lat/long center position to Cartesian3
                var center = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2);

                // get forward direction for orienting model
                var centerHigh = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2,1);

                // use direction from bottom left to top left as up-vector
                var bottomLeft  = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
                var topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
                var latDir  = new THREE.Vector3().subVectors(bottomLeft,topLeft ).normalize();

                // configure entity position and orientation
                //trace(id,_3Dobjects[id].graphMesh)
                //trace(center)
                _3Dobjects[id].graphMesh.position.copy(center);
                _3Dobjects[id].graphMesh.lookAt(centerHigh);
                _3Dobjects[id].graphMesh.up.copy(latDir);
              }

              // Clone Cesium Camera projection position so the
              // Three.js Object will appear to be at the same place as above the Cesium Globe
              three.camera.matrixAutoUpdate = false;
              var cvm = cesium.viewer.camera.viewMatrix;
              var civm = cesium.viewer.camera.inverseViewMatrix;
              three.camera.matrixWorld.set(
                  civm[0], civm[4], civm[8 ], civm[12],
                  civm[1], civm[5], civm[9 ], civm[13],
                  civm[2], civm[6], civm[10], civm[14],
                  civm[3], civm[7], civm[11], civm[15]
              );
              three.camera.matrixWorldInverse.set(
                  cvm[0], cvm[4], cvm[8 ], cvm[12],
                  cvm[1], cvm[5], cvm[9 ], cvm[13],
                  cvm[2], cvm[6], cvm[10], cvm[14],
                  cvm[3], cvm[7], cvm[11], cvm[15]
              );
              three.camera.lookAt(new THREE.Vector3(0,0,0));

              var width = ThreeContainer.clientWidth;
              var height = ThreeContainer.clientHeight;
              var aspect = width / height;
              three.camera.aspect = aspect;
              three.camera.updateProjectionMatrix();

              three.renderer.setSize(width, height);
              three.renderer.render(three.scene, three.camera);
            }

            initCesium(); // Initialize Cesium renderer
            initThree(); // Initialize Three.js renderer
            init3DObject(); // Initialize Three.js object mesh with Cesium Cartesian coordinate system
            loop(); // Looping renderer
        }

        


       /* var minWGS84 = [115.23,39.55];
        var maxWGS84 = [116.23,41.55];
 
        function _3DObject(){
            //THREEJS 3DObject.mesh
            this.threeMesh = null;
            //location bounding box
            this.minWGS84 = null;
            this.maxWGS84 = null;
        }



        this.cViewer

        this.init = function () {        
            ////gis lib
            this.contHTML= document.createElement('div');
            this.contHTML.style.position = 'fixed';
            this.contHTML.style.top = '0px';         
            this.contHTML.style.left = '0px';
            this.contHTML.style.width = this._width  + 'px';
            this.contHTML.style.height = this._height  + 'px';
            this.panel.div.appendChild(this.contHTML);

            Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTk4ODE3ZS0zNGI5LTQ2NjYtYWFmMi1mMjEwM2NhMTEwMmMiLCJpZCI6OTE2ODQsImlhdCI6MTY1MTE3MDMxNH0.pFrUc1_NUXivWboLf2nYKgjBzm2a7TaI9mvOC9OHXAE"
            
            this.cViewer = new Cesium.Viewer(this.contHTML, {
                terrainProvider: Cesium.createWorldTerrain(),
                  // useDefaultRenderLoop: false,
                   selectionIndicator : false,
                   homeButton:false,
                   sceneModePicker:false,
                   navigationHelpButton:false,
                   infoBox : false,
                   navigationHelpButton:false,
                   navigationInstructionsInitiallyVisible:false,
                   animation : false,
                   timeline : false,
                   fullscreenButton : false,
                   allowTextureFilterAnisotropic:false,
                  contextOptions:{
                    webgl: {
                      alpha: false,
                      antialias: true,
                      preserveDrawingBuffer : true,
                      failIfMajorPerformanceCaveat: false,
                      depth:true,
                      stencil:false,
                      anialias:false
                    },
                  },
                   targetFrameRate:60,
                   resolutionScale:0.1,
                   orderIndependentTranslucency : true,
                   imageryProvider : undefined,
                   baseLayerPicker : false,
                   geocoder : false,
                   automaticallyTrackDataSourceClocks: false,
                   dataSources: null,
                   clock: null
            });



            ////threeInit
            this.contHTMLThree= document.createElement('div');
            this.contHTMLThree.style.position = 'fixed';
            this.contHTMLThree.style.top = '0px';         
            this.contHTMLThree.style.left = '0px';
            this.contHTMLThree.style.width = this._width  + 'px';
            this.contHTMLThree.style.height = this._height  + 'px';
            this.contHTMLThree.style.pointerEvents = 'none';
            this.panel.div.appendChild(this.contHTMLThree);

            this.camera;
            this.scene = new THREE.Scene();
            
            var _alpha  =true  
            this.color=0xffffff
            this.camera = new THREE.PerspectiveCamera(45, this._width / this._height, 1, 10*100*1000);
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            this.renderer.shadowMap.enabled = true;
            this.renderer.setSize(this._width, this._height);
            this.renderer.setClearColor(0xffffff, 0);
            

            this.contHTMLThree.appendChild(this.renderer.domElement);          
            
            this.group = new THREE.Object3D();           
            this.scene.add(this.group);
            this.group.position.z=-333
            let geometry = new THREE.BoxGeometry( 1, 1, 1);            
            var r=3;
            var r1=200;
            for (var i = 0; i <212; i++) {
                let cube = new THREE.Mesh( geometry );
                cube.scale.set(r*Math.random()+1,r*Math.random()+1,r*Math.random()+1)
                cube.position.set(r1*Math.random()-r1/2,r1*Math.random()-r1/2,r1*Math.random()-r1/2)
                this.group.add(cube); 

            }
            this.renderer.render(this.scene, this.camera);
         

        }

        this.init()
        var sah=0
        var _fov
        this.upThree = function () {
            
            this.group.rotation.y+=0.001

            _fov = Cesium.Math.toDegrees(this.cViewer.camera.frustum.fovy)
            this.camera.fov = _fov // ThreeJS FOV is vertical
            this.camera.updateProjectionMatrix();

            this.camera.matrixAutoUpdate = false;
            var cvm = this.cViewer.camera.viewMatrix;
            var civm = this.cViewer.camera.inverseViewMatrix;
            this.camera.matrixWorld.set(
                civm[0], civm[4], civm[8 ], civm[12],
                civm[1], civm[5], civm[9 ], civm[13],
                civm[2], civm[6], civm[10], civm[14],
                civm[3], civm[7], civm[11], civm[15]
              );
            this.camera.matrixWorldInverse.set(
                cvm[0], cvm[4], cvm[8 ], cvm[12],
                cvm[1], cvm[5], cvm[9 ], cvm[13],
                cvm[2], cvm[6], cvm[10], cvm[14],
                cvm[3], cvm[7], cvm[11], cvm[15]
            );
            this.camera.lookAt(new THREE.Vector3(0,0,0));
            this.camera.updateProjectionMatrix();


            var width = this.contHTMLThree.clientWidth;
            var height = this.contHTMLThree.clientHeight;
            var aspect = width / height;
            this.camera.aspect = aspect;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(width, height);



            this.renderer.render(this.scene, this.camera);

            sah++
            if(sah==70){
               sah=0;
               //trace(cvm) 
            }

            //trace(">>",_fov)
            //three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
            //three.camera.updateProjectionMatrix();
            //this.renderer.render(this.scene, this.camera);
        }
 */

		this.update = function () {
            //this.upThree();

            
		}


        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w = _w;
                h = _h;
                s = _s;   
            }    
  		}
       
  	}

   /* set indexStep(value) {       
        if (this._indexStep != value) { 
            this._indexStep = value;
            this.menu.indexStep=this._indexStep;
            this.mozg.indexStep=this._indexStep;
            this.fManager.index=this._indexStep;
        }
    }
    get indexStep() {
        return this._indexStep;
    }*/
}