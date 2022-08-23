
import { Breakline } from './Breakline.js';
import { Base } from './Base.js';
export class DataPoints extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="DataPoints";
        var self=this; 
       


       

        this.sob=function(s,p,p1){
            if(s=="dragPoint"){
                self.draw();
                self.fun(s,p) 
                gpsWord.render(); 
            }
        }  
        this.korektRect = function () {
            window.utility.setStartRect(this.rect);
            for (var i = 0; i < this.array.length; i++) {
                window.utility.setPointRect(this.rect,this.array[i].position);
            }
            window.utility.setFinishRect(this.rect);
            this.position._x= this.rect.x2;
            this.position._y= this.rect.y2;
            this.position._z= this.rect.z2;             
        }   
        
        this.draw = function () {      
            
            var s='';
            for (var i = 0; i < this.array.length; i++) {
                if(i==0)s+=this.array[i].position.x+" "+this.array[i].position.y+" "+this.array[i].position.z;
                else s+=" "+this.array[i].position.x+" "+this.array[i].position.y+" "+this.array[i].position.z;
            }               
            this.object.DataPoints.PntList3D=s;
        }


        this.op;
        this.postSetObject=function(){
            
            
            
            if(this.object["DataPoints"]!=undefined){
                this.objectKey=this.object["DataPoints"];
                this.op=this.object.DataPoints.PntList3D;  
                        
                this.start();   
            }                     
                      
        }


        this.array=[]
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
                p.idArr=this.array.length;
                

                

                this.array.push(p);

            }
            this.korektRect()
            this.draw(); 
           
                       
        }


          
    }


    // set name(value) {       
    //     if (this._name != value) {           
    //         this._name = value;
    //         this.object["@name"] = value;
    //     }
    // }
    // get name() {
    //     return this._name;
    // }
}

