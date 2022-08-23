/*

import { MBILink } from '../../component/ui/MBILink.js';
import { MCPodskazka } from '../../component/ui/MCPodskazka.js';


import { MVerh } from './MVerh.js';
import { MVisi3d } from './MVisi3d.js';

import { MShtora } from './MShtora.js';
import { MHelp } from './MHelp.js';

import { MFolders } from './MFolders.js';

*/

/*
import { M1Posotion } from './M1Posotion.js';
import { M2Vusota } from './M2Vusota.js';
import { M3DragObj } from './M3DragObj.js';
import { M4Lesa } from './M4Lesa.js';
import { M5Save } from './M5Save.js';

*/

import { MozgMenu0 } from './MozgMenu0.js';
import { MozgMenu1 } from './MozgMenu1.js';
import { MozgMenu2 } from './MozgMenu2.js';
import { MozgMenu3 } from './MozgMenu3.js';
import { MozgMenu4 } from './MozgMenu4.js';


export class Mozg  {
  	constructor(par, fun) {  		
  		this.type="Mozg";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 
        this.array=[]
        this.activMozg=undefined
        //бля

        this.init = function(){

            this.array[0] = new MozgMenu0(this,function(s,p,p1){
                
            });

            this.array[1] = new MozgMenu1(this,function(s,p,p1){
                
            });

            this.array[2] = new MozgMenu2(this,function(s,p,p1){
                
            });

            this.array[3] = new MozgMenu3(this,function(s,p,p1){
                
            });

            this.array[4] = new MozgMenu4(this,function(s,p,p1){
                
            });


        }



        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }
        }  

        this.init()
  	}


    set indexStep(value) {       
        if (this._indexStep != value) { 
            this._indexStep = value;
            this.activMozg=undefined;
            for (var i = 0; i < this.array.length; i++) {
                if(i!=this._indexStep)this.array[i].active=false
                else this.activMozg=this.array[i];
            }
            if(this.activMozg)this.activMozg.active=true;            
        }
    }
    get indexStep() {
        return this._indexStep;
    }
}














