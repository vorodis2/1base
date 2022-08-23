
import { WordSurface } from './WordSurface.js';
import { PipeNetworks } from './pipeNetworks/PipeNetworks.js';
import { Base } from './Base.js';
export class Model extends Base {
    constructor(par, fun) {
        super(par,fun);      
        this.type="Model";
        var self=this;      

        this.object=null
        

        this.boolDrag = false;
        this.menu=undefined;

        

        this.wordSurface= new WordSurface(this, function(s,p,p1){
            if(s=="dragPoint"){ 
                self.boolDrag = true;
                self.menu.boolDrag = true; 
            }
        })
        this.add(this.wordSurface);
        

        this.pipeNetworks= new PipeNetworks(this, function(s,p,p1){
            if(s=="dragPoint"){ 
                self.boolDrag = true;
                self.menu.boolDrag = true; 
            }
        })
        this.add(this.pipeNetworks);

        //this.children[0]=this.wordSurface;
        //this.wordSurface.parent=this;

        this.clear=function(){            
            this.life = false;
            this.par.menuGPS.udDrag();
            visi3D.intRend=1
        }

        this.nizCreatObj=function(_base,_o){            
            

            if(_base.type=="PipeNetworks"){

                this.objectKey["PipeNetworks"]=_o;
                this.pipeNetworks.setObject(this.objectKey["PipeNetworks"])
            }
                
        }



        this.objectKey=null
        this.postSetObject=function(){          
            this.clear();
            this.objectKey=this.object["LandXML"];            
            if(this.objectKey && this.objectKey["Surfaces"]){
                this.wordSurface.setObject(this.objectKey["Surfaces"])
            } 
            
            if(this.objectKey["PipeNetworks"]){
                this.pipeNetworks.setObject(this.objectKey["PipeNetworks"])
            }

            this.korektRect(); 
             
                  
        }




        this.dragLife=function(){
            if(this._life){
                this.par.content3d.add(this.content3d)
            }else{
                this.par.content3d.remove(this.content3d)
            }
        }

       

    }
   
}







