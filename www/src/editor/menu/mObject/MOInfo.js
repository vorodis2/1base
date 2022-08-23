

import { MOBaza } from './MOBaza.js';

export class MOInfo extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOInfo";
        this.arrayType=[]//"Point3D","Model","WordSurface","Surface","SourceData","WordBreaklines","Breakline","DataPoints"];
  		
        for (var i = 0; i < menuBig.arrClass.length; i++) {
            this.arrayType.push(menuBig.arrClass[i].type)
        }
        this.arrayType.push("Point3D");

        var self=this;       

        this.dCont=new DCont(par.dCont);

        this.whSize=1;
        this.button=undefined;
        this.slid;
        this.slid1;
        this.bool=true;
        this._otstup=5

        this.postIn=function(){ 
            var yy=this.otstup;
            this.infpPzat=new InfpPzat(this.dCont,"Параметры",function(s,p){
                gpsWord._activeObject.menu.boolDrag = true;
                gpsWord._activeObject.boolDrag = true;
                if(p=="name"){

                } 
            });
            this.infpPzat.forstSim= "@";

            this.infpPzat1=new InfpPzat(this.dCont,"Feature",function(s,p){
                gpsWord._activeObject.menu.boolDrag = true;
                gpsWord._activeObject.boolDrag = true; 
            });

            this.ipXz=new IPXz(this.dCont,"Points",function(s,p){
               
                if(s=="downCB"){
                  
                    self.par.par.setObject(self.object.children[p])
                }
            });


            this.sizeWin()
        }

        
        var pp
        this.drag=function(){
            
            this.whSize=10;
            if(self.bool!=false){
                let yy=0;
                self.objectStart.activeOne=true;
                this.infpPzat.y=yy;
                this.infpPzat.set(this.object.objectKey)
                yy+=this.infpPzat.height;
                let oe=null

                if(this.object.objectKey && this.object.objectKey.Feature){
                    oe=this.object.objectKey.Feature;                    
                }
                this.infpPzat1.y=yy;
                this.infpPzat1.set(oe);
                yy+=this.infpPzat1.height; 

                if(this.ipXz.active==true){
                    this.ipXz.y=yy;
                }               
            }            
        }

        this.objectStart;//ночальный обьект, точки и другие его искожают

        this.postSO=function(){ 
            this.bool=true;
            let boolP=false;
            let bos=true;

            this.objectStart = this.object;
            if(this.object.type == "Breakline" ||this.object.type == "DataPoints" || this.object.type == "Pipe"){
                boolP=true;
                let a=[];                
                for (var i = 0; i < this.object.children.length; i++) {
                    a.push(i);
                }
                a.push("null");
                this.ipXz.setArray(a)
                this.ipXz.index=a.length-1;
            }
            if(this.object.type == "Point3D"){
                                 
                let oPar=this.object.par;
                
                let ii=-1
                boolP=true;
                let a=[];                
                for (var i = 0; i < oPar.children.length; i++) {
                    a.push(i);
                    if(this.object.uuid==oPar.children[i].uuid)ii=i
                }
                a.push("null");
                this.ipXz.setArray(a)
                this.ipXz.index=ii;

                this.object=oPar;

                //self.objectStart.activeOne=true;
                


            }

            self.object.activeOne=true;
            

            this.ipXz.active=boolP;           

            menuGPS.mStructure.setObjBase(this.object);

            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.bool=true;                
                self.object.activeOne=false;
                self.objectStart.activeOne=false;
                //this.object.arrayClass[0].funDragMenu=undefined;
            }
            this.active=false
        }

        var w,h;
        this.sizeWin = function(_w,_h){  
            if(_w){
                w= _w;
                h= _h;               
            }
            if(this.infpPzat){
                this.infpPzat.width=w-this._otstup*2;
                this.infpPzat1.width=w-this._otstup*2;
                this.ipXz.width=w-this._otstup*2;
            }
            
            
        }

        this.isTest=function(o){
            for (var i = 0; i < this.arrayType.length; i++) {
                if(o.type==this.arrayType[i])return true;
            }
            return false;
        }

        this.keydown=function(s,e,boolCTRL){           
            
            let b=true;
            
            if(e.keyCode==46 || e.keyCode==8){
                
                if(dcmParam.getFocus()==null){
                    if(self.objectStart.kill){ 
                        self.objectStart.kill()                        
                    }                    
                }
            }            
        }
        
        this.keyup=function(s,e,boolCTRL){            
           
            
        }
        
  	}

    set index(value) {
        if(this._index!=value){
            this._index= value;                  
        }
    }  

}

export class IPXz {
    constructor(dCont,name,fun) {  
        
        this.type="IPXz";        
        var self=this; 
        this.dC=dCont;
        this.fun=fun;
        this._height=500;
        this._active=true;
        this._y=0;
        this._width=100;
        this._otstup=5;
        this.dCont=new DCont(dCont);
        this._index=-1
        

        this.label=new DLabel(this.dCont,this._otstup,this._otstup,name)//"Параметры");
        this.panel=new DPanel(this.dCont,this._otstup,this._otstup*2+this.label.fontSize);
        this.dComboBox=new DComboBox(this.panel,this._otstup,this._otstup,null,function(){
            self.fun("downCB",this.index)
        });
        this.dComboBox.height=24;
        this._height=this.panel.y+this._otstup*2+24;
        this.panel.height=this._height-this.panel.y;

        this.arr=[]
        this.setArray=function(a){
            this.arr=a;
            this.dComboBox.array=a;
        }

    }

     set index(value) {       
        if (this._index != value) {           
            this._index = value;            
            this.dComboBox.index=value;
        }
    }
    get index() {
        return this._index;
    }
       
    set y(value) {       
        if (this._y != value) {           
            this._y = value;            
            this.dCont.y=this._y
        }
    }
    get y() {
        return this._y;
    }
    set width(value) {       
        if (this._width != value) {           
            this._width = value;            
            this.panel.width=value; 
            this.dComboBox.width=value-this._otstup*2;
        }
    }
    get width() {
        return this._width;
    }

    set active(value) {       
        if (this._active != value) {           
            this._active = value;            
            if(this._active){
                this.dC.add(this.dCont);
            }else{
                this.dC.remove(this.dCont);
            }
        }
    }
    get active() {
        return this._active;
    }  
}


export class InfpPzat {
    constructor(dCont,name,fun) {  
        
        this.type="InfpPzat";        
        var self=this; 
        this._height=0;
        this._y=0;
        this._width=100;
        this._otstup=5;
        this.dCont=new DCont(dCont);
        
        this.label=new DLabel(this.dCont,this._otstup,this._otstup,name)//"Параметры");
        this.panel=new DPanel(this.dCont,this._otstup,this._otstup*2+this.label.fontSize);

        this.array=[]
        this.parArr=[]

        this.forstSim=null;

        this.sob=function(s,p){
            self.object[this.paramDin]=this.value;
            fun("save", this.paramDin)
        } 

        this.clear=function(o){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible = false
            }
        }

        this.object    
        this.set=function(o){
            this.clear();
            let b=true;
            let b1=false
            this.object = o
            if(o==null)b=false;
            if(b==true){
                this.dCont.visible=true;
                this.parArr.length=0
                for(var s in o){
                    b1=true;
                    if(this.forstSim){
                        if(s[0] && s[0]!==this.forstSim)b1=false
                    }

                    if(b1 && typeof o[s] !=="object"){
                        this.parArr.push(s)
                    }
                }
                
                var zy=dcmParam.fontSizeLitte+this._otstup                
                for (var i = 0; i < this.parArr.length; i++) {
                    if(this.array[i]==undefined){
                        this.array[i]=new DInput(this.panel, this._otstup,zy+(dcmParam.wh2+zy)*i," ",this.sob)
                        this.array[i].idArr=i;
                        this.array[i].label=new DLabel(this.array[i],1,-zy+this._otstup,"g!!")
                        this.array[i].label.activMouse=false;
                        this.array[i].label.width=333;
                        this.array[i].label.fontSize=dcmParam.fontSizeLitte;
                        this.array[i].height = dcmParam.wh2;
                        this.array[i].width = this.panel.width-this._otstup*2;
                        this.array[i].timeFun=1
                    }
                    this.array[i].paramDin=this.parArr[i];
                    this.array[i].value=o[this.parArr[i]];
                    this.array[i].label.text=this.parArr[i].slice(1);
                    this.array[i].visible=true 
                }

                this.panel.height=this.parArr.length*(dcmParam.wh2+zy)+this._otstup
                this._height=this.panel.height+this.panel.y;
            }else{
                this.dCont.visible=false;
                this._height=0;
            }            
        }

    }

    set width(value) {       
        if (this._width != value) {           
            this._width = value;            
            this.panel.width=value; 
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].width=value-this._otstup*2; 
            }
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {       
        if (this._height != value) {           
            this._height = value;
        }
    }
    get height() {
        return this._height;
    } 
    set y(value) {       
        if (this._y != value) {           
            this._y = value;            
            this.dCont.y=this._y
        }
    }
    get y() {
        return this._y;
    }
}