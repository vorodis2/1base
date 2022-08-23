




/*
import { Scane3d } from './veiw/Scane3d.js';

import { Mozg } from './mozg/Mozg.js';*/



export class Utility {
    constructor(par, fun) {         
        this.type="Utility";
        var self=this; 
        this.par=par;
        this.fun=fun;

        window.utilObj=this.utilObj=new UtilObj(this)

        //ценруем сцену
        this.korektPosit=function(o, t){            
            //return

            if(o.type=="Model"){
               //  this.startMaxRect()
               //  for (var i = 0; i < o.wordSurface.array.length; i++) {
               //      for (var j = 0; j < o.wordSurface.array[i].array.length; j++) {
               //          this.pointMaxRect(o.wordSurface.array[i].array[j].position);
               //      }                    
               //  }
               //  this.finalMaxRect()
  
               //  this.centerScane(-om.x2,-om.y2,-om.z2, 2000)
               // /* visi3D.utility.focus.active=true;
               //  visi3D.utility.focus.targetObject=this.par.content3d;
               //  visi3D.render();
               //  visi3D.utility.focus.active=false;*/ 

               //  this.dragFokus(this.par.content3d,500)

               
                this.startMaxRect()
                for (var i = 0; i < o.wordSurface.array.length; i++) {
                    for (var j = 0; j < o.wordSurface.array[i].array.length; j++) {
                        this.pointMaxRect(o.wordSurface.array[i].array[j].position);
                    }                    
                }
                this.finalMaxRect()

                //this.centerScane(-o.position._x,-o.position._y,-o.position._z, 2000)
               /* visi3D.utility.focus.active=true;
                visi3D.utility.focus.targetObject=this.par.content3d;
                visi3D.render();
                visi3D.utility.focus.active=false;*/ 
                //this.dragFokus(this.par.content3d,500)
                this.dragFokus(o.content3d,t)

            }
        }

        this.tween=new TWEEN.Tween(visi3D);
        this.tween.onUpdate(function(){
            visi3D.intRend=1;
        })
        this.dragFokus=function(c3d, time){
            this.tween.stop()
            if(time==undefined){
                visi3D.utility.focus.active=true;
                visi3D.utility.focus.targetObject=c3d;
                visi3D.render();
                visi3D.utility.focus.active=false;
            }else{
                let o=visi3D.getObj();

                visi3D.utility.focus.active=true;
                visi3D.utility.focus.targetObject=c3d; 
                visi3D.render();
                let o1=visi3D.getObj(); 
                visi3D.utility.focus.active=false;
                visi3D.setObj(o)
                visi3D.render();

                this.tween.to(o1,time).start();
                
                
            }
        }   

        ////////////////matreial 3d obect//////////////////////
        this.setC3DMat=function(c3d, idMat){
            if(!c3d)return
            if(c3d.material==undefined)  return
            if(c3d.material.uuid!=window.gpsWord.hronBig.aMat[idMat].uuid){
                c3d.material=window.gpsWord.hronBig.aMat[idMat]
            }  
        }

        this.getGObj = function (e,key) {
            var k="objGlob"
            if(key!=undefined)k=key; 

            if(e && e.target) return getG(e.target,k)
            return null
        }
        function getG(c3d,key) {                        
            if(c3d[key]) return c3d[key];
            if(c3d.parent) return getG(c3d.parent,key );
            return null    
        }

        ////////////////////////////////////

        var om={x:0,y:0,z:0,x1:0,y1:0,z1:0,w:0,h:0,d:0,x2:0,y2:0,z2:0}     
        this.startMaxRect=function(){
            om.x=9999999999999;
            om.y=9999999999999;
            om.z=9999999999999;

            om.x1=-9999999999999;
            om.y1=-9999999999999;
            om.z1=-9999999999999;
        }

        this.pointMaxRect=function(p){
            
            if(p.x< om.x) om.x=p.x;
            if(p.y< om.y) om.y=p.y;
            if(p.z< om.z) om.z=p.z;

            if(p.x> om.x1) om.x1=p.x;
            if(p.y> om.y1) om.y1=p.y;
            if(p.z> om.z1) om.z1=p.z;
        } 

        this.finalMaxRect=function(){ 
            om.w=om.x1-om.x;
            om.h=om.y1-om.y;
            om.d=om.z1-om.z;

            om.x2=om.x+om.w/2;
            om.y2=om.y+om.h/2;
            om.z2=om.z+om.d/2;
        }

        var tween=new TWEEN.Tween(this.par.content3d.position)
        tween.onUpdate(function(){
            visi3D.intRend=1;
        })
        this.centerScane=function(x,y,z,time){ 
            var s=0.001;
            
            if(time==undefined){
                this.par.content3d.position.x=x*s;
                this.par.content3d.position.y=y*s;
                this.par.content3d.position.z=z*s;
            }else{
                tween.to({x:x*s,y:y*s,z:z*s},time).start();
            }
            
        }



        this.setStartRect=function(r){ 
            r.x=9999999999999999999
            r.y=9999999999999999999
            r.z=9999999999999999999

            r.x1=-9999999999999999999
            r.y1=-9999999999999999999
            r.z1=-9999999999999999999
        }

        this.setPointRect=function(r,p){ 
            if(r.x>p.x)r.x=p.x;
            if(r.x1<p.x)r.x1=p.x;

            if(r.y>p.y)r.y=p.y;
            if(r.y1<p.y)r.y1=p.y;

            if(r.z>p.z)r.z=p.z;
            if(r.z1<p.z)r.z1=p.z;
        }

        this.setRectRect=function(r,r1){ 
            if(r.x>r1.x)r.x=r1.x;
            if(r.x1<r1.x1)r.x1=r1.x1;

            if(r.y>r1.y)r.y=r1.y;
            if(r.y1<r1.y1)r.y1=r1.y1;

            if(r.z>r1.z)r.z=r1.z;
            if(r.z1<r1.z1)r.z1=r1.z1;           
        }


        this.setFinishRect=function(r){ 
            r.w=r.x1-r.x
            r.h=r.y1-r.y
            r.d=r.z1-r.z

            r.x2=r.x+r.w/2
            r.y2=r.y+r.h/2
            r.z2=r.z+r.d/2
        }
    }
}


export class Menedjer {
    constructor(par, fun) {         
        this.type="Menedjer";
        var self=this; 
        this.par=par;
        this.fun=fun;
        this._index=0
        this.sobIndex=[];
        this.sobIndex[0]=new SobIndex(this);

        this.move = function (e) {  
            if(self.sobIndex[self._index]!=undefined){
                self.sobIndex[self._index].move(e);

            }
        }

        this.out = function (e) { 
             //trace("e3d ",e) 
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


        visi3D.addEvent("move", this.move);
        visi3D.addEvent("out", this.out);        
        visi3D.addEvent("over", this.over);
        visi3D.addEvent("down", this.down);
        visi3D.addEvent("up", this.up);        

    }
}

export class SobIndex  {
    constructor(par,fun) {          
        this.type="SobIndex";
        var self=this;
        this.par=par;
        this.fun=fun;



        this.move = function (e) { 
            
        }

        this.out = function (e) {   

            if(e.target && e.target.parObj){
                
                e.target.parObj.active=false;
                gpsWord.render();
                window.document.body.style.cursor = "auto"; 
            }
        }

        this.over = function (e) {   
            if(e.target && e.target.parObj){
                e.target.parObj.active=true;
                gpsWord.render();
                window.document.body.style.cursor = "pointer"; 
            }
        }

        var koren, contril , parObj
        this.down = function (e) {
           if(e.target){
                trace("@@ee@",e.target)
                if(e.target.parObj){
                    

                    koren=this.getKoren(e.target.parObj)
                    if(gpsWord.activeObject.uuid!=koren.uuid)gpsWord.activeObject=koren;

                    if(e.target.name=="PointLine"){
                        menuBig.setObject(e.target.parObj.parent);
                        return;
                    }

                    menuBig.setObject(e.target.parObj);
                    return 
                }
                contril=utility.getGObj(e, "contril")
                trace(contril,e.target.space)
                if(contril!=null){
                    if(e.target.space){

                    }else{
                        return 
                    }
                    
                }
                menuBig.setObject(null);
                

            }else{
                menuBig.setObject(null);
            }
/* 
            if(e.target && e.target.parObj){
                trace("@@ee@",e.target)
               // "contril"
                contril=null;
                contril=utility.getGObj(e.target,"contril")
                trace("@@@",contril, e.target)
                if(contril!=null)return

                koren=this.getKoren(e.target.parObj)
                //if(gpsWord.activeObject.uuid!=koren.uuid)gpsWord.activeObject=koren;

                if(e.target.name=="PointLine"){
                    menuBig.setObject(e.target.parObj.parent);
                    return;
                }

                menuBig.setObject(e.target.parObj);
            }else{
                menuBig.setObject(null);
            }*/
        }

        this.getKoren = function (child) {  
            if(child.parent!=undefined)return this.getKoren(child.parent)
            return child
        }


        this.up = function (e) {            
           
        }
    }
}



export class UtilObj  {
    constructor(par,fun) {          
        this.type="UtilObj";
        var self=this;
        this.par=par;
        this.fun=fun;


        this.getTrubArr=function(a){
            var ar=[]
            for (var i = 1; i < a.length; i++) {
                ar.push(this.getTrub(a[i-1].position,a[i].position,i,0.11))
            }

            return ar;
        }

        this.getTrub=function(p,p1,ii,diameter){
            var o={}
            o["@name"]="dinamic_"+ii;
            o.CircPipe={}
            o.CircPipe["@diameter"]=diameter;

            o.Feature=[];
            o.Feature[1]=null;
            o.Feature[0]={}
            o.Feature[0].Property=[]

            let pS={}
            pS["@label"]='pipeStart';
            pS["@value"]=''+p._x+" "+p._y+" "+p._z;

            let pE={}
            pE["@label"]='pipeEnd';
            pE["@value"]=''+p1._x+" "+p1._y+" "+p1._z;

            o.Feature[0].Property.push(pS)
            o.Feature[0].Property.push(pE)

            trace(o)
            return o;
        }


        var rp,rre
        this.getTypeClass=function(base, type){
            rp=this.getParent(base)  
            rre=this.getCildType(rp, type) 
            return rre
        }


        this.getParent=function(base){            
            if(base.parent!=null)return this.getParent(base.parent)                
            return base;
        }

        var rer
        this.getCildType=function(_base,type){            
            rer=null;
            this.getCildType1(_base,type)
            return rer
        }

        this.getCildType1=function(_base,type){
            if(_base.type==type){               
                rer=_base
            }
            for (var i = 0; i < _base.children.length; i++) {
                let rr=this.getCildType(_base.children[i],type);
            }
        }


    }
}
