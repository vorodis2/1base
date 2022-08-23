


export class MDKoordinat  {
    constructor(par, fun) {         
        this.type="MVVunor";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.mvbBlok=undefined
        this.window=undefined

        this.aInp=[]
        
        this.sob=function(){

        }


        this.init=function(){//вызывает вложености            
            if(this.window!==undefined)return;

            this.window = new DWindow(this.mvbBlok.dCont, 0,0,"Коордниты")
            this.window.width=200;
            
            this.setWW(["x","y","z"],0,"xyz");
            this.setWW(["x","y","z"],1,"xy2"); 

            this.setWW(["x","y","z"],2,"WGS84");
            this.setWW(["x","y","z"],3,"UTM");
            this.setWW(["b"],4,"box");


        }

        this.setWW=function(a,xz,t){
            var l=new DLabel(null,0,0,t)
            l.fontSize=dcmParam.fontSizeLitte;            
            this.window.addD(l);

            let oo={}
            for (var i = 0; i < a.length; i++) {
                let o=new DInput(null,0,0,"",this.sob)
                o.title=a[i]
                o.widthTitle=50;
                o.height=24;
                o.xz=xz;
                this.aInp.push(o) 
                oo[a[i]] =  o;           
                this.window.addD(o);
            }
            this.aInp[xz]=oo;
        }

        


        
    }
}
