

import { PositionFun } from './PositionFun.js';
export class Base  {
    constructor(par, fun) {         
        this.type="Base";
        var self=this;
        this.par=par;
        this.fun=fun; 
        this.uuid=calc.generateRendom();

        this.content3d=new THREE.Object3D();

        // //функции обьекта
        // this.arrBut=[
        //     {id:10, type:"button", name:"kill"},
        //     {id:11, type:"button", name:"copy"},
        // ]
        //функции обьекта
        this.arrBut=[]

        this._life=false;
        this._active=false;
        this._name=null;
        this._activeModel=false;//Активность всей модели

        this.idArrCesh=-1;
        this.idArr=-1;

        this.object=null;
        this.objectKey=null;

        this.children=[]
        this.parent=null;
        this.rect=new Rect3d();

        this.fmn=undefined

        this.krBool=true

       // this.v3=new THREE.Vector3();
        this.funPozition=function(){
            //trace(this.uuid+"::"+self.fmn )
            if(self.fmn!==undefined)self.fmn();
            
            self.funPozitionLoc();

           
        }
        this.funPozitionLoc=function(){
           /* self.v3.x = self.rect.x2-self.position._x;
            self.v3.y = self.rect.y2-self.position._y;
            self.v3.z = self.rect.z2-self.position._z;*/

            
            if(self._activeOne==true){
                
                self.krBool=false
                self.setMovePoind(self.position,true)
                self.krBool=true
            }else{
                self.korektRect();
            }
            //if(self.zdvig(self.v3)==true){                
                
            //}
            
        }


       /* var rb
        this.zdvig=function(v3){
            rb=false
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].zdvig(v3)==true){
                    rb=true
                }
            }
            return rb;
        }*/

        this.sob=function(s,p,p1){                           
            if(self.fun)self.fun(s,p);             
        } 


        this.position = new PositionFun(0,0,0,function(){            
            if(self.funPozition)self.funPozition();
        });

        this.posZdvig = new PositionFun();


        this.setStartPoind = function (v3) {
            this.posZdvig._x=this.position._x-v3.x;
            this.posZdvig._y=this.position._y-v3.y;
            this.posZdvig._z=this.position._z-v3.z;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].setStartPoind(v3);
            }
        }

        this.setMovePoind = function (v3,bool) {
            if(bool==undefined){
                this.krBool=false
                this.position.set(
                    this.posZdvig._x+v3._x,
                    this.posZdvig._y+v3._y,
                    this.posZdvig._z+v3._z
                )
                this.krBool=true                
            }  
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].setMovePoind(v3);
            }
        }





        ///////////////////
        this.add = function (base, poz) {
            this.remove(base);
            this.content3d.add(base.content3d)
            base.parent=this;
            if(poz==undefined)this.children.push(base);
            else{
                let pp=this.children.length;
                if(poz<pp){
                    pp=poz;
                }
                this.children.splice(pp,0,base)
            }

        }

        this.remove = function (base) {
            let p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==base.uuid){
                    p=i
                }
            }
            if(p==-1)return null;
            this.content3d.remove(base.content3d)
            base.parent=undefined;
            this.children.splice(p,1)

            return base;
        }

        this.kill = function () {            
            if(this.parent && this.parent.killChild && this.parent.killChild(this)==true){
                return true;
            } 
            return true           
        }

        this.killChild = function (_child ) {            
            return false;
        }

        this.copy = function () {            
            if(this.parent && this.parent.copyChild && this.parent.copyChild(this)==true){
                return;
            }            
        }

        this.copyChild = function (_child ) {            
            return false;
        }     


        ////////////////


        this.korektRect = function () {
            window.utility.setStartRect(this.rect);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].korektRect();
                window.utility.setRectRect(this.rect,this.children[i].rect);
            }
            window.utility.setFinishRect(this.rect);

            if(this.krBool==true){
                this.position._x= this.rect.x2;
                this.position._y= this.rect.y2;
                this.position._z= this.rect.z2;
            } /**/ 
            /*this.position._x= this.rect.x2;
            this.position._y= this.rect.y2;
            this.position._z= this.rect.z2; */        
        }

        this.keyObj="name";
        this.nizCreatObj=function(_base,_o){            
            trace(">>>",this.type,"<>",_base.type,_o,this.object)
            if(this.object){

            }else{
                let o={}
                o[this.keyObj]=_o;
                if(this.parent)this.parent.nizCreatObj(this, o);
                
            }     
        }

        this.setObject=function(o){            
            this.object=o;
            this._name=null;
            if(this.object["@name"])this.name=this.object["@name"]; 
            this.postSetObject();
        }
        this.postSetObject=function(){

        }

        this.setPar=function(par, fun){ 
            this.par=par;
            this.fun=fun;  
            //this.par.content3d.add(this.content3d);
        }


        this.dragActiveOne=function(){

        }

        this.dragActive=function(){

        }
        this.dragLife=function(){

        }

        this.dragActiveModel=function(){

        }

        // ОБЫТИЯ С НИЗУ
        this.drahSob=function(s,p,p1){

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].drahSob(s,p,p1);
            }
            this.drahSobPost(s,p,p1);
        }
        this.drahSobPost=function(s,p,p1){
            
        }
        ///////////////////////////////
    }

    set active(value) {       
        if (this._active != value) {           
            this._active = value;
            this.dragActive();            
        }
    }
    get active() {
        return this._active;
    }

    set activeModel(value) {       
        if (this._activeModel != value) {           
            this._activeModel = value;            
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].activeModel=value;
            }
            this.dragActiveModel() 
            
            visi3D.intRend=1                     
        }
    }
    get activeModel() {
        return this._activeModel;
    }


    set activeOne(value) {       
        if (this._activeOne != value) {           
            this._activeOne = value;
            
            /*for (var i = 0; i < this.children.length; i++) {
                this.children[i].activeOne=value;
            }*/
            visi3D.intRend=1  
            this.dragActiveOne();
            if(this._activeOne){
                this.setStartPoind(this.position) 
            }           
        }
    }
    get activeOne() {
        return this._activeOne;
    }
    


    set life(value) {       
        if (this._life != value) {           
            this._life = value;
            this.dragLife();           
        }
    }
    get life() {
        return this._life;
    }

    set name(value) {       
        if (this._name != value) {           
            this._name = value;
            if(this.object["@name"]!=value)this.object["@name"] = value;
        }
    }
    get name() {
        return this._name;
    }
}


export class Rect3d {
    constructor() {         
        this.type="Rect3d";
        var self=this;
        this.x=0;
        this.y=0;
        this.z=0;

        this.x1=0;
        this.y1=0;
        this.z1=0;

        this.x2=0;
        this.y2=0;
        this.z2=0;

        this.w=0;
        this.h=0;
        this.d=0;       
    }
}




