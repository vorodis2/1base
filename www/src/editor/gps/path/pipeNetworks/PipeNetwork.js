
import { Pipes } from './Pipes.js';
import { Base } from '../Base.js';
export class PipeNetwork extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="PipeNetwork";
        var self=this; 
       

       
        
        
        this.pipes = new Pipes(this,this.sob);
        this.add(this.pipes);




        this.keyObj="Pipes"
        this.postSetObject=function(){          
            this.objectKey = this.object;
            /*
            vorodis2@gmail.com
            */ 
            if(this.object[this.keyObj]){
                this.pipes.setObject(this.object[this.keyObj]); 
            } /**/

            /*this.objectKey=this.object;
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

