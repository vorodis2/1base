

import {MDKoordinat } from './MDKoordinat.js';

export class MVerh  {
    constructor(par, fun) {         
        this.type="MVerh";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(); 
        this.array=[];

        

        this.init = function(){ 
            this.dCont.x=this.param.otstup*2
            this.dCont.y=this.param.otstup*2



            this.panel=new DPanel(this.dCont,-this.param.otstup,-this.param.otstup)
            this.panel.height=32+this.param.otstup*2;
            


            this.array[0]=this.mvButton=new MVButton(this,function(s,p){

            })

            this.array[1]=this.mvVunor=new MVVunor(this,function(s,p){

            })

            this.array[2]=this.mVStart=new MVStart(this,function(s,p){

            })

            this.array[this.array.length]=this.mDKoordinat=new MDKoordinat(this,function(s,p){

            })



            var bb=this.mvButton.plus("but","info",8);
            bb.setMenu(this.mvVunor)


            bb=this.mvButton.plus("but","info",9);
            bb.setMenu(this.mVStart);

            bb=this.mvButton.plus("but","info",16);
            bb.setMenu(this.mDKoordinat);



            if(localS.object["p_MVerh_MVButton_index"]!=undefined)this.mvButton.index=localS.object["p_MVerh_MVButton_index"]

               

        }

        this.setMShtora = function(mShtora){
            this.mVStart.setMShtora(mShtora)
        }


        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            this.panel.width=w/s-this.param.otstup*2

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }
        }  
        this.init();  
    }
}

///////////////////////////////////////
////////////////////////////////////

export class MVStart {
    constructor(par, fun) {         
        this.type="MVStart";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.mvbBlok=undefined;
        this.window=undefined;

        this.arrStart=["../../resources/fileLib"];    

        this.init=function(){//вызывает вложености
            if(this.mvbBlok==undefined)return;

            this.mvbBlok.dCont.add(this.window)
        }    

        this.init1=function(){//вызывает вложености    
            if(this.window!==undefined)return;

            this.window = new DWindow(null,0,0,"Начальная информация")
            this.window.width=400;
            this.window.hasMinimizeButton=false;
            this.window.dragBool=false;           

            /*mhbd.getKeyId("info",13,function(e){                
                languages.setCompObj(self.window,e,"title")
            })*/

            this.button=new DButton(this.window,this.window.width-30,2," ",function(){
                self.mvbBlok.par.index=-1;
            })
            this.button.width=this.button.height=28;
            this.button.scalePic=0.5;
            this.button.boolFond=false

            mhbd.getKeyId("info",3,function(e){
                self.button.link=mhbd.getLink(e.icon);
                mCPodskazka.setBuuton(self.button,e)
                //languages.setCompObj(self.arrComp[13],e)
            })



            var yy=this.param.otstup;
            this.arrComp=[];
            /*this.arrComp[0]=new DCheckBox(this.window.content,this.param.otstup,yy,"",function(){
                localS.object["p_MVerh_MVStart_DCheckBox"]=this.value
                localS.save()
            })
            mhbd.getKeyId("info",15,function(e){                
                languages.setCompObj(self.arrComp[0],e,"text")
            })

            if(localS.object["p_MVerh_MVStart_DCheckBox"]!=undefined){
                this.arrComp[0].value=localS.object["p_MVerh_MVStart_DCheckBox"];
            }

            yy+=this.arrComp[0].height+this.param.otstup*/
          

            let lab=new DLabel(this.window.content,this.param.otstup,yy,"Ночальная директория")
            lab.width=this.window.width
            lab.activeMouse=false
            lab.fontSize=this.param.fontSizeLittel
            /*mhbd.getKeyId("info",15,function(e){                
                languages.setCompObj(lab,e,"text")
            })*/
            yy+=lab.fontSize+this.param.otstup

            if(localS.object["p_MVerh_MVStart_arrStart"]!=undefined){
                this.arrStart=localS.object["p_MVerh_MVStart_arrStart"];
            }

            
            

            this.arrComp[1]=new DComboBox(this.window.content,this.param.otstup,yy,this.arrStart,function(){
                self.arrComp[2].value=this.array[this.index]
                
                localS.object["p_MVerh_MVStart_0_value"]=self.arrComp[1].index
                localS.save()

            })
            this.arrComp[1].height=28;
            this.arrComp[1].width=this.window.width-this.param.otstup*2
            
            if(localS.object["p_MVerh_MVStart_0_value"]!=undefined){
                this.arrComp[1].index=localS.object["p_MVerh_MVStart_0_value"]
            }

            yy+=this.arrComp[1].height+this.param.otstup;

           

            this.arrComp[2]=new DInput(this.window.content,this.param.otstup, yy, "null", function(){

            })
            this.arrComp[2].height=28;
            this.arrComp[2].width=this.window.width-this.param.otstup*3-100;
            this.arrComp[2].timeFun=100;

            this.arrComp[2].value=self.arrComp[1].array[self.arrComp[1].index]

            this.arrComp[3]=new DButton(this.window.content,this.window.width-this.param.otstup-100,yy,"+ Директ",function(){
                var b=-1
                for (var i = 0; i < self.arrComp[1].array.length; i++) {
                    if(self.arrComp[1].array[i]==self.arrComp[2].value){
                        b=i
                    }
                }
                if(b!=-1){
                    self.arrComp[1].index=b;
                    localS.object["p_MVerh_MVStart_0_value"]=self.arrComp[1].index
                    localS.save()
                }else{
                    self.arrStart.push(self.arrComp[2].value);
                    self.arrComp[1].array=self.arrStart;
                    self.arrComp[1].index=self.arrStart.length-1;
                    localS.object["p_MVerh_MVStart_0_value"]=self.arrComp[1].index
                    localS.object["p_MVerh_MVStart_arrStart"]=self.arrStart
                    localS.save()
                }
                
               // self.par.par.par.mozg.setJSKoren(self.arrComp[2].value)
                


            })
            this.arrComp[3].height=32;



           /* mhbd.getKeyId("info",17,function(e){                
                languages.setCompObj(self.arrComp[3],e,"text")
            })*/

            
            var pObject=new DParamObject(this.window.content,this.window.width,5,function(){});    
            pObject.addObject(pgjs);
            pObject.w.title="Параметры 3д";
            pObject.w.hasMinimizeButton=false;
            pObject.w.dragBool=false; 
            this.window.width=this.window.width+pObject.width+4
            this.button.x=this.window.width-30;


            yy+=this.arrComp[3].height+this.param.otstup;
            this.window.height=yy+32;



            /*if(this.arrComp[0].value)
            setTimeout(function() {
                self.par.par.par.mozg.setJSKoren(self.arrComp[2].value)
            }, 10);*/
        }


        this.setMShtora = function(mShtora){

            let yy=this.window.height-32
            let lab=new DLabel(this.window.content,this.param.otstup,yy,"Актианые меню")
            lab.width=this.window.width
            lab.activeMouse=false
            lab.fontSize=this.param.fontSizeLittel

           

            yy+=this.param.otstup*2+lab.fontSize;



            
            mShtora.dCont1.y=yy
            yy+=mShtora.panel.height+this.param.otstup
            this.window.height=yy+32
            this.window.content.add(mShtora.dCont1) 
        }


        this.init1()
    }
}

///////////////////////////////////////
////////////////////////////////////

//import { SwitchPage } from '../../component/ui/SwitchPage.js';

export class MVVGallery  {
    constructor(par, fun) {         
        this.type="MVVGallery";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this._active=false;

        this._idKey=-1;
        this._key=-1;

        //Кнопочка запоменающеяся без иницилизации
        this.init=function(){
            this.par.window
            this.dCont=new DCont(this.par.window.content)
            this.dCont.x=this.par.window.width-300
            
            
            this.gallery=new GalleryInfo(this.dCont,0,2,function(){
                trace(this.array[this.index].object);
                self.par.arrComp[2].value=this.array[this.index].object.id+"";
                self.par.drag();
            },this);
         

           
            this.gallery.width=300-this.gallery.otstup;
            this.gallery.height=390-this.gallery.otstup;
            this.gallery.kolII=1
            this.gallery.widthPic=this.gallery.width-this.gallery.otstup*2;
            this.gallery.heightPic=36;  

           /* this.switchPage=new SwitchPage(this.dCont,1,function(s,p){
                trace(s,p)
            },this.param)
            this.switchPage.dCont.y=this.gallery.height*/


           
        }
        this.setKey=function(key){
            mhbd.getKeyList(key,function(e){                
                self.setArr(e)
            }) 
        }
        this.setArr=function(arr){
            var a=[];
            for (var i = arr.length-1; i>=0 ; i--) {
                a.push(arr[i])
            }            
            this.gallery.start(a);            
        }

        this.init()
    }

 
    set key(value) {
        if (this._key != value) {
            this._key = value; 
            this.setKey(this._key)                 
        }
    }
    get key() {
        return this._key;
    }

    set idKey(value) {
        if (this._idKey != value) {
            this._idKey = value;
            var ii=-1; 
            for (var i = 0; i < this.gallery.array.length; i++) {
                if(this.gallery.array[i].object.id==this._idKey){
                    ii=i;
                    break;
                } 
            }
            this.gallery.index=ii;          
        }
    }
    get idKey() {
        return this._idKey;
    }
}




export class GalleryInfo extends DGallery {
    constructor(dCont, x, y, fun, par) { 
        super(dCont, x, y, fun); 
        this.par =  par  

        this.type="GalleryMani";
        dcmParam.addFunNotActivDiv(this.div);
        this.createZamen=function(){            
            var r=new BoxInfo(this.content, 0, 0, this.downBtn, this);  
            r.whPic=this.whPic;  
            r._widthPic = this._widthPic; // elements width
            r._heightPic = this._heightPic; // elements height    
            return r
        }


    }
}


export class BoxInfo extends DBox {
    constructor(dCont, x, y, fun, par) { 
        super( dCont, x, y, fun);                
        this.par=par
        var self=this;

        
        this.label1=new DLabel(this)
        this.label.x=2+32*2
        this.image.activMouse=false;
        var ss
        this.draw = function () {  

            this.image.width=32//60//this.image.picWidth*ss;
            this.image.height=32//60//this.image.picHeight*ss;
            this.image.x=32
            this.label1.x=2
            this.label1.width=333
            this.label1.y=32-this.label.fontSize
            
            this.label.y=32-this.label.fontSize
            this.label.activMouse=this.label1.activMouse=false
                      
            if (this.postDraw) this.postDraw();
        };








        this.startLoad = function (_obj) {
           
            this.object = _obj;
            this.image.link = mhbd.getLink(this.object.icon);
            this.image.visible = true;
            this.label.text=this.object.ru; 
            this.label.width=this.width-this.label.x;
            this.label.visible = true;
            this.label1.text=this.object.id           
            this.draw();
            self.funLoad(); 

        }    
    }
}


///////////////////////////////////////
////////////////////////////////////
export class MVVunor  {
    constructor(par, fun) {         
        this.type="MVVunor";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.mvbBlok=undefined
        this.window=undefined

        this.init=function(){//вызывает вложености
            if(this.mvbBlok==undefined)return;
            if(this.window!==undefined)return;

            this.window = new DWindow(this.mvbBlok.dCont)
            this.window.width=400; 

          


           
            this.window.hasMinimizeButton=false;
            this.window.dragBool=false;  

            this.button=new DButton(this.window,2,2," ",function(){
                self.mvbBlok.par.index=-1;
            })
            this.button.width=this.button.height=28;
            this.button.scalePic=0.5;
            this.button.boolFond=false;
            mhbd.getKeyId("info",3,function(e){
                self.button.link=mhbd.getLink(e.icon);
                mCPodskazka.setBuuton(self.button,e)
                //languages.setCompObj(self.arrComp[13],e)
            })


            this.dCreatIcon = new DCreatIcon(this.window.content,this.param.otstup,this.param.otstup,"xz",function(s,p){
                
            })

            this.dCreatIcon.window.hasMinimizeButton=false
            this.dCreatIcon.window.dragBool=false
            this.dCreatIcon.window.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 200);

            this.dCreatIcon.whFinal=64
            this.dCreatIcon.glowColor="#555555";
            this.dCreatIcon.scane.dcDrow.sahShad=2
            this.dCreatIcon.ch0.value=true
            this.dCreatIcon.lineSah=20

            for (var i = 0; i < this.dCreatIcon.arrB.length; i++) {
                this.dCreatIcon.arrB[i].visible=false
            }

            this.window.height=this.dCreatIcon.window.height+32+this.param.otstup*2;





            this.window1 = new DWindow(this.window.content,this.param.otstup*2+this.dCreatIcon.window.width,this.param.otstup,"xz")
            this.window1.width=200;
            
            this.window1.hasMinimizeButton=false;
            this.window1.dragBool=false; 
            this.window1.color=this.dCreatIcon.window.color;

            this.window.width=this.window1.width+this.window1.x+this.param.otstup+300;

            this.button.x= this.window.width-30;

            this.gallery=new MVVGallery(this,function(s,p){

            })


            mhbd.getKeyId("info",10,function(e){                
                languages.setCompObj(self.window1,e,"title")
            })
            mhbd.getKeyId("info",11,function(e){                
                languages.setCompObj(self.dCreatIcon.window,e,"title")
            })

            mhbd.getKeyId("info",12,function(e){                
                languages.setCompObj(self.window,e,"title")
            })

            this.arrKey=["info","objects3d"];
            this.arrComp=[];
            var yy=this.param.otstup;

            var lab=new DLabel(this.window1.content,this.param.otstup,yy,"keyGroup/id/creat")
            lab.width=this.window1.width
            lab.activeMouse=false
            lab.fontSize=this.param.fontSizeLittel
            yy+=lab.fontSize+this.param.otstup

            this.arrComp[1]=new DComboBox(this.window1.content,this.param.otstup,yy,this.arrKey,this.sobComp)
            this.arrComp[1].height=28;
            this.arrComp[1].width=100;


            this.arrComp[2]=new DInput(this.window1.content,this.param.otstup*2+this.arrComp[1].width,yy,"-1",this.sobComp)
            this.arrComp[2].height=28;
            this.arrComp[2].width=52;
            this.arrComp[2].timeFun=100

            this.arrComp[3]=new DButton(this.window1.content,this.param.otstup+this.arrComp[2].width+this.arrComp[2].x,yy," ",this.sobComp)
            this.arrComp[3].height=28;
            this.arrComp[3].width=28;
            this.arrComp[3].scalePic=1;
            mhbd.getKeyId("info",7,function(e){
                self.arrComp[3].link=mhbd.getLink(e.icon)
                mCPodskazka.setBuuton(self.arrComp[3],e)                
            })




            yy+=this.arrComp[3].width+this.param.otstup;

            var lab=new DLabel(this.window1.content,this.param.otstup,yy,"картинка");
            lab.width=this.window1.width;
            lab.activeMouse=false;
            lab.fontSize=this.param.fontSizeLittel;
            yy+=lab.fontSize+this.param.otstup;

            this.arrComp[4]=new DPanel(this.window1.content,this.param.otstup,yy)
            this.arrComp[4].height=128+this.param.otstup*2;
            this.arrComp[4].width=128+this.param.otstup*2;
            this.arrComp[4].color="#dddddd"

            this.arrComp[5]=new DImage(this.window1.content,this.param.otstup*2,yy+this.param.otstup)
            this.arrComp[5].height=128;
            this.arrComp[5].width=128;

            yy+=this.arrComp[4].height+this.param.otstup;

            var lab=new DLabel(this.window1.content,this.param.otstup,yy,"ru");
            lab.width=this.window1.width;
            lab.activeMouse=false;
            lab.fontSize=this.param.fontSizeLittel;
            yy+=lab.fontSize+this.param.otstup;


            this.arrComp[6]=new DInput(this.window1.content,this.param.otstup,yy,"null",this.sobComp)
            this.arrComp[6].height=28;
            this.arrComp[6].width=this.window1.width-this.param.otstup*2;
            this.arrComp[6].timeFun=100


            yy+=this.arrComp[6].height+this.param.otstup;
            var lab=new DLabel(this.window1.content,this.param.otstup,yy,"en");
            lab.width=this.window1.width;
            lab.activeMouse=false;
            lab.fontSize=this.param.fontSizeLittel;
            yy+=lab.fontSize+this.param.otstup;
            this.arrComp[7]=new DInput(this.window1.content,this.param.otstup,yy,"null",this.sobComp)
            this.arrComp[7].height=28;
            this.arrComp[7].width=this.window1.width-this.param.otstup*2;
            this.arrComp[7].timeFun=100





            yy+=this.arrComp[7].height+this.param.otstup;

            var lab=new DLabel(this.window1.content,this.param.otstup,yy,"name");
            lab.width=this.window1.width;
            lab.activeMouse=false;
            lab.fontSize=this.param.fontSizeLittel;
            yy+=lab.fontSize+this.param.otstup;
            this.arrComp[10]=new DInput(this.window1.content,this.param.otstup,yy,"null",this.sobComp)
            this.arrComp[10].height=28;
            this.arrComp[10].width=this.window1.width-this.param.otstup*2;
            this.arrComp[10].timeFun=100

            yy+=this.arrComp[10].height+this.param.otstup;





           

            this.arrComp[11]=new DButton(this.window1.content,this.arrComp[5].x,this.arrComp[5].y," ",this.sobComp)
            this.arrComp[11].height=this.arrComp[5].height;
            this.arrComp[11].width=this.arrComp[5].width;
            this.arrComp[11].boolFond =false
            this.arrComp[11].startFile();

            this.arrComp[12]=new DButton(this.window1.content,this.arrComp[5].x,this.arrComp[5].y," ",this.sobComp)
            this.arrComp[12].height=16;
            this.arrComp[12].width=16;
            this.arrComp[12].borderRadius=16;
            this.arrComp[12].color=dcmParam.colorActive;

            this.arrComp[12].fun_mouseover=function(){                
                window.mbILink.setLink(self.arrComp[5], self.arrComp[5].width/s,0,self.arrComp[5].link)         
            }
            this.arrComp[12].fun_mouseout=function(){            
                window.mbILink.active=false
            }


            this.arrComp[13]=new DButton(this.window1.content,this.arrComp[5].x,this.arrComp[5].y," ",this.sobComp)
            this.arrComp[13].height=16;
            this.arrComp[13].width=16;
            this.arrComp[13].x+=  this.arrComp[13].width+ this.param.otstup       
            this.arrComp[13].scalePic=0.5;
            this.arrComp[13].boolFond =false

            mhbd.getKeyId("info",2,function(e){
                self.arrComp[13].link=mhbd.getLink(e.icon)
                mCPodskazka.setBuuton(self.arrComp[13],e)
                //languages.setCompObj(self.arrComp[13],e)
            })


            this.arrComp[14]=new DButton(this.window1.content,this.arrComp[5].x,this.arrComp[5].y," ",this.sobComp)
            this.arrComp[14].height=16;
            this.arrComp[14].width=16;
            this.arrComp[14].x+=  (this.arrComp[13].width+ this.param.otstup) *2      
            this.arrComp[14].scalePic=0.5;
            this.arrComp[14].boolFond =false

            mhbd.getKeyId("info",4,function(e){
                self.arrComp[14].link=mhbd.getLink(e.icon)
                mCPodskazka.setBuuton(self.arrComp[14],e)
                //languages.setCompObj(self.arrComp[13],e)
            })

/*
            this.arrComp[15]=new DButton(this.window1.content,this.arrComp[5].x,this.arrComp[5].y," ",this.sobComp)
            this.arrComp[15].height=16;
            this.arrComp[15].width=16;
            this.arrComp[15].x+=  (this.arrComp[13].width+ this.param.otstup) *3      
            this.arrComp[15].scalePic=0.5;
            this.arrComp[15].boolFond =false

            mhbd.getKeyId("info",5,function(e){
                self.arrComp[15].link=mhbd.getLink(e.icon)
                mCPodskazka.setBuuton(self.arrComp[15],e)
                //languages.setCompObj(self.arrComp[13],e)
            })



            this.arrComp[16]=new DButton(this.window1.content,this.arrComp[5].x,this.arrComp[5].y," ",this.sobComp)
            this.arrComp[16].height=16;
            this.arrComp[16].width=16;
            this.arrComp[16].x+=  (this.arrComp[13].width+ this.param.otstup) *4     
            this.arrComp[16].scalePic=0.5;
            this.arrComp[16].boolFond =false

            mhbd.getKeyId("info",6,function(e){
                self.arrComp[16].link=mhbd.getLink(e.icon)
                mCPodskazka.setBuuton(self.arrComp[16],e)
                //languages.setCompObj(self.arrComp[13],e)
            })*/
            


            this.arrComp[9]=new DPanel(this.window1.content,this.param.otstup,52,"null",this.sobComp)
            this.arrComp[9].height=yy-this.arrComp[9].y-this.param.otstup;
            this.arrComp[9].width=this.window1.width-this.param.otstup*2;
            this.arrComp[9].alpha=0.5
        



            for (var i = 0; i < this.arrComp.length; i++) {
                if(this.arrComp[i])this.arrComp[i].idArr=i
            }


            this.arrComp[1].index=1;
            this.arrComp[2].value=1;

            if(localS.object["p_MVerh_MVVunor_arrComp_1_index"]!=undefined){
                this.arrComp[1].index=localS.object["p_MVerh_MVVunor_arrComp_1_index"] 
                this.gallery.key=this.arrKey[this.arrComp[1].index]
            }
            if(localS.object["p_MVerh_MVVunor_arrComp_2_value"]!=undefined){
                this.arrComp[2].value=localS.object["p_MVerh_MVVunor_arrComp_2_value"];
                this.gallery.idKey=this.arrComp[2].value;
            }
            


            this.window1.height=yy+32;

            this.drag()
        }

        this.object=undefined
        this.setObject=function(o){
            this.object=o;
            this.arrComp[9].visible=false;
            this.arrComp[6].value=this.object.ru;
            this.arrComp[7].value=this.object.en;
            this.arrComp[10].value=this.object.name;
            this.arrComp[5].link=mhbd.getLink(this.object.icon)

            localS.object["p_MVerh_MVVunor_arrComp_2_value"]=this.arrComp[2].value
            localS.object["p_MVerh_MVVunor_arrComp_1_index"]=this.arrComp[1].index
            localS.save()
            
        }


        this.drag=function(s){
            var key=this.arrComp[1].array[this.arrComp[1].index]
            var id=this.arrComp[2].value*1;
            this.arrComp[9].visible=true

            mhbd.getKeyId(key,id,function(e){
                if(e==null){
                    return
                }
                self.setObject(e)                
            })
            
           
        }


        this.sobComp=function(s){            
            let key=self.arrComp[1].array[self.arrComp[1].index]
            let id=self.arrComp[2].value*1

            if(this.idArr==1 || this.idArr==2){//Заменяем элемент
                if(this.idArr==2)self.gallery.idKey=id
                if(this.idArr==1){                    
                    self.gallery.key=key
                    self.gallery.idKey=id  
                } 
                self.drag()
            }
            if(this.idArr==6){
                
                self.object.ru=self.arrComp[6].value
                mhbd.setParam(key,id,"ru",self.arrComp[6].value+"");
            }
            if(this.idArr==7){
                self.object.en=self.arrComp[7].value
                mhbd.setParam(key,id,"en",self.arrComp[7].value);
            }
            if(this.idArr==10){
                self.object.name=self.arrComp[10].value
                mhbd.setParam(key,id,"name",self.arrComp[10].value);
            }
            
           
            if(this.idArr==3){//Показать обьект
                mhbd.creat(key,function(e){
                    self.arrComp[2].value=e.id
                    self.gallery._key="key"
                    self.gallery.key=key
                    self.gallery.idKey=e.id 
                    self.drag();
                })
            }   



            if(this.idArr==11){//загрузить картинку 
                mhbd.saveFile(this.files[0],key,id, (date)=> {                
                    
                    mhbd.getKeyId(key,id,function(e){
                        mhbd.clearFile(key,e.iconId); 
                        e.iconId=date.id;
                        e.icon=date.src;
                        mhbd.setParam(key,id,"iconId",date.id);
                        mhbd.setParam(key,id,"icon",date.src);
                        self.drag();
                    })
                })
            }

            if(this.idArr==12){//показать картинку
                var url=self.arrComp[5].link;
                var down = document.createElement('a');        
                down.href = url;            
                down.click();
            }

            if(this.idArr==13||this.idArr==14||this.idArr==15||this.idArr==16){//загрузить картинку c рисовалки
                var wh=32
                if(this.idArr==14)wh=64
                if(this.idArr==15)wh=100 
                if(this.idArr==16)wh=256  
                var s = self.dCreatIcon.scane.dcDrow.canvas.toDataURL();
                resizeImageFile(s,function(e){
                    mhbd.saveFile(e,key,id, (date)=> {                
                        
                        mhbd.getKeyId(key,id,function(e){
                            mhbd.clearFile(key,e.iconId); 
                            e.iconId=date.id;
                            e.icon=date.src;
                            mhbd.setParam(key,id,"iconId",date.id);
                            mhbd.setParam(key,id,"icon",date.src);
                            self.drag();
                        })
                    })
                },wh,wh)

               
            }


        } 

        function resizeImageFile(b64, fun, _w, _h,_name, _boolB64) {            
            const img = new Image();
            img.onload = () => {
                //fun(img);
                const elem = document.createElement('canvas');
        
                if(_boolB64==undefined)
                if(_w!=undefined && _w > img.naturalWidth){
                    fun(null);
                    return;
                }
               

                elem.width = _w==undefined ? img.naturalWidth : _w;
                elem.height = _h==undefined ? img.naturalHeight : _h;
            
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, elem.width, elem.height);

                if(_boolB64!=undefined){
                    let b6=elem.toDataURL()                    
                    fun(b6);
                    return 
                }
                ctx.canvas.toBlob((blob) => {
                    const image = new File([blob], _name==undefined ? "icon.png" : _name);
                    fun(image);
                }, 'image/png');                
            }  

            img.src = b64;           
        }



        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            

            
        }    

        
    }
}








///////////////////////////////////////
////////////////////////////////////








export class MVButton  {
    constructor(par, fun) {         
        this.type="MVButton";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this._index=-1

        this.dCont=new DCont(this.par.dCont);      

        this.array=[]
       

        this.sob=function(s,p){

        }

        
        this.plus=function(type, key, id){
            this.array.push(new MVBBlok(this,this.sob,this.array.length,type, key, id));           
            this.sizeWindow();
            return this.array[this.array.length-1];
        }




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            } 
            if(w){
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].button.x=w/s-(32+this.param.otstup)*(i+1)-this.param.otstup*3
                }
            }            
        }  
    }
    set index(value) {
        if(this._index!=value){
            this._index= value;            
            for (var i = 0; i < this.array.length; i++) {
                if(this._index == i){
                    this.array[i].active=true
                }else{
                    this.array[i].active=false
                }
            } 
            localS.object["p_MVerh_MVButton_index"]=value;
            localS.save()               
        }
    }    
    get index() { return  this._index;} 
}


export class MVBBlok  {
    constructor(par, fun, idArr,type, key, id) {         
        this.type="MVBBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this._active=false;
        this.idArr=idArr
        this.dCont=new DCont();

        this.dCont.x=-this.param.otstup
        this.dCont.y=32+this.param.otstup;


        this.button=new DButton(this.par.dCont,0,0," ",function(){
            if(self._active==true){
                self.par.index=-1;
                return
            }
            self.par.index=self.idArr;
        })
        this.button.width=this.button.height;
        this.button.scalePic=0.5;


        this.menu
        this.setMenu=function(menu){
            this.menu=menu;
            this.menu.mvbBlok=this;
        }

        mhbd.getKeyId(key,id,function(e){
            self.button.link=mhbd.getLink(e.icon);
            mCPodskazka.setBuuton(self.button,e);            
        })



    }

    set active(value) {
        if(this._active!=value){

            this._active= value;              
            if(this._active==true){
                this.par.dCont.add(this.dCont)
                this.button.color=dcmParam.colorActive
                if(this.menu&&this.menu.init)this.menu.init()
            }
            else {
                this.par.dCont.remove(this.dCont)
                this.button.color=dcmParam.color
            }     
        }
    }    
    get active() { return  this._active;} 
}
