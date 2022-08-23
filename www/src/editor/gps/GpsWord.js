




/*
import { Scane3d } from './veiw/Scane3d.js';

import { Mozg } from './mozg/Mozg.js';*/

//import { ViweDebug } from './ViweDebug.js';

import { Controler } from './Controler.js';
import { Utility,Menedjer } from './Utility.js';
import { Model } from './path/Model.js';
import { Point3D } from './path/Point3D.js';

import { PGPS } from './PGPS.js';

export class GpsWord  {
  	constructor(par, fun) {  		
  		this.type="GpsWord";
  		var self=this; 
        this.par=par;
        this.fun=fun;
        this._activeObject=null;
        window.gpsWord=this;
        window.pgjs=new PGPS(function(){
            for (var i = self.hronBig.aModel.length - 1; i >= 0; i--) {                
                self.hronBig.aModel[i].drahSob("PGPS",null,null)
            }
            visi3D.intRend=1
        });

        this.menuGPS=undefined;
        
       /*this.viweDebug=new ViweDebug(this,function(s,p,p1){

        })*/


        this.cont3d=new THREE.Object3D();
        this.par.content3d.add(this.cont3d);

        this.content3d=new THREE.Object3D();
        this.cont3d.add(this.content3d);

        this.hronBig=new Hron(this,function(s,p,p1){

        });

        window.utility = this.utility=new Utility(this,function(s,p,p1){

        });
        
        window.controler = this.controler =new Controler(this,function(s,p,p1){

        });

        this.menedjer=new Menedjer(this,function(s,p,p1){

        });
        
        
        var rr=26350000
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry( rr, 128, 128 ), window.pm.matDop.getIDObj(9))        
        this.cont3d.add(this.mesh);


        //this.mesh.scale.set(rr,rr,rr);/**/

       /* var group = new THREE.Object3D();           
        this.cont3d.add(group);
        //this.group.position.z=-333
        let geometry = new THREE.BoxGeometry( 1000, 1000, 1000);            
        var r=2;
        var r1=111006;
        for (var i = 0; i <1012; i++) {
            let cube = new THREE.Mesh( geometry);            
            cube.position.set(r1*Math.random()-r1/2,r1*Math.random()-r1/2,r1*Math.random()-r1/2)
            group.add(cube); 

        }*/



        this.setObjPath = function (o, str) {
            
            let g=this.hronBig.getModel();
            
            g.path=str;

            g.setObject(o);

            g.life=true;
            
            /*this.utility.korektPosit(g);            
            this.menuGPS.udDrag();
            this.activeObject=g;*/
            return g 
        }





		this.update = function () {
            //this.view.upDate()
			/*this.visi3D.upDate();
            this.editor.update(); */  

           // this.viweDebug.update() 

           
		}



        this.render=function(){
            visi3D.intRend=1;
        }    


        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w = _w;
                h = _h;
                s = _s;   
            }
           // this.viweDebug.sizeWindow(w,h,s)  			      
  		}


        
  	}

    set activeObject(value) {       
        if (this._activeObject != value) {           
            this._activeObject = value;

            if(this._activeObject)
            for (var i = this.hronBig.aModel.length - 1; i >= 0; i--) {
                if(this.hronBig.aModel[i].uuid==this._activeObject.uuid){
                  
                    this.hronBig.aModel[i].activeModel=true
                    
                }else{
                    this.hronBig.aModel[i].activeModel=false
                }
            }

            this.menuGPS.activeObject=value;
        }
    }
    get activeObject() {
        return this._activeObject;
    }    
}






export class Hron  {
    constructor(par, fun) {         
        this.type="Hron";
        var self=this; 
        this.par=par;
        this.fun=fun;

        this.material1 = window.pm.matDop.getIDObj(1)
        this.material2 = window.pm.matDop.getIDObj(2)


        this.cylinderGeometry = new THREE.CylinderGeometry( 1,1,1,22)
        this.boxGeometry = new THREE.BoxGeometry( 1,1,1)
        this.sphereGeometry = new THREE.SphereGeometry( 0.5,32, 32);

        this.aMat=[
            window.pm.matDop.getIDObj(1),//пасивная модель
            window.pm.matDop.getIDObj(2),//активная модель, но пасивная часть
            window.pm.matDop.getIDObj(3),//навенение
            window.pm.matDop.getIDObj(4),//активно
        ]

        this.aModel=[]; 
        this.getModel=function(){

            for (var i = 0; i < this.aModel.length; i++) {
                if(this.aModel[i].life==false){ 
                    this.aModel[i].life = true; 
                    this.aModel.push(this.aModel[i]);                                 
                    return this.aModel[i]
                }
            } 
            let g= new Model(this.par, this.par.sob);
            g.idArr=this.aModel.length;

            this.aModel.push(g);
            return g;
        }

        


        this.aPoint=[]; 
        this.getPoint=function(){
            for (var i = 0; i < this.aPoint.length; i++) {
                if(this.aPoint[i].life==false){                    
                    return this.aPoint[i]
                }
            } 
            let g= new Point3D(this.par, this.par.sob);
            g.idArrCesh=this.aPoint.length;
            this.aPoint.push(g);            
            return g;
        }


        this.getModelToPath=function(s){
            for (var i = 0; i < this.aModel.length; i++) {
                if(this.aModel[i].path==s) return this.aModel[i]
            }
            return null
        }


    }
}



// import { PlaneXZ } from './PlaneXZ.js';
// export class Surface  {
//     constructor(par, fun) {         
//         this.type="Surface";
//         var self=this; 
//         this.par=par;
//         this.fun=fun;
//         this.content3d=new THREE.Object3D();
//         this.par.content3d.add(this.content3d)
//         this.object=null;
//         this._life=false;


//         this.lineBasicMaterial = new THREE.LineBasicMaterial( { color: 0x68ace2, linewidth: 10})
//         this.planeXZ=new PlaneXZ();
//         this.lineSegments = new THREE.LineSegments(
//             this.planeXZ,
//             this.lineBasicMaterial
//         )
//        // this.content3d.add(this.lineSegments);


//         this.clear=function(){
//             for (var i = 0; i < this.array.length; i++) {
//                 this.array[i].clear();
//             }
//             this.array.length=0
//         }

//         this.array=[]


//         this.draw = function () {
//             this.planeXZ.clear(); 
//             if(this.array.length>=2){
//                 for (var i = 0; i < this.array.length-1; i++) {
//                     this.planeXZ.addLine(                
//                         this.array[i].position,
//                         this.array[i+1].position
//                     )
//                 }
//             }
//             this.planeXZ.computeBoundingBox();
//             this.planeXZ.computeBoundingSphere();
//             this.planeXZ.upDate();

//          
//             var s='';
//             for (var i = 0; i < this.array.length; i++) {
//                 if(i==0)s+=this.array[i].position.x+" "+this.array[i].position.y+" "+this.array[i].position.z;
//                 else s+=" "+this.array[i].position.x+" "+this.array[i].position.y+" "+this.array[i].position.z;
//             }
//           
//             this.object.SourceData.Breaklines.Breakline.PntList3D=s;

//         }

//         this.op
//         this.setObject=function(o){
//             this.clear();
//             this.object=o;

//             this.op=this.object.SourceData.Breaklines.Breakline.PntList3D;
            

            
//             this.start()
            
//         }
//         this.sob=function(s,p,p1){
//             if(s=="dragPoint"){
//                 self.draw();
//                 self.fun(s,p) 
//                 gpsWord.render(); 
//             }
//         }


//         this.start=function(){ 
//             var a=this.op.split(" ");
//             for (var i = 0; i < a.length; i++) {
//                 a[i]*=1
//             }

//             for (var i = 0; i < a.length; i+=3) {
//                 let p=window.gpsWord.hronBig.getPoint();                
//                 p.position.set(a[i],a[i+1],a[i+2])
//                 p.setPar(this, this.sob);
//                 p.life=true
//                 p.idArr=this.array.length
//                 this.array.push(p)
//             }
//             this.draw();            
//         }
//     }
// }




// export class Point3D  {
//     constructor() {         
//         this.type="Point3D";
//         var self=this;
//         this.par=null;
//         this.fun=null; 

//         this._life=false;
//         this._active=false;
//         this.idArrCesh=-1;
//         this.idArr=-1;

//         this._radius=0.5

//         this.content3d=new THREE.Object3D();
//         this.position = new PositionFun(0,0,0,function(){            
//             var s=1;
//             self.content3d.position.x=self.position.x*s;
//             self.content3d.position.y=self.position.y*s;
//             self.content3d.position.z=self.position.z*s;
//             if(self.fun)self.fun("dragPoint", self)                       
//         });

//         this.mesh=new THREE.Mesh(window.gpsWord.hronBig.sphereGeometry, window.gpsWord.hronBig.material1)        
//         this.content3d.add(this.mesh);
//         this.mesh.name="PointSten";
//         this.mesh.scale.set(this._radius,this._radius,this._radius);
//         this.mesh.parObj=this;



//         this.setPar=function(par, fun){ 
//             this.par=par;
//             this.fun=fun;  
//             this.par.content3d.add(this.content3d);
//         }
//     }

//     set active(value) {       
//         if (this._active != value) {           
//             this._active = value;
//             if(this._active){
//                 this.mesh.material=window.gpsWord.hronBig.material2
//             }else{
//                 this.mesh.material=window.gpsWord.hronBig.material1 
//             }
//         }
//     }
//     get active() {
//         return this._active;
//     }


//     set life(value) {       
//         if (this._life != value) {           
//             this._life = value;
//             if(this._life){
              
//                 visi3D.addChildMouse(this.mesh)
//             }else{
              
//                 visi3D.removeChildMouse(this.mesh)
//             }
//         }
//     }
//     get life() {
//         return this._life;
//     }

//     set radius(value) {       
//         if (this._radius != value) {           
//             this._radius = value;
//             this.mesh.scale.set(this._radius,this._radius,this._radius);
//             gpsWord.render(); 
//         }
//     }
//     get radius() {
//         return this._radius;
//     }

// }






// export class WordSurface  {
//     constructor(par, fun) {         
//         this.type="WordSurface";
//         var self=this; 
//         this.par=par;
//         this.fun=fun;
//         this.content3d=new THREE.Object3D();
//         this.par.content3d.add(this.content3d)
//         this.object=null;
//         this._life=false;
//         this._name=null;

//         this.clear=function(){

//         }

//         this.sob=function(s,p,p1){
//             if(s=="dragPoint"){                
//                 self.fun(s,p); 
//             }
//         }       
        
//         this.array=[]; 
//         this.getCreat=function(){
//             for (var i = 0; i < this.array.length; i++) {
//                 if(this.array[i].life==false){                    
//                     return this.array[i]
//                 }
//             } 
//             let g= new Surface(this, this.sob);
//             this.array.idArr=this.array.length;
//             this.array.push(g);            
//             return g;
//         }



//         this.setObject=function(o){
//             this.clear();
//             this.object=o;
//             this._name=null;
//             if(this.object["@name"])this.name=this.object["@name"]; 
//             let surface = this.getCreat();
//             surface.setObject(this.object["Surface"]);            
//         }
//     }

//     set name(value) {       
//         if (this._name != value) {           
//             this._name = value;
//             this.object["@name"] = value;
//         }
//     }
//     get name() {
//         return this._name;
//     }
// }



// export class Model {
//     constructor(par, fun) {         
//         this.type="Model";
//         var self=this; 
//         this.par=par;
//         this.fun=fun;
//         this.content3d=new THREE.Object3D();
//         this.object=null
//         this._life=false;

//         this.boolDrag = false;
//         this.menu=undefined;


//         this.wordSurface= new WordSurface(this, function(s,p,p1){
//             if(s=="dragPoint"){ 
//                 self.boolDrag = true;
//                 self.menu.boolDrag = true; 
//             }
//         })


//         this.clear=function(){            
//             this.life = false;
//             this.par.menuGPS.udDrag();
//             visi3D.intRend=1
//         }


//         this.setObject=function(o){
//             this.clear();
//             this.object=o;
//             if(this.object["LandXML"] && this.object["LandXML"]["Surfaces"]){
//                 this.wordSurface.setObject(this.object["LandXML"]["Surfaces"])
//             }            
//         }
//     }

//     set life(value) {       
//         if (this._life != value) { 
//             this._life = value;           
//             if(this._life){
//                 this.par.content3d.add(this.content3d)
//             }else{
//                 this.par.content3d.remove(this.content3d)
//             }
//         }
//     }
//     get life() {
//         return this._life;
//     }
// }










// /**
//  * Описывает точку.
//  * @class
//  * @param [_x=0] {number} кордината
//  * @param [_y=0] {number} кордината
//  * @param [_z=0] {number} кордината
//  */
// export function PositionFun (_x, _y, _z, _fun) {
//     /** {number} кордината */
//     this._x = _x || 0;
//     /** {number} кордината */
//     this._y = _y || 0;
//     /** {number} кордината */
//     this._z = typeof _z !== 'function' ? (_z || 0) : 0;

//     this.fun = typeof _z === 'function' ? _z : _fun;

//     this.set = function (_x, _y, _z) {
//         this._x = _x || 0;
//         this._y = _y || 0;
//         this._z = _z || 0;
//         if (this.fun) this.fun();

//     };
//     this.setPoint = function (p) {
//         this._x = p.x;
//         this._y = p.y;
//         this._z = p.z;
//         if (this.fun) this.fun();
//     };

//     this.getObj = function () {
//         var o = {};
//         o.x = this._x;
//         o.y = this._y;
//         o.z = this._z;
//         return o;
//     };

//     this.copy = function () {
//         return new PositionFun(this._x, this._y, this._z);
//     };
// }
// PositionFun.prototype = {
//     set x (v) {
//         // if(this._x==v)return;
//         this._x = v;
//         if (this.fun) this.fun();
//     },
//     get x () {
//         return this._x;
//     },

//     set y (v) {
//         // if(this._y==v)return;
//         this._y = v;
//         if (this.fun) this.fun();
//     },
//     get y () {
//         return this._y;
//     },
//     set z (v) {
//         // if(this._z==v)return;
//         this._z = v;
//         if (this.fun) this.fun();
//     },
//     get z () {
//         return this._z;
//     }
// };
