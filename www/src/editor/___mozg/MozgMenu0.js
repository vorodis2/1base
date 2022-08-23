
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu0 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu0";
        var self=this;




        this.init=function(){            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();

        }





        this.time=0;      
        this.tween=new TWEEN.Tween(visi3D);
        var oOldV3d, oOldV3dNNN;
        var fov =45;
        var zM=8;
        this.dragActive=function(){
           
            visi3D.rotationZ= (visi3D.rotationZ)%(Math.PI*2)  
            


            if(this._active){
                oOldV3d=visi3D.getObj();
                oOldV3dNNN=visi3D.getObj();

                oOldV3dNNN.fov= 15;
                oOldV3dNNN.rotationX = 0;   
                oOldV3dNNN.rotationZ = 0; 
                oOldV3dNNN.zume*=zM;                
                //this.tween.to(oOldV3dNNN,this.time).start();
                //visi3D.position3d.boolDrahXZ = false;

                this.facade.sp.lineOpor=true;
                
            }else{
                visi3D.position3d.boolDrahXZ=true
                //this.tween.to(oOldV3d,this.time).start();
                
                this.facade.sp.lineOpor=false;
            }
            visi3D.intRend=1
        }
    }
}


