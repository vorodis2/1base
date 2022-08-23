
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu1 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu1";
        var self=this;

        this.init=function(){            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();

        }

       


        this.dragActive=function(){
            if(this._active){
                this.facade.sp.activeVephPoint=true;
            }else{
                this.facade.sp.activeVephPoint=false;
            }
            visi3D.intRend=1
        }
    }

}


