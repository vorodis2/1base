

export class MVisi3d  {
    constructor(par, fun) {         
        this.type="MVisi3d";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont();
        this._life = this.par._life;
      
        this.dCont.y=this.param.wh+self.param.otstup;
        this.dCont.x=self.param.otstup;

      
        this.dCont.div.appendChild(this.par.par.contHTML); 

        this.update = function(){            
            visi3D.upDate()            
        }

        this.mSBlok
        this.setMSBlok=function(mSBlok){
            this.mSBlok=mSBlok;
            this.mSBlok.dCont.add(this.dCont)
            this.mSBlok.sizeWin=this.sizeWin;            

        }
        var w,h;
        this.sizeWin = function(_w,_h){  
            if(_w){
                w= _w;
                h= _h;               
            }
            
            let hh=self.dCont.y+self.param.wh2+self.param.otstup*4;
            visi3D.sizeWindow(0,0,w-self.param.otstup*2,h-hh);
        }
    }
}



