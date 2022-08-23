


import { SobIndex } from './SobIndex.js';
import { SobIndex0 } from './SobIndex0.js';
import { SobIndex1 } from './SobIndex1.js';
import { SobIndex2 } from './SobIndex2.js';
import { SobIndex3 } from './SobIndex3.js';
import { SobIndex4 } from './SobIndex4.js';

export class FManager  {
  	constructor(par,fun) {  		
  		this.type="FManager";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this._index=-1;
        this._tipDrav=-1;
       
        this.visi3D=par.visi3D
        this.mobile=par.mobile

        this._boolDraw=false;        
        this.menu=undefined;
        this.whSize=par.whSize;
        this.floor
        this.array=[]
        this.debug=par.debug


        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d)
        
        
        this.planDrag=new PlanDrag(this)

        this.tukalka=new Tukalka(this.visi3D)

        this.sobDragPic=undefined;

        this.sobIndex=[]
        this.sobIndex[0]=new SobIndex0(this);
        this.sobIndex[1]=new SobIndex1(this);
        this.sobIndex[2]=new SobIndex2(this);
        this.sobIndex[3]=new SobIndex3(this);
        this.sobIndex[4]=new SobIndex4(this);

     
        




        var p,p1
        var posit
        var positDin=new THREE.Vector3()
        var activSten=null;
        var activSten1=null;
        var point,point1,point2
        var point1
        this.addFloor=function(_floor){
            if(this.floor!=undefined){                
                //this.floor.bazaMod.content3d.remove(this.planDrag.mesh);
                if(this.floor.dContDebag!=undefined) {
                    if(this.floor.dContDebag.parent!=undefined){
                        this.floor.dContDebag.parent.remove(this.floor.dContDebag)
                    }
                }
                this.floor.activMouse=false;
            }

            
            this.floor =_floor; 
            this.floor.activMouse=true;                      
            
            this.floor.sp.visi3D=this.visi3D;
            //this.floor.bazaMod.content3d.add(this.planDrag.mesh);   
            
            if(this.debug)
            if(this.floor.dContDebag!=undefined) {
                this.par.par.dCV.add(this.floor.dContDebag)                
            }
        
        }


        this.addMenu=function(_menu){
            this.menu=_menu;
            this.menu.whSize=this.whSize
            this.sobDragPic=new SobDragPic(this,this.menu.dragPic,this.visi3D)
            //this.sobIndex[2].dragPic=this.menu.dragPic;            
        }

        this.dragMenu=function(){
            this.menu.mObject.dragMenu()
        }

        this.activOne=function(_obj){                        
            this.menu.setObject(_obj);
           
           // this.floor.clearActive()
         
            
            
            if(_obj && _obj.active!=undefined){                          
                _obj.active=true               
            }
            self.visi3D.intRend=1;
        }

        this.move = function (e) {  
            if(self.sobIndex[self._index]!=undefined){
                self.sobIndex[self._index].move(e);

            }
        }

        this.out = function (e) {   
            if(self.sobIndex[self._index]!=undefined)self.sobIndex[self._index].out(e);
        }

        this.over = function (e) {   
            if(self.sobIndex[self._index]!=undefined)self.sobIndex[self._index].over(e);
        }

        this.down = function (e) {            
            if(self.sobIndex[self._index]!=undefined)self.sobIndex[self._index].down(e);
        } 
        this.up = function (e) {   
            if(self.sobIndex[self._index]!=undefined)self.sobIndex[self._index].up(e);
        }       


        this.visi3D.addEvent("move", this.move);
        this.visi3D.addEvent("out", this.out);        
        this.visi3D.addEvent("over", this.over);
        this.visi3D.addEvent("down", this.down);
        this.visi3D.addEvent("up", this.up);
        

  		var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
           // this.tukalka.sizeWindow(w,h,s)
        } 

  	}

    set index(v) {
        
        if(this._index!=v){ 
            this._index=v; 
            
            this.activOne(null)
            this.sobIndex[1].tipDrav=this.sobIndex[1]._tipDrav       
            for (var i = 0; i <  this.sobIndex.length; i++) {
                this.sobIndex[i].clear();
            }
            this.sobIndex[this._index].setActive()
            
            this.planDrag.setZ(0)   
            this.visi3D.intRend=1;      
        }       
    }   
    get index() { return  this._index;} 

    set tipDrav(value) {        
        if(this._tipDrav!=value){
            this._tipDrav= value;
            this.sobIndex[1].tipDrav=value;
        }
    }    
    get tipDrav() { return  this._tipDrav;}  
}



export class PlanDrag  {
    constructor(par) {
        var self=this
        this.par=par
        this.whSize=20000;
        let wh=200;    
        let material=new THREE.MeshPhongMaterial({color:0xffffff})
        this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry( this.whSize, this.whSize,1,1), material); 
        //this.mesh = new THREE.Mesh(new THREE.BoxBufferGeometry( this.whSize, this.whSize,this.whSize), material);       
        this.mesh.rotation.x = -Math.PI/2;

        this.par.content3d.add(this.mesh);
        
       
        this.mesh.layers.set(31);
        this.mesh.name = 'ManMouse3D';
        this.par.visi3D.event3DArr.addChild(this.mesh);

        this.tween = new TWEEN.Tween(material);
        this.tween.onUpdate(function(){
            self.par.visi3D.intRend=1;
        }) 
        this.setZ=function(_num){
            /*if(_num==0){                
                this.mesh.position.y=0
            }else{
                this.mesh.layers.set(1);
                if(this.mesh.position.z==0){
                    material.opacity=0;
                    this.tween.to({opacity:0.7},1500).start();
                }else{

                   
                }
                this.mesh.position.y=_num
            }*/

        }

        this.setTextur=function(_textur){
           // material.map=_textur
        }/**/

    }


}





export class Tukalka  {
    constructor(visi3D) {
        var self=this
        var whSize=100000

        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry( whSize, whSize,1,1));
        //var mesh = new THREE.Mesh(new THREE.BoxBufferGeometry( whSize, whSize,whSize));
        mesh.scale.z=0.01
        mesh.rotation.x=Math.PI
        mesh.name='eJS103'
        mesh.layers.set(31);

        this.funSob;
        this.funUp;
        this.drahForst;
        this.valueX = 0;
        this.valueY = 0;


        this.move = function (e) { 
            if (self.startPoint == undefined){
                self.startPoint = visi3D.event3DArr.event3D.copy();
                if(self.drahForst){
                    self.drahForst()
                    return
                }
            }
            self.valueX = (e.uv.x - self.startPoint.uv.x) * whSize;
            self.valueY = -(e.uv.y - self.startPoint.uv.y) * whSize;            
            if (self.funSob != undefined)self.funSob();
            
        }

        self.mouseup=function(e){
            visi3D.event3DArr.removeChild(mesh);
            visi3D.removeEvent("move", self.move);
            mesh.parent.remove(mesh);
            visi3D.intRend=1
            visi3D.event3DArr.poiskName = self.poiskNameDo;
            if(dcmParam.mobile==false){              
                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);                
            }
            visi3D.position3d.pause=false;
            if (self.funUp != undefined)self.funUp()
        }

        this.startPoint;
        this.start = function (cont, _position,  _funSob, _funUp, _rotat,_drahForst, _rotat1) {
            _position = _position || new THREE.Vector3();
            self.funSob = _funSob;
            self.funUp = _funUp;
            self.drahForst=_drahForst

            this.valueX = 0;
            this.valueY = 0;
            visi3D.event3DArr.poiskName =  'eJS103';
            visi3D.position3d.pause=true;
            mesh.position.set(_position.x, _position.y, _position.z);            
            cont.add(mesh);
            visi3D.event3DArr.addChild(mesh);
            visi3D.addEvent("move", this.move);

            mesh.rotation.x= _rotat==undefined ? Math.PI : _rotat 
            mesh.rotation.y= _rotat1==undefined ? 0 : _rotat1            
            if(dcmParam.mobile==false){              
                document.addEventListener("mouseup", self.mouseup);
            }else{                  
                document.addEventListener("touchend", self.mouseup);                
            }
        }

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }            
        } 
    }
}

export class SobDragPic  {
    constructor(par,dragPic,visi3D) {
        var self=this
        this.par=par;
        this.dragPic=dragPic;

       

        this.getSten=function(c3d){
            if(c3d.sten!=undefined)return c3d.sten;
            if(c3d.parent!=undefined)return this.getSten(c3d.parent);
            return null
        }

        /*this.dragPic.addFunAp(function(){    
         
            if(self.dragPic.object!=undefined){ 
                visi3D.event3DArr.rayPusk()
                if(visi3D.event3DArr.intersects[0]){
                    var eup=visi3D.event3DArr.intersects[0]                   
                    if(self.dragPic.object.typeThree=="Sten3D"){
                        if(eup.object.name=="Sten3D"){
                            var sten=self.getSten(eup.object)
                           
                            if(sten!=null){
                                
                                if(eup.object.name1=="Sten3D_0")sten.col3d=self.dragPic.object.id
                                if(eup.object.name1=="Sten3D_1")sten.col3d1=self.dragPic.object.id 
                                if(eup.object.name1=="Sten3D_verh"){
                                    sten.col3d=self.dragPic.object.id 
                                    sten.col3d1=self.dragPic.object.id  
                                }   
                            }                        
                        }
                    }
                }  
            }
        })*/




    }
}


