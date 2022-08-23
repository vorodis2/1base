
import { MStructure } from './MStructure.js';

export class MenuGPS  {
    constructor(par, fun) {         
        this.type="MenuGPS";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(this.par.dCont);
        this._activeObject=null

        this.gpsWord=this.par.par.gpsWord;
        this.gpsWord.menuGPS=this;
        this.array=[]
        window.menuGPS=this;

        this.mVerg=new MVerg(this);
        this.mUpLocal=new MUpLocal(this);
        this.mStructure=new MStructure(this,function(s,p){})

        this.open=function(p,p1){
            let model = self.gpsWord.hronBig.getModelToPath(p);  
            
            if(model){
                self.gpsWord.activeObject=model
                return    
            } 

            mhbd.setPHP({tip:"getText",dir:p},  function(data){                               
                var d=uXml.testToDOM(data); 
                var o= JSON.parse(uXml.xml2json(d));
                var g=self.gpsWord.setObjPath(o,p);
                //self.gpsWord.utility.korektPosit(g);            
                self.udDrag();
                self.gpsWord.activeObject=g;                                            
            })
        }

        this.udDrag=function(){
            self.mVerg.udDrag(); 
            self.mUpLocal.udDrag();            
        }    
        

    
     

        this.mSBlok
        this.setMSBlok=function(mSBlok){
            this.mSBlok=mSBlok;
            let cc=[];
            for (var i = 0; i < this.mSBlok.dCont.children.length; i++) {
                cc[i]=this.mSBlok.dCont.children[i]                
            }
            
            this.mSBlok.dCont.add(this.dCont);
        }



        this.keydown=function(s,e,boolCTRL){           
            this.mVerg.keydown(s,e,boolCTRL)
        }
        this.keyup=function(s,e,boolCTRL){            
            this.mVerg.keyup(s,e,boolCTRL)
        }
        
    }

    set activeObject(value) {       
        if (this._activeObject != value) {           
            this._activeObject = value;            
            this.mVerg.activeObject=value;
            this.mStructure.activeObject=value;
            menuBig.setObject(this._activeObject);

        }
    }
    get activeObject() {
        return this._activeObject;
    }
}




export class MUpLocal  {
    constructor(par, fun) {         
        this.type="MUpLocal";
        var self=this;
        this.par=par;
        this.fun=fun;


        this.udDrag=function(){
            let o={};
            o.array=[];
            o.index=-1;
            for (var i = 0; i < this.par.mVerg.array.length; i++) {
                if(this.par.mVerg.array[i].life==false)continue
                if(this.par.mVerg.array[i].active==true)o.index=o.array.length    
                o.array.push({path:this.par.mVerg.array[i].path})                
            }
            localS.object["p_MenuGPS_MUpLocal"]=o;          
            localS.save();
                       
        }  





        var ol=undefined;
        var oa=[]

        this.dragLocal=function(){ 
            for (var i = 0; i < oa.length; i++) {
                if(oa[i].date==null)return
            } 
            if(ol.array && ol.array.length!=0){
                if(ol.array[ol.index]==undefined || ol.index==-1){
                    ol.index=0                             
                }
            } 

            for (var i = 0; i < oa.length; i++) {
                var g=self.par.gpsWord.setObjPath(oa[i].date,oa[i].path)
                oa[i].g=g
                if(ol.index==i){
                    self.par.gpsWord.utility.korektPosit(g);            
                    self.par.udDrag();
                    self.par.gpsWord.activeObject=g;   
                }
            }


            //позицеонирукм
            for (var i = 0; i < oa.length; i++) {                
                if(ol.index==i){
                    self.par.gpsWord.utility.korektPosit(oa[i].g);            
                    self.par.udDrag();
                    self.par.gpsWord.activeObject=oa[i].g; 
                    return  
                }
            }
        }



        if(localS.object["p_MenuGPS_MUpLocal"]!=undefined){            
            ol=localS.object["p_MenuGPS_MUpLocal"];
            oa.length=0;
           
            for (var i = 0; i < ol.array.length; i++) {
                oa[i]={
                    path:ol.array[i].path,
                    date:null,
                    bLoad:false
                }
            }
            for (var i = 0; i < oa.length; i++) { 
              

                let ooo=oa[i]
                mhbd.setPHP({tip:"getText",dir:ooo.path},  function(data){ 
                                                
                    var d=uXml.testToDOM(data)                    
                    ooo.date = JSON.parse(uXml.xml2json(d))  
                    ooo.bLoad=true;
                    self.dragLocal();
                    
                })
            }
            
        }  
      /*  this.testLoad=function(a,o){
            var b=true;
            for (var i = 0; i < a.length; i++) {
                if(a[i].bLoad==false)b=false;
            }
            if(!b)return;

            trace("===@==!!!!")      

        }*/

    }
}



//верхние меню, с открытыми файлами
export class MVerg  {
    constructor(par, fun) {         
        this.type="MVerg";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(this.par.dCont);
        this._activeObject = null
        this.dCont.x=this.param.otstup
        this.dCont.y=this.param.otstup

        var gpsWord=this.par.gpsWord;
        var aModel=gpsWord.hronBig.aModel;

        this.sob=function(s){       

            
            if(s=="closed"){
                if(this.boolDrag==true){
                    let _model=this.model
                    let _but=this
                    mMessage.set(
                        " Сохронить фаил?",
                        "В файле были изменнеия, возможно надо его сохронить?",
                        function Сохронить_и_Закрыть(){
                            _but.save(function(){
                                _model.clear();
                            })
                        },
                        function Закрыть(){
                            _model.clear();
                        },
                        
                    )
                    return; 
                }
                this.model.clear();
                return;
            }
            trace(gpsWord.activeObject.uuid+"==="+this.model.uuid)

            if(gpsWord.activeObject && gpsWord.activeObject.uuid===this.model.uuid){
                gpsWord.utility.korektPosit(this.model, 500);                
            }
            gpsWord.activeObject = this.model;              
            self.par.mUpLocal.udDrag()/**/
            
        }    


        this.array=[];
        this.arrayCesh=[];

        this.getBut=function(){
            for (var i = 0; i < this.arrayCesh.length; i++) {
                if(this.arrayCesh[i].life==false){
                    this.arrayCesh[i].life=true                
                    return this.arrayCesh[i]
                }
            }
            let b=new DBut(this.dCont,0,0,"xz",this.sob)
            b.idArrCesh=this.arrayCesh.length;
            this.arrayCesh[this.arrayCesh.length]=b;
            return b;
        };

        this.drahArrPosit=function(){
            var xx=0;
            for (var i = 0; i < this.array.length; i++) { 
                if(this.array[i].life==false)continue;               
                this.array[i].x=xx;
                xx+= this.array[i].width;
                
            }
        }


        this.udDrag=function(){
            this.drahArr(); 
        }

        this.drahArr = function(){
            let bb1=false
            for (var j = 0; j < this.array.length; j++) {
                this.array[j].polno = false
            }

            for (var i = 0; i < aModel.length; i++) {//сверяем массивы на открытие
                if(aModel[i].life==true){
                    let b=true; 
                    for (var j = 0; j < this.array.length; j++) {
                        if(this.array[j].path==aModel[i].path){
                            b=false;
                            this.array[j].polno=true
                        }                    
                    }

                    if(b){
                        let bb=this.getBut();
                        bb.setModel(aModel[i]);
                        this.array.push(bb);
                        bb.life=true
                        bb1=true;
                    }
                }
            }
            for (var i = this.array.length - 1; i >= 0; i--) {
                if(this.array[i].polno==false){
                    this.array[i].life=false;
                    bb1=true
                }
            }          

            if(bb1){
                this.drahArrPosit()
            }
        }

        this.funSave=function(dBut,fun){
            dBut.save(fun)
        }


        this.testSave=function(){
            for (var i = this.array.length - 1; i >= 0; i--) {
                if(this.array[i].life!=false){
                    if(this.array[i].active!=false){                        
                        if(this.array[i].boolDrag==true){
                            this.funSave(this.array[i])
                        }
                    }
                }
            }
        }


        this.keydown=function(s,e,boolCTRL){
            if(s=="save") this.testSave();   
        }
        this.keyup=function(s,e,boolCTRL){            
            
        }


    }
    set activeObject(value) {       
        if (this._activeObject != value) {           
            this._activeObject = value;  
            for (var i = 0; i < this.array.length; i++) {
                if(this._activeObject && this.array[i].path==this._activeObject.path){
                    this.array[i].active=true;
                }else{
                    this.array[i].active=false;
                }
            } 
        }
    }
    get activeObject() {
        return this._activeObject;
    }
}




export class DBut extends DButton {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(null, _x, _y, _text, null, _link);
        this.type = 'DBut';
        var self = this;
        this.dContPar=dCont
        this._life=false;
        this._active=false;
        this._boolDrag = false;
        this.borderRadius=5;
        this.boolLine=false;     

        this.height= this.height+10;
        this._fun=_fun;

        this.fun=function(){
            
            self._fun("down");


        }

        var yy=10;

        this.but=new DButton(this,0,yy,"x",function(){
            self._fun("closed");
        })  
        this.but.width= this.but.height=7
        this.but.colorText=dcmParam.colorText1
        this.but.label.bold=true
        this.but.label.x-=2;
        this.but.label.y-=2;
        this.but.boolFond=false;
        this.but.borderRadius=10;
        this.but.color=dcmParam.colorText1;
        self.but.label.x=0;
        self.but.label.y=0;

        this.label.textAlign = 'left';
        this.label.y=yy;
        this.label.activMouse =false
        this.but.label.activMouse =false  
        self.but.label.y=-3;
        self.but.label.x=0;
        this.setSaveModel=function(bool){
            if(bool==true){
                self.but.text=""
                self.but.boolFond = true;                
                self.but.label.x=0;
                self.but.label.y=-3;
            }else{
                self.but.text="x"
                self.but.boolFond = false;

                self.but.label.x=0;
                self.but.label.y=-3;
            }
        }  

        this.path="xzNull";
        this.name="xzNullxzNull";
        this.model=undefined;
        this.setModel=function(model){
            this.model=model;
            this.path=this.model.path;
            this.model.menu=this
            var a=this.path.split("/");
            this.name=a[a.length-1]
            this.text=this.name;
            this.reDrag2();
            
        }

        this.save=function(fun){
           
            this.boolDrag=false
            this.model.boolDrag=false;
            let path=this.model.path;
            let text=uXml.json2xml(this.model.object,"");;                            
            var o={
                text:text,
                tip:"saveJSON",
                link:path
            }            
            mhbd.setPHP(o, function(date){
                if(fun)fun()
            })/**/
        }



        this.reDrag=function(){
            this.but.x= this._width-this.but._width-10;            
            this.label.x=10;
            this.label.y=yy-2; 
            this.panel.width = this._width;
            this.panel1.width = this._width;

            this.panel.height = this._height;
            this.panel1.height = this._height;           
        } 
        

        this._simPix=this._fontSize*8.4/14;
        this.reDrag2=function(){
            var w=this._text.length*this._simPix+10+this.but._width+20;
            this._width=99999;
            this.width=w;
        }

        //this.reDrag2();
    }


    set life(value) {
        if (this._life != value) {
            this._life = value;            
            if(this._life==true){
                this.dContPar.add(this) 
            }else{
                this.dContPar.remove(this) 
            }
            
        }
    }
    get life() {
        return this._life;
    }



    set width(value) {
        if (this._width != value) {
            this._width = value;            
            this.reDrag();
            //this.reDrag2();
        }
    }
    get width() {
        return this._width;
    }
    set text(value) {
        if (this._text != value) {
            this._text = value;
            this.label.text = this._text;
            this.reDrag2();
        }
    }
    get text() {
        return this._text;
    }

    set boolDrag(value) {
        if(this._boolDrag!=value){
            this._boolDrag= value;
            this.setSaveModel(this._boolDrag) 
                        
        }
    }    
    get boolDrag() { return  this._boolDrag;} 


    set active(value) {
        if(this._active!=value){
            this._active= value;
            if(this._active==true){ 
                this.color=dcmParam.colorActive
            }else{                
                this.color=dcmParam.color             
            } 
                        
        }
    }    
    get active() { return  this._active;} 
}






