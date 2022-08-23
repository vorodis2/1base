

//import { PositionFun } from './PositionFun.js';
import { Base } from '../Base.js';
export class Truba extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="Truba";
        var self=this;
       
        this._addPoint=undefined;
        this._addPoint1=undefined;


        this._radius = 100;



        this.funPozition=function(){
            var s=1; 
            /*self.content3d.position.x=self.position.x;
            self.content3d.position.y=self.position.y;
            self.content3d.position.z=self.position.z;*/

            //if(this._addPoint){
                this.dragCent()
            //}
            if(this._addPoint1)this._addPoint1.dragCent();


            if(self.fun)self.fun("dragPoint", self);
        }


       
        this.cont3d = new THREE.Object3D();
        this.content3d.add(this.cont3d);            
        this.mesh=new THREE.Mesh(window.gpsWord.hronBig.cylinderGeometry, window.gpsWord.hronBig.material1)        
        this.cont3d.add(this.mesh);
        this.mesh.scale.set(pgjs._mashtab*this._radius,1,pgjs._mashtab*this._radius);
        this.mesh.name="PointLine";
        this.mesh.parObj=this;
        //this.dragMaterial()            
       // this.dragCent()
        

        var vec=new THREE.Vector3()
        var vec1=new THREE.Vector3()
        var vecC=new THREE.Vector3()
        var dist,dist2,a,a2
        this.dragCent=function(boolNot){
            if(this._addPoint==undefined){
                return;
            }
            if(this._addPoint1==undefined){
                return;
            }
            vec.copy(this._addPoint.position)
            vec1.copy(this._addPoint1.position)
            
            vecC.x=(vec.x+vec1.x)/2;
            vecC.y=(vec.y+vec1.y)/2;
            vecC.z=(vec.z+vec1.z)/2;            
            this.cont3d.position.copy(vecC)
            

            a=calc.getAngle(vec,vec1);
            this.cont3d.rotation.z = a+Math.PI/2;
            
            dist=Math.sqrt(Math.pow((vec.x - vec1.x), 2) + Math.pow((vec.y - vec1.y), 2)+ Math.pow((vec.z - vec1.z), 2));
            
            dist2=calc.getDistance(vec,vec1)
          
            a2=Math.acos(dist2/dist);
            
            if(vec.z<vec1.z)a2=-a2;
            this.mesh.rotation.x=a2;



            this.mesh.scale.y=dist;

        }


        

        this.drahSobPost=function(s,p,p1){            
            if(s=="PGPS"){
                this.mesh.scale.x=pgjs._mashtab*this._radius;
                this.mesh.scale.z=pgjs._mashtab*this._radius;
            }            
        }



    }

    set addPoint1(value) {       
        if (this._addPoint1 != value) {           
            this._addPoint1 = value;
            this.dragCent()

        }
    }
    get addPoint1() {
        return this._addPoint1;
    }     

     set addPoint(value) {       
        if (this._addPoint != value) {           
            this._addPoint = value;            
            this.dragCent()
        }
    }
    get addPoint() {
        return this._addPoint;
    }   

    set radius(value) {       
        if (this._radius != value) {           
            this._radius = value;
            this.mesh.scale.x=pgjs._mashtab*this._radius;
            this.mesh.scale.z=pgjs._mashtab*this._radius;
            
            gpsWord.render(); 
        }
    }
    get radius() {
        return this._radius;
    }

}

