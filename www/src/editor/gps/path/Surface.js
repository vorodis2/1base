
//import { PlaneXZ } from './PlaneXZ.js';
import { Base } from './Base.js';

import {SourceData} from './SourceData.js';

export class Surface extends Base {
    constructor(par, fun) { 
        super(par,fun);          
        this.type="Surface";
        var self=this; 
        


        
        this.object=null;
        this._life=false;



        this.sourceData = new SourceData(this,this.sob);
        this.add(this.sourceData);


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear();
            }
            this.array.length=0
        }

        this.array=[]

        this.op;
        this.postSetObject=function(){
            this.clear(); 
            this.objectKey=this.object;  
            
            this.sourceData.setObject(this.object["SourceData"])
            this.life=true    
        }
    }
}


