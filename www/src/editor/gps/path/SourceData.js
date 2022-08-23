
//import { PlaneXZ } from './PlaneXZ.js';
import { Base } from './Base.js';
import {WordBreaklines} from './WordBreaklines.js';
import {DataPoints} from './DataPoints.js';

export class SourceData extends Base {
    constructor(par, fun) { 
        super(par,fun);          
        this.type="SourceData";
        var self=this; 
        


      
        this.object=null;
        this._life=false;

 

        this.wordBreaklines = new WordBreaklines(this,this.sob);
        this.add(this.wordBreaklines);
        this.dataPoints = new DataPoints(this,this.sob);
        this.add(this.dataPoints);


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
            this.wordBreaklines.setObject(this.object)
            this.dataPoints.setObject(this.object)        
        }
    }
}


