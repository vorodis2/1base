
import { Surface } from './Surface.js';
import { Base } from './Base.js';
export class WordSurface extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="WordSurface";
        var self=this; 
       

 

        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false;
            }
            this.children.length=0;
        }

            
        
        this.array=[]; 
        this.getCreat=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){                    
                    return this.array[i]
                }
            } 
            let g= new Surface(this, this.sob);
            g.idArr=this.array.length;
            this.array.push(g); 

            return g;
        }


        this.postSetObject=function(){          
            this.clear(); 
            this.objectKey=this.object;
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
            } 
                 
        }       
    }
}

