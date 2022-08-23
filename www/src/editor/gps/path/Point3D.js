

//import { PositionFun } from './PositionFun.js';
import { Base } from './Base.js';
export class Point3D extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="Point3D";
        var self=this;

        this.arrBut=[
            {id:10, type:"button", name:"kill"},
            {id:11, type:"button", name:"copy"},
        ]       
       
        this._addPoint=undefined;
        this._addPoint1=undefined;


        this._radius=pgjs.rPoint;



        this.funPozitionLoc=function(){
            var s=1; 

            self.content3d.position.x=self.position.x;
            self.content3d.position.y=self.position.y;
            self.content3d.position.z=self.position.z;

            //if(this._addPoint){
                this.dragCent()
            //}
            if(this._addPoint1)this._addPoint1.dragCent();


            if(self.fun)self.fun("dragPoint", self);
        }




        this.mesh=new THREE.Mesh(window.gpsWord.hronBig.sphereGeometry, window.gpsWord.hronBig.material1)        
        this.content3d.add(this.mesh);
        this.mesh.name="PointSten";
        this.mesh.scale.set(this._radius,this._radius,this._radius);
        this.mesh.parObj=this;


        this.cont3d=undefined;
        this.initap=function(){
            if(this.cont3d!=undefined)return;
            this.cont3d = new THREE.Object3D();
            this.content3d.add(this.cont3d);            
            this.mesh1=new THREE.Mesh(window.gpsWord.hronBig.cylinderGeometry, window.gpsWord.hronBig.material1)        
            this.cont3d.add(this.mesh1);
            this.mesh1.scale.set(pgjs._rLine,99,pgjs._rLine);
            this.mesh1.name="PointLine";
            this.mesh1.parObj=this;
            this.dragMaterial()            
            this.dragCent()
        }

        var vec=new THREE.Vector3()
        var vec1=new THREE.Vector3()
        var vecC=new THREE.Vector3()
        var dist,dist2,a,a2
        this.dragCent=function(boolNot){
            if(this._addPoint==undefined){
                return;
            }
            vec.copy(this.position)
            vec1.copy(this._addPoint.position)
            
            vecC.x=(vec.x+vec1.x)/2-vec.x;
            vecC.y=(vec.y+vec1.y)/2-vec.y;
            vecC.z=(vec.z+vec1.z)/2-vec.z;            
            this.cont3d.position.copy(vecC)

            a=calc.getAngle(vec,vec1);
            this.cont3d.rotation.z = a+Math.PI/2;
            
            dist=Math.sqrt(Math.pow((vec.x - vec1.x), 2) + Math.pow((vec.y - vec1.y), 2)+ Math.pow((vec.z - vec1.z), 2));
            
            dist2=calc.getDistance(vec,vec1)
          
            a2=Math.acos(dist2/dist);
            
            if(vec.z<vec1.z)a2=-a2;
            this.mesh1.rotation.x=a2;



            this.mesh1.scale.y=dist;
          
        }



        /*this.setPar=function(par, fun){ 
            this.par=par;
            this.fun=fun;  
            this.par.content3d.add(this.content3d);
        }*/



        this.dragActiveOne=function(){
            //console.warn("dragActiveOne")

            if(this._activeOne){
                self.radius=pgjs.rPoint*1.1;
            }else{
                self.radius=pgjs.rPoint;
            }
            this.dragMaterial()
        }

        this.dragActive=function(){
            /*if(this._active){
                this.mesh.material=window.gpsWord.hronBig.material2
            }else{
                this.mesh.material=window.gpsWord.hronBig.material1 
            }*/
        }

        this.dragLife=function(){
            if(this._life){              
                visi3D.addChildMouse(this.content3d)
            }else{              
                visi3D.removeChildMouse(this.content3d)
            }
        }


        var bb
        this.dragMaterial=function(){
            if(this._activeModel==false){
                utility.setC3DMat(this.mesh,0);
                utility.setC3DMat(this.mesh1,0);
            }else{
                bb=true;
                
                if(this.parent && this.parent._activeOne){                    
                    utility.setC3DMat(this.mesh1,2)
                    if(this._activeOne){
                        utility.setC3DMat(this.mesh,3);                        
                    }else{
                        utility.setC3DMat(this.mesh,1); 
                    }
                    bb=false;
                }else{
                    if(this._activeOne){
                        utility.setC3DMat(this.mesh,3);
                        bb=false;                        
                    }
                }
                

                if(bb){ 
                    utility.setC3DMat(this.mesh,1)
                    utility.setC3DMat(this.mesh1,1)
                }
            }
        }

        



        this.dragActiveModel=function(){            
            this.dragMaterial()
        }

        this.drahSobPost=function(s,p,p1){
            if(s=="PGPS"){               
                self.radius=pgjs.rPoint;
                if(this.mesh1){
                    this.mesh1.scale.x=pgjs._rLine;
                    this.mesh1.scale.z=pgjs._rLine;
                }
            }
        }
    }

    set addPoint1(value) {       
        if (this._addPoint1 != value) {           
            this._addPoint1 = value;
            

        }
    }
    get addPoint1() {
        return this._addPoint1;
    }     

    set addPoint(value) {       
        if (this._addPoint != value) {           
            this._addPoint = value;
            this._addPoint.addPoint1=this;
            this.initap();

        }
    }
    get addPoint() {
        return this._addPoint;
    }   

    set radius(value) {       
        if (this._radius != value) {           
            this._radius = value;
            this.mesh.scale.set(this._radius,this._radius,this._radius);
            gpsWord.render(); 
        }
    }
    get radius() {
        return this._radius;
    }

}

