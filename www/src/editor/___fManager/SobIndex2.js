

import { SobIndex } from './SobIndex.js';

//import { DDebugColl } from './../menu/DDebugColl.js';

export class SobIndex2  extends SobIndex {
  	constructor(par,fun) {
        super();      		
  		this.type="SobIndex2";
  		var self=this;
        this.par=par;
        this.fun=fun;

        var blok=undefined;
        var posZdvig={x:0,y:0}
        var pos={x:0,y:0,o:null,dist:0};
        var sp={x:0,y:0,x1:0,y1:0,s:0,o:null};
        var blok=undefined;

        this.sp=this.par.par.view.facade.sp;
        

        this.up=function(e){  
            if(blok!=undefined){
                blok=undefined
                window.dragPic.stop()
                visi3D.position3d.pause=false
            }
        }

        this.over=function(e){  
            //trace("::#",e)
        }



        var point1={x:0,y:0}
        var point={x:0,y:0}
        var granSten,gObj,sten
        this.move=function(e){             
            //return
            if(blok!=undefined){ 
                gObj=this.getGObj(e);
                
                
                if(gObj && gObj.type=="SpliceSten"){
                    if(blok.parent==undefined){
                    
                       

                        gObj.addBlok(blok);

                        window.dragPic.stop() 
                    } 

                    if(blok.parent!==undefined){
                        
                        if(blok.parent.par.uuid!=gObj.uuid){
                            blok.parent.par.removeBlok(blok);
                            gObj.addBlok(blok);
                        }                        
                    }

                    if(blok.parent!==undefined){
                        
                        point.x=e.point.x
                        point.y=e.point.z

                        var d=calc.getDistance(point,gObj.addPoint.position)
                        
                        blok.setPosition(d, e.point.y, 0);
                    }
                    visi3D.intRend=1;    
                }else{


                    if(blok.parent!==undefined){
                        if(e.target.name=="ManMouse3D"){
                            window.dragPic.start(48,blok.icon,blok,this.upDrag,1)
                            blok.parent.par.removeBlok(blok);
                            visi3D.intRend=1;

                        }
                        
                        /*trace(blok.parent.collision)
                        window.dragPic.start(48,blok.icon,blok,this.upDrag,1)
                        blok.parent.par.removeBlok(blok);
                        visi3D.intRend=1;*/
                        
                    }
                    
                }
            }



           /* if(blok!=undefined){
                if(blok.parent!=undefined){
                    self.getPositPlan(pos);
                    if(posZdvig.x!=0){//смещаем относительно точек стены
                        calc.getVector(posZdvig.x,blok.parent.par._rotation, pZ1)
                    }
                    pos.x+=pZ1.x;
                    pos.y+=pZ1.y;

                }else{
                    self.getPositPlan(pos);
                }

                self.korektAP(pos);

                if(blok.parent==undefined){                    
                    if(pos.o && pos.o.type&&pos.o.type=="SpliceSten"){             
                        if(pos.o.windows.isBlokPlace(blok)==true){                                             
                            pos.o.addBlok(blok);                            
                            window.dragPic.stop()  
                        }                                              
                    }
                }else{
                    if(pos.o==undefined){
                        window.dragPic.start(48,blok.icon,blok,this.upDrag,1);
                        blok.parent.removeBlok(blok);
                    }else{
                        
                        if(blok.parent.uuid!=pos.o.windows.uuid){
                            pos.o.addBlok(blok);
                        }
                    }
                }

                
                if(blok.parent!=undefined){
                    blok.setPosition(pos.x, pos.y, 0);
                   // blok.setReal(blok._x+posZdvig.x, blok._y+posZdvig.y,0)
           
                }
            }*/
        }
        var blokTuk
        this.down=function(e){ 
            
            gObj=this.getGObj(e);
            
            

            blokTuk=this.getGObj(e,"objBlok");
            
            if(blokTuk!=null){
                
                blok=blokTuk;
                visi3D.position3d.pause=true;
               
                self.par.activOne(blok);
               // self.par.par.mObject.setObject(blok)  
            }
        }



        this.sobSP=function(s,p,e){
            trace(s,p,e)
            //if(p)self.par.par.mObject.setObject(p)    
            posZdvig.x=0
            posZdvig.y=0

           /* if(s=="downBlok"){
                


                blok=p
                
                self.poiskZdvig(blok)
                if(blok.funMouseDown)blok.funMouseDown()
                document.addEventListener("mouseup", self.mouseup);
                document.addEventListener("mousemove", self.mousemove);
                self.active=true;
                return
            }*/

            if(s=="creatObjDin"){               
                visi3D.position3d.pause=true
                blok=self.sp.worldBlok.getBlok(p);
                blok.init();
                self.par.activOne(blok);
                window.dragPic.start(48,blok.icon,blok,this.upDrag,1)

              
                if(blok.funMouseDown)blok.funMouseDown();
                //self.active=true;
                return
            }
        }

        this.upDrag=function(){

        }



/*
        this.setActive = function () { 
            this.par.floor.sp.activMouse=true;
            this.par.floor.visiPoint= false; 
            this.par.floor.bazaMod.activMouse= true; 
            this.par.floor.bazaMod.activeRadius = true;      
        }


        this.dDebugColl=undefined;
       


        this.dragPic=undefined
        this.mobile=this.par.mobile;
        

        this.activBlok=undefined;
        self.tipDrag="null"
        this.startBlok =function(id,e){

            this.activBlok=par.floor.bazaMod.get(id)
            this.activBlok.setPosition(e.point.x,e.point.y,e.point.z);
            par.floor.bazaMod.addBlok(this.activBlok);
            this.startBBB(this.activBlok);
            this.move(e);
        }

        this.startBBB =function(blok){    
           
            self.activBlok=blok;
            self.activBlok.activMouse=false;

           // self.par.floor.sp.amSten=self.activBlok.visiSten;
            par.floor.bazaMod.activeObject=self.activBlok.idArr;          
            
            self.par.activOne(self.activBlok);           


            self.par.visi3D.position3d.pause=true;
            if(self.mobile==false){               
                document.addEventListener("mouseup", self.finishBlok);
            }else{                  
                document.addEventListener("touchend", self.finishBlok);               
            }
            self.par.visi3D.intRend=1;
        }

        this.finishBlok =function(id,e){

            self.par.visi3D.position3d.pause=false;
            if(self.activBlok!=undefined){
                self.activBlok.activMouse=true;
            }
            self.activBlok=undefined

            self.setActive()
            //par.floor.bazaMod.activeObject=-1; 

            if(self.mobile==false){               
                document.removeEventListener("mouseup", self.finishBlok);
            }else{                  
                document.removeEventListener("touchend", self.finishBlok);               
            }
            
            self.par.visi3D.intRend=1;
        }

        var sten;
        var dist,p,a
        this.move = function (e) { 
            if(self.activBlok!=undefined){
                self.par.visi3D.intRend=1;
            

                if(self.activBlok.parent!=undefined) {

                    if(self.activBlok.parent.type=="BazaMod"){
                        
                        self.activBlok.setPosition(e.point.x,e.point.y,e.point.z)
                        gObj=self.getParName(e.target,"gObj");//чо за обьект наведения 
                        if(gObj.type=="SpliceSten"){
                                                         
                            p=calc.isPointInLin(gObj.position,gObj.position1,new THREE.Vector2(e.point.x,e.point.z),200,200)
                            a=calc.getAngle(gObj.position,p)
                            if(p.z<0)a-=Math.PI
                            self.activBlok.rotation=-a-Math.PI                               
                        }
                        return
                    }

                    if(self.activBlok.parent.type=="Windows"){
                        dist=self.getDistSten(self.activBlok.parent.sten,e.point)
                        self.activBlok.setPosition(dist,0,self.activBlok.parent.height-e.point.y)
                        if(self.dDebug)self.dDebug.upDate()                        
                      
                        return
                    }
                }     
               
            }
        }

        this.out = function (e) {   
            
        }
        var gObj, bbb,p
        this.over = function (e) {
           

            if(self.activBlok!=undefined){
                if(self.activBlok.parent!=undefined){    
                    gObj=self.getParName(e.target,"gObj");//чо за обьект наведения 
                    
                    if(gObj!=null){
                        
                        if(self.activBlok.inSten==true){//прыгалка для окон
                            bbb=false;
                            if(self.activBlok.parent.idRandom!=gObj.idRandom){   
                                bbb=true                            
                            }
                            if(self.activBlok.parent.type=="Windows"){
                                if(gObj.windows)
                                if(self.activBlok.parent.idRandom==gObj.windows.idRandom){   
                                    bbb=false                                
                                }
                            }

                            if(bbb==true){
                                if( gObj.addBlok != undefined){
                                    let b=false;
                                    self.activBlok.rotation=0
                                    if(self.activBlok.parent.type=="Windows")b=self.activBlok.parent
                                    self.activBlok.parent.removeBlok(self.activBlok)
                                    

                                    if(b!=null && gObj.type!="SpliceSten"){
                                        p=calc.isPointInLin(b.sten.position,b.sten.position1,new THREE.Vector2(e.point.x,e.point.z),2000,2000)
                                        a=calc.getAngle(b.sten.position,p)                                        
                                        if(p.z<0)a-=Math.PI
                                        self.activBlok.rotation=-a-Math.PI                             
                                    }

                                    var t=gObj.addBlok(self.activBlok)                                    
                                    if(t==false){
                                        
                                        if(self.activBlok.parent!=undefined){
                                            self.activBlok.parent.remove(self.activBlok)                                            
                                        }
                                        //self.activBlok.life=false;
                                        //self.activBlok=undefined
                                        return;

                                    }
                                    self.activBlok.activMouse=false                                
                                    if(self.dDebug)self.dDebug.addColl(self.activBlok.parent.collision)
                                    self.move(e)
                                    self.activBlok.render() 
                                    return;
                                }
                            }
                            return; 
                        }


                        if(self.activBlok.inSten==false){//все остольные обьекты
                            
                            if(gObj.type=="SpliceSten"){
                                self.activBlok.render() 
                                                           
                            }
                        }                        
                    }                 
                }else{
                   
                    //if(gObj.type=="SpliceSten"){
                        
                      
                        gObj=self.getParName(e.target,"gObj");//чо за обьект наведения 
                        trace(gObj)
                        var t=gObj.addBlok(self.activBlok); 
                        if(t!=false){

                            //

                            self.move(e)                                                    
                        } else{
                            if(self.activBlok.parent!=undefined){
                                self.activBlok.parent.remove(self.activBlok)                                            
                            }
                            
                        } 
                        if(self.dDebug)self.dDebug.addColl(self.activBlok.parent.collision)
                        
                    //}else{

                    //}

                }
            }else{              
                if(self.dragPic && self.dragPic.object && self.dragPic.object.typeThree && self.dragPic.object.typeThree=="Blok"){                
                    self.tipDrag="plane";
                    self.startBlok(self.dragPic.object.id, e);                 
                    self.dragPic.stop()
                    return;
                }

            }            
        }



        var blok;
        var bD=false;
        var sRotation,sRotation1,sRadius,sRadiusPlus,rOldv;
        var _pointNull=new THREE.Vector2(0,0)
        var _point=new THREE.Vector2(0,0)
        var rOld
        this.down = function (e) {  
           
            
            if(!e)return
            if(!e.target)return 


                
            blok=self.getParName(e.target,"blok")





            if(blok!=null){  
                if(e.target.name=="bhRadius"&& blok._boolSten==false){
                    bD=false

                    self.par.tukalka.start(
                        blok.content3d.parent,
                        blok.content3d.position,//new THREE.Vector3(0,0,0),
                        self.drahPoint,
                        self.stopPoint,
                        -Math.PI/2,
                        self.drahForst
                    )
                    

                    self.par.visi3D.intRend=1;
                    return
                }
                


                self.startBBB(blok)
                
            }  
        } 


        this.drahForst = function () { 
            trace(">>>>>>>drahForst>>>>>>")
            self.par.tukalka.startPoint.uv.x=0.5;
            self.par.tukalka.startPoint.uv.y=0.5;

        }


        this.drahPoint = function () { 
            _point.set(self.par.tukalka.valueX,self.par.tukalka.valueY)
            if(bD==false){
                bD=true;                
                sRotation=blok.rotation;
                sRotation1 = calc.getAngle(_pointNull, _point)
                rOldv=blok.radius
                let dd=calc.getDistance(_pointNull, _point)
                sRadiusPlus = dd-blok.radius;
                return
            }
            blok.rotation=sRotation-(calc.getAngle(_pointNull, _point)-sRotation1)            
            
            sRadius = calc.getDistance(_pointNull, _point)-sRadiusPlus;  
            if(sRadius<10) sRadius=10         
            blok.setRadiusNew(sRadius)
            blok.render()
        }

        this.stopPoint = function () {  
            bD=false;

        }

*/
    }
}
