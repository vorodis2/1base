
import { PipeNetwork } from './PipeNetwork.js';
import { Base } from '../Base.js';
export class PipeNetworks extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="PipeNetworks";
        var self=this; 
       

        this.pipeNetwork = new PipeNetwork(this,this.sob);
        this.add(this.pipeNetwork);
        




        this.keyObj="PipeNetwork"
        this.postSetObject=function(){ 
            
            this.objectKey = this.object;
            if(this.object[this.keyObj]){
                this.pipeNetwork.setObject(this.object[this.keyObj]); 
            }    
        }       
    }
}

