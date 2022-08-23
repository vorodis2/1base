
import { Point3D } from '../Point3D.js';

import { Truba } from './Truba.js';

import { Base } from '../Base.js';
export class Pipe extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="Pipe";
        var self=this; 
        this._radius=100

        this.arrBut=[
            {id:123456, type:"input", name:"radiusDrag",title:"ddf",setNum:0.01,min:0.01,max:100},
            {id:10, type:"button", name:"kill"},
            //{id:11, type:"button", name:"copy"},
        ]  
       
        this._radiusDrag=this._radius;

        
        
        this.pipeStart=new Point3D(this,function(s,p){
            if(s=="dragPoint"){
                self.truba.dragCent()
                self.korektRect()
                visi3D.intRend=1;
                return
            }
        })
        this.add(this.pipeStart);



        this.pipeEnd=new Point3D(this,function(s,p){
            
            if(s=="dragPoint"){
                self.truba.dragCent()
                self.korektRect()
                visi3D.intRend=1;
                return
            }
        })
        this.add(this.pipeEnd);



        this.truba=new Truba(this,function(){

        })
        this.add(this.truba);
        this.truba.addPoint=this.pipeStart;
        this.truba.addPoint1=this.pipeEnd;



        this.korektRect = function () {
            window.utility.setStartRect(this.rect);
            window.utility.setPointRect(this.rect,this.pipeStart.position);
            window.utility.setPointRect(this.rect,this.pipeEnd.position);
            window.utility.setFinishRect(this.rect);  
           
            if(this.krBool==true){
                this.position._x= this.rect.x2;
                this.position._y= this.rect.y2;
                this.position._z= this.rect.z2;
            }
            

        }


        this.postSetObject=function(){          
            
            this.objectKey=this.object;
            

            if(this.object["Feature"] && this.object["Feature"][0]  && this.object["Feature"][0]["Property"]){
                let o=this.object["Feature"][0]["Property"]
                
                let aa
                let aa1
                for (var i = o.length - 1; i >= 0; i--) {
                    if(o[i]["@label"])if(o[i]["@label"]=="pipeStart")aa=o[i]["@value"].split(" ")
                    if(o[i]["@label"])if(o[i]["@label"]=="pipeEnd")aa1=o[i]["@value"].split(" ")    
                }

                this.pipeStart.position.set(aa[0]*1,aa[1]*1,aa[2]*1);
                this.pipeEnd.position.set(aa1[0]*1,aa1[1]*1,aa1[2]*1);

                if(this.object["CircPipe"] &&this.object["CircPipe"]["@diameter"]){ 
                    this.radius=  this.object["CircPipe"]["@diameter"]*1;                  
                }
                
                self.truba.dragCent();               
            }

            /*if(this.object["Surface"].length==undefined){
                
                let surface = this.getCreat();            
                surface.setObject(this.object["Surface"]); 
                this.add(surface);                
            }else{
                
                for (var i = 0; i < this.object["Surface"].length; i++) {
                    let surface = this.getCreat();            
                    surface.setObject(this.object["Surface"][i]);
                    this.add(surface);
                }
            }*/ 
                 
        }

        this.dragMaterial=function(){
            if(this._activeModel==false){
                utility.setC3DMat(this.truba.mesh,0);
            }else{
                
                if(this._activeOne==true){
                    utility.setC3DMat(this.truba.mesh,3);
                }else{
                    utility.setC3DMat(this.truba.mesh,1);
                }
            }
        }

        this.dragActiveOne=function(){            
            this.dragMaterial();            
        }
        this.dragActiveModel=function(){            
            this.dragMaterial();
        }

        this.dragLife=function(){
            if(this._life){              
                visi3D.addChildMouse(this.content3d)
            }else{              
                visi3D.removeChildMouse(this.content3d)
            }
        }       
    }

    set radius(value) {       
        if (this._radius != value) {           
            this._radius = value;
            trace("_radius===",value)
            this._radiusDrag = value;
            this.truba.radius=value; 
        }
    }
    get radius() {
        return this._radius;
    }

    set radiusDrag(value) {       
        if (this._radiusDrag != value) {           
            this._radiusDrag = value;
            this.radius=value;
            if(this.object && this.object["CircPipe"] &&this.object["CircPipe"]["@diameter"]){ 
                this.object["CircPipe"]["@diameter"]=this.radius;
                this.fun("dragPoint")
            }
        }
    }
    get radiusDrag() {
        return this._radiusDrag;
    }

  


}

