

import { MOInfo } from './MOInfo.js';


export class MObject  {
  	constructor(par,fun) {  		
  		this.type="MObject";
  		var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param;

        this.otstup=this.param.otstup;
        this.otstup1=this.param.otstup;
        this.wh=this.param.wh;
        this.width=300;
        this.whSize=1000

        this.dCont=new DCont();
        this.dCont.y=this.otstup
        
        this.array=[];


        this.dragPic=this.par.dragPic//new DragPic(par.dCont)

        

        this.array[0]=this.moInfo=new MOInfo(this, function(s,p){});

        

        this.dragMenu=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active){
                    if(this.array[i].drag){
                        this.array[i].drag()
                    }
                }
            }
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }

        this.setObject=function(obj){
            this.clear();
                                  
            if(obj){                
                for (var i = 0; i < this.array.length; i++) {

                    //if(this.array[i].typeNa==obj.type){
                        if(this.array[i].isTest(obj)){
                            this.array[i].setObject(obj)
                        }
                        
                    //}
                }
            }
        }

        var w,h;
        this.sizeWin = function(_w,_h){  
            if(_w){
                w= _w;
                h= _h;               
            }
            for (var i = 0; i < self.array.length; i++) {
                if(self.array[i].sizeWin!==undefined){
                    self.array[i].sizeWin(w,h)
                }
            }
            
        }

        this.mSBlok
        this.setMSBlok=function(mSBlok){
            this.mSBlok=mSBlok;
            let cc=[];
            for (var i = 0; i < this.mSBlok.dCont.children.length; i++) {
                cc[i]=this.mSBlok.dCont.children[i]                
            }            
            this.mSBlok.dCont.add(this.dCont);
            this.mSBlok.sizeWin=this.sizeWin;
        }


        this.sizeWindow = function(w,h,s){ 
            //this.dCont.x=w/s-this.width -   this.otstup   
        }

        this.keydown=function(s,e,boolCTRL){           
            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].keydown)this.array[i].keydown(s,e,boolCTRL)
            }
        }
        this.keyup=function(s,e,boolCTRL){            
            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].keyup)this.array[i].keyup(s,e,boolCTRL)
            }
        }
  	}

     

}
