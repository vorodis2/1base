

import { Base } from '../Base.js';
export class PipeNetworks extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="PipeNetworks";
        var self=this; 
       

        
        





        this.postSetObject=function(){          
            
           /* this.objectKey=this.object;
            if(this.object["Surface"].length==undefined){
                
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
    }
}

