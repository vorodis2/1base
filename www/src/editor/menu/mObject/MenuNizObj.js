

export class MenuNizObj{
    constructor(par, fun) {         
        this.type="MenuNizObj";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(this.par.dCont);
        this._activeObject=null

        this.gpsWord=this.par.par.gpsWord;
       
        this.array=[]
        
                
        this.panel=new DPanel(this.dCont,this.param.otstup,this.param.otstup)
        this.panel.height=this.param.otstup*2+this.param.wh2

        this.dCxyz=new DCont(this.panel);
        this.dCxyz.x=this.param.otstup;
        this.dCxyz.y=this.param.otstup;

        this.noDop=new NODop(this,function(s,p){

        })

        var ww=130
        this.aRxyz=[]
        for (var i = 0; i < 3; i++) {
            let xx=i*ww;
            let inp=new DInput(this.dCxyz,xx+10,0,"",function(){
                if(isNaN(this.value*1)!=true){
                    
                    self.object.position[this.la.text]=this.value*1;
                    if(self.object.otMD!=undefined){
                        self.object.otMD();
                    }
                }
            });
            inp.timeFun=1;
            inp.setNum(0.01)
            inp.width=ww-20
            inp.idArr=i
            inp.height=this.param.wh2;
            inp.fontSize=this.param.fontSizeLittel;

            let la=new DLabel(this.dCxyz, xx, 12,"x");
            la.activMouse=false
            inp.la=la
            la.fontSize=this.param.fontSizeLittel;
            if(i==1)la.text="y"
            if(i==2)la.text="z"    
            this.aRxyz[i]=inp;
        }


        this.dragBase=function(){            
            self.drObj();
        }


        this.object=undefined
        this.setObject=function(obj){
            
            if(this.object){
                this.object.fmn=undefined;
            }
            this.object=obj;
            if(this.object!=undefined){
                this.object.fmn=this.dragBase;              
            }

            this.korectObj();
            this.drObj();
            this.noDop.setObject(obj)
        }

        this.drObj=function(){
            if(this.object && this.object.position){
                this.aRxyz[0].text=this.object.position.x
                this.aRxyz[1].text=this.object.position.y
                this.aRxyz[2].text=this.object.position.z
            }
        }

        this.korectObj = function(){

            if(this.object && this.object.position){
                for (var i = 0; i < this.aRxyz.length; i++) this.aRxyz[i].activMouse=true;
                 
            }else{
                for (var i = 0; i < this.aRxyz.length; i++) {
                    this.aRxyz[i].activMouse=false;  
                    this.aRxyz[i].text="0";
                }                
            }
            
        }
        this.korectObj()

        this.mSBlok;
        this.setMSBlok=function(mSBlok){
            this.mSBlok=mSBlok; 
            this.mSBlok.dCont.add(this.dCont);
            this.mSBlok.sizeWin=this.sizeWin
        }

        var w,h;
        this.sizeWin = function(_w,_h){  
            if(_w){
                w= _w;
                h= _h;               
            }
            self.panel.width=w-self.param.otstup*2;
            self.panel.y=h-self.panel.height-self.param.otstup;
        }

        
    }

    set activeObject(value) {       
        if (this._activeObject != value) {           
            this._activeObject = value;            
            this.mVerg.activeObject=value;
        }
    }
    get activeObject() {
        return this._activeObject;
    }
}


export class NODop{
    constructor(par, fun) {         
        this.type="NODop";
        var self=this;
        this.par=par;
        this.fun=fun;
        
        this.param = this.par.param;
        this.dCont=new DCont(this.par.panel);
        this.dCont.x=380+ this.param.otstup;
        this.dCont.visible=false;

        this.array=[];


        this.getCom=function(o){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].obj.type == o.type){
                    if(this.array[i].obj.id == o.id){
                        this.array[i].visible=true;
                        return this.array[i];
                    }
                }
            }            
            
            let ccc=null;
            if(o.type == "button"){                
                ccc=new DButton(this.dCont,this.param.otstup,this.param.otstup,"",function(){
                    if(self.object && self.object[this.obj.name])self.object[this.obj.name]()
                })
                ccc.width=ccc.height=this.param.wh2;
                ccc.obj=o;
                mhbd.getKeyId("info",o.id,function(e){
                    ccc.link=mhbd.getLink(e.icon);
                    ccc.objInfo=e;   
                })
            }

          /*  if(o.type == "button"){
                trace(">>>>>>button!!!!!>",o)
                ccc=new DButton(this.dCont,this.param.otstup,this.param.otstup,"",function(){
                    if(self.object && self.object[this.obj.name])self.object[this.obj.name]()
                })
                ccc.width=ccc.height=this.param.wh2;
                ccc.obj=o;
                mhbd.getKeyId("info",o.id,function(e){
                    ccc.link=mhbd.getLink(e.icon);
                    ccc.objInfo=e;   
                })
            }*/

            if(o.type == "input"){
                
                ccc=new DInput(this.dCont,this.param.otstup,this.param.otstup,"",function(){
                    if(self.object && self.object[this.obj.name])self.object[this.obj.name]=this.value
                })
                if(o.title!=undefined)ccc.title=o.title;
                if(o.width!=undefined)ccc.width=o.width;
                if(o.min!=undefined)ccc.min=o.min;
                if(o.max!=undefined)ccc.max=o.max;
                if(o.setNum!=undefined){
                    ccc.setNum(o.setNum);
                    ccc.bYY=false;
                }


                
                
                ccc.height=this.param.wh2;
                ccc.obj=o;               
            }


            ccc.idArr=this.array.length;
            this.array.push(ccc);

            return ccc;
        }

        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;
            }
        }

        this.object=undefined
        this.setObject=function(obj){
            this.clear()
            this.object=obj;
            this.dragKorect()
        }
        var bb
        var com
        this.dragKorect=function(){
            bb=false;
            let xx=this.param.otstup
            if(this.object){
                if(this.object.arrBut && this.object.arrBut.length!=0){
                    
                    for (var i = 0; i < this.object.arrBut.length; i++) {
                        com=this.getCom(this.object.arrBut[i]);                        
                        com.x=xx;
                        xx+=this.param.otstup+com.width; 
                        if(com.type=="DInput"){                            
                            com.value=this.object[com.obj.name]  
                        }                    
                    }
                    bb=true;
                } 
            }
            trace(this.array)
            this.dCont.visible=bb;
        }

    }
}







