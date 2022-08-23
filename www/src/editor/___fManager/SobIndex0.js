
import { SobIndex } from './SobIndex.js';


export class SobIndex0  extends SobIndex {
    constructor(par,fun) {
        super();            
        this.type="SobIndex0";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this._sah=0

        var point,posit,posit1
        var arrPosit=[];
        var positDin=new THREE.Vector3();
        var positDin1=new THREE.Vector3();
        var positDin2=new THREE.Vector3();

        this.move = function (e) { 

        }

       

        var dragBool=true


        this.drahPoint = function (){             
            if(pol) { 
                for (var i = 0; i < pol.array.length; i++) {
                    let v= new THREE.Vector3()
                    v.x=arrPosit[i].x+self.par.tukalka.valueX
                    v.y=arrPosit[i].y+self.par.tukalka.valueY
                    pol.array[i].position.setPoint(v)
                    /*pol.array[i].position.set(
                        arrPosit[i].x+self.par.tukalka.valueX,
                        arrPosit[i].y+self.par.tukalka.valueY,
                    )*/

                    pol.array[i].dragVokrug();
                    pol.array[i].drag(); 
                }
                self.par.visi3D.intRend=1;
            }

            if(point) {
                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY;
                self.korektAP(positDin)
                point.position.setPoint(positDin)
                point.dragVokrug();
                point.drag();            
                self.par.visi3D.intRend=1;

                
            }

            if(sten) {                
                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY; 

                positDin1.x = positDin.x;
                positDin1.y = positDin.y;

                self.korektAP(positDin)   

                positDin2.x = positDin1.x-positDin.x;
                positDin2.y = positDin1.y-positDin.y;          
               
                sten.addPoint.position.setPoint(positDin)
                sten.addPoint.dragVokrug();
                sten.addPoint.drag();  

                positDin.x=posit1.x+self.par.tukalka.valueX-positDin2.x;
                positDin.y=posit1.y+self.par.tukalka.valueY-positDin2.y;

                sten.addPoint1.position.setPoint(positDin);
                sten.addPoint1.dragVokrug();
                sten.addPoint1.drag(); 

                self.par.visi3D.intRend=1;
            }


        }
        this.stopPoint = function () {  
            if(point) {                
                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY;
                self.korektAP(positDin)

                if(positDin.obj!=undefined){
                    if(positDin.obj.type=="SpPointSten"){
                        positDin.obj.slitie(point)
                    }
                    if(positDin.obj.type=="SpliceSten"){
                        positDin.obj.dividedSten(point,true)
                    }                    
                }                
            }
        }
    
    
        this.out = function (e) {            
            gObj=this.getGObj(e);
            if(gObj){ 
                if(gObj.active!=undefined){
                    gObj.active=false;
                    visi3D.intRend=1;
                }
                window.document.body.style.cursor = "auto"; 
            }
        }

        this.over = function (e) {   
            gObj=this.getGObj(e);
            if(gObj){ 
                //if(gObj.active!=undefined){
                    gObj.active=true;
                    visi3D.intRend=1;
                    if(gObj.type=="TCompArrow" || gObj.type=="SpPointSten"){  
                        window.document.body.style.cursor = "pointer";  
                    }
                    
                //}
            }
        }




        var sten, pol, gObj,posy
        this.down = function (e) {  
            point=null;
            sten=null;
            pol=null;
            gObj=this.getGObj(e);
            
            if(gObj){ 
                
                if(gObj.type =="TCompArrow"){ 
                    sten=gObj.sten

                    if(sten==undefined){

                        self.par.activOne(gObj);
                        return
                    }
                    posy=e.point.y;

                    point=self.par.floor.sp.craetPoint();                    
                    let pa=self.par.floor.polDin.array;


                    var p=-1
                    for (var i = 0; i < pa.length; i++) {
                        if(pa[i].uuid==sten.addPoint1.uuid){                           
                            p=i;
                            break
                        }
                    }
                    if(p!=-1)self.par.floor.polDin.addPoint(point,p);
                    


                    var p=self.getPosEv3DSten(e);  
                    var p1= calc.isPointInLin(sten.addPoint.position,sten.addPoint1.position,e.point,1000,1000);                   
                    var sten1=self.par.floor.sp.craetSplice1();
                    self.par.planDrag.setZ(posy)
                    
                    point.position.setPoint(p1);                    
                    sten.addPoint.addSplice(sten1,true);
                    sten.addPoint.removeSplice(sten);
                    point.addSplice(sten, true);
                    point.addSplice(sten1,false); 



                    //драгер точки
                    posit=new THREE.Vector3(point.position.x,point.position.y)                   
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    
                    self.startAP(point);
                    dragBool=true; 
                    sten=null;
                    /////////////////

                    self.par.activOne(gObj);
                    return; 
                } 

                   

                /*if(e.target.name=="Pol3D"){ 
                    pol=e.target.gObj;                    
                    self.par.activOne(pol);
                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return

                    for (var i = 0; i < pol.array.length; i++) {
                        if(arrPosit[i]==undefined)arrPosit[i] = new THREE.Vector3();
                        
                        arrPosit[i].x= pol.array[i].position.x;
                        arrPosit[i].y= pol.array[i].position.y; 
                    }
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    dragBool=true;                    
                    return;
                }*/


                if(gObj.type=="SpPointSten"){
                                       
                    point=gObj;
                    self.par.activOne(point);

                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return
                    posit=new THREE.Vector3(point.position.x,point.position.y)                   
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    
                    self.startAP(point)
                    dragBool=true                    
                    return;
                }  

                if(gObj.type=="SpliceSten"){                     
                    sten=gObj; 
                    self.par.activOne(sten);  
                    self.par.visi3D.intRend=1;                         
                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return;
                    posit=new THREE.Vector3(sten.position.x,sten.position.y);
                    posit1=new THREE.Vector3(sten.position1.x,sten.position1.y); 
                    self.startAP(sten.addPoint,sten.addPoint1) 

                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    ) 
                    dragBool=true
                    return;
                }   

                           
            }
            self.par.activOne(null);
        }

        this.clear=function(){
            this._sah=0;
        }       
    }
}
