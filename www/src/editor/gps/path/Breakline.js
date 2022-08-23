

import { Base } from './Base.js';
export class Breakline extends Base {
    constructor(par, fun) { 
        super(par,fun);          
        this.type="Breakline";
        var self=this; 
        
        this.arrBut=[
            {id:10, type:"button", name:"kill"},
            {id:11, type:"button", name:"copy"},
            {id:12, type:"button", name:"convertTrub"},
        ];







        this.sob=function(s,p,p1){
            if(s=="dragPoint"){                
                self.fun(s,p); 
            }
        } 

       

        this.clear=function(){
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].clear();
            }
            this.children.length=0
        }


        this.convertTrub = function () {   
            var pipes=utilObj.getTypeClass(this, "Pipes")
            var a=utilObj.getTrubArr(this.children)

            for (var i = 0; i < a.length; i++) {
                pipes.plusObj(a[i],true)
            }
            this.kill();
            menuGPS.mStructure.reDrag();
            menuBig.setObject(pipes);

         
        }


        this.copyChild = function (_child ) {   
            
            var p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==_child.uuid){
                    p=i;
                }
            }  
            if(p!==-1){
                
                let yy=1
                let op=_child;
               
                


                let p3d=window.gpsWord.hronBig.getPoint(); 
                p3d.activeModel=this.activeModel;
                if(p!==0){
                    p3d.position.set(
                        _child.cont3d.position.x+_child.position._x,
                        _child.cont3d.position.y+_child.position._y,
                        _child.cont3d.position.z+_child.position._z
                    );
                }else{
                    
                    p3d.position.set(
                        this.children[1].cont3d.position.x+_child.position._x,
                        this.children[1].cont3d.position.y+_child.position._y,
                        this.children[1].cont3d.position.z+_child.position._z
                    );
                }
                
                p3d.setPar(this, this.sob);
                this.add(p3d, p);
                
                p3d.life=true
                this.korektLine()
                menuBig.setObject(p3d);

            }

            visi3D.intRend=1
            return true;
        }


        //удоляем из линии точку
        this.killChild = function (_child ) {             
            var p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==_child.uuid){
                    p=i;
                }
            }  
            let r=this.remove(_child);
            if(r){ 

                this.korektLine()
                this.korektRect()
                this.draw();
                _child.life=false;
                if(p!==-1){
                    let p1=-1;
                    if(this.children[p]!=undefined)p1=p;
                    if(p1==-1){
                        if(this.children[p-1]!=undefined)p1=p-1;
                    }
                    if(p1!=-1){
                        menuBig.setObject(this.children[p1]);
                    }
                }

                if(self.fun)self.fun("dragPoint", self);
            }

            

            visi3D.intRend=1
            return true;
        }

        this.korektLine = function ( ) { 
            for (var i = 0; i < this.children.length; i++) {
                
                if(i==0){
                    this.children[i].addPoint=null;
                    //this.children[i].addPoint1=null;
                }else{
                    this.children[i].addPoint=this.children[i-1];
                    this.children[i].dragCent()
                }                
            }
        }





        

        this.korektRect = function () {
            window.utility.setStartRect(this.rect);
            for (var i = 0; i < this.children.length; i++) {
                window.utility.setPointRect(this.rect,this.children[i].position);
            }
            window.utility.setFinishRect(this.rect);
            this.position._x= this.rect.x2;
            this.position._y= this.rect.y2;
            this.position._z= this.rect.z2;             
        }

        var rb;
        this.zdvig=function(v3){
            rb=false;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].position.set(
                    this.children[i].position._x+v3.x,
                    this.children[i].position._y+v3.y,
                    this.children[i].position._z+v3.z
                    )
                rb=true;
                
            }
            this.korektRect()
            this.draw()
            return rb;
        }



        this.draw = function () {          

            
            var s='';
            for (var i = 0; i < this.children.length; i++) {
                if(i==0)s+=this.children[i].position.x+" "+this.children[i].position.y+" "+this.children[i].position.z;
                else s+=" "+this.children[i].position.x+" "+this.children[i].position.y+" "+this.children[i].position.z;
            }               
            this.object.PntList3D=s;
            
        }



        this.op;
        this.postSetObject=function(){
             
            this.objectKey=this.object;                      
            this.op=this.object.PntList3D;          
            this.start();            
        }

        this.sob=function(s,p,p1){
            if(s=="dragPoint"){
                self.draw();
                self.fun(s,p) 
                gpsWord.render(); 
            }
        }


        this.start=function(){ 
            var a=this.op.split(" ");
            for (var i = 0; i < a.length; i++) {
                a[i]*=1
            }

            for (var i = 0; i < a.length; i+=3) {
                let p=window.gpsWord.hronBig.getPoint();                
                p.position.set(a[i],a[i+1],a[i+2]);
                p.setPar(this, this.sob);
                this.add(p);
                p.life=true
                p.idArr=this.children.length;

                /*if(i!=0){
                    p.addPoint=this.children[this.children.length-1];
                }
                if(i==1){
                    p.addPoint1=this.children[0];
                }
                this.children.push(p);*/
            }
            this.korektLine()
            this.korektRect()
            this.draw();            
        }

        this.dragActiveOne=function(){
            for (var i = this.children.length - 1; i >= 0; i--) {
                this.children[i].dragActiveModel()
            }
        }

    }
}


