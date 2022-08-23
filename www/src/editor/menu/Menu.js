import { MBILink } from '../../component/ui/MBILink.js';
import { MCPodskazka } from '../../component/ui/MCPodskazka.js';
import { MVerh } from './MVerh.js';
import { MVisi3d } from './MVisi3d.js';
import { MShtora } from './MShtora.js';
import { MHelp } from './MHelp.js';
import { MFolders } from './MFolders.js';
import { MenuThree } from './menuThree/MenuThree.js';
import { MObject } from './mObject/MObject.js';
import { MenuGPS } from './gps/MenuGPS.js';
import { MenuNizObj } from './mObject/MenuNizObj.js';
import { MMessage } from './MMessage.js';




export class Menu  {
  	constructor(par, fun) {  		
  		this.type="Menu";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 
        this.array=[]
        
        this.arrClass=[
            {id:0,type:"Model",         help:"основной содержит все, корень"},
            {id:1,type:"WordSurface",   help:"ветка точки/линии"},
            {id:2,type:"Surface",       help:"основной содержит все, корень"},
            {id:3,type:"WordBreaklines",help:"основной содержит все, корень"},
            {id:4,type:"Breakline",     help:"основной содержит все, корень"},
            {id:5,type:"SourceData",    help:"основной содержит все, корень"},
            {id:6,type:"DataPoints",    help:"основной содержит все, корень"},
            {id:7,type:"PipeNetworks",  help:"корень, элементы трубы и колодцы"},
            {id:8,type:"PipeNetwork",   help:"Возможно ветка но пока корень"},
            {id:9,type:"Pipes",   help:"корень труб"},
            {id:10,type:"Pipe",   help:"труба"},
        ]

        window.menuBig=this;

        //бля

        this.init = function(){

           /* this.array[0] = this.mLeftGal=new MLeftGal(this,function(s,p,p1){
                self.fun(s,p,p1)
            })*/
            
            this.array[this.array.length] = window.mCPodskazka=new MCPodskazka(this.dCont,function(s,p,p1){  
                

            })




            this.array[this.array.length]=this.mVerh = new MVerh(this,function(s,p){

            })

            this.array[this.array.length]=this.mShtora=new MShtora(this,function(s,p){

            })

           /* this.array[this.array.length]=this.mFolders=new MFolders(this,function(s,p,p1){                
                self.fun(s,p,p1) 
            })*/

            this.array[this.array.length]=this.menuThree=new MenuThree(this,function(s,p,p1){  
                if(s=="open")  {
                    self.menuGPS.open(p,p1); 
                    return;   
                }        
                self.fun(s,p,p1) 
            })

            this.array[this.array.length]=this.mVisi3d=new MVisi3d(this,function(s,p){

            })

            this.array[this.array.length]=this.menuGPS=new MenuGPS(this,function(s,p){

            })

            this.array[this.array.length]=this.mHelp=new MHelp(this,function(s,p){

            })

            this.array[this.array.length]=this.menuNizObj=new MenuNizObj(this,function(s,p){

            })





            this.mVerh.setMShtora(this.mShtora);
            this.dCont.add(this.mVerh.dCont);
            this.dCont.add(this.mHelp.dCont);




            //this.mFolders.setMSBlok(this.mShtora.array[0]);

            this.menuThree.setMSBlok(this.mShtora.array[0]);
            this.menuGPS.setMSBlok(this.mShtora.array[1]);

            this.menuThree.mtFolder2.setMenu(this.menuGPS.mStructure)


            this.mVisi3d.setMSBlok(this.mShtora.array[1]);
            this.menuNizObj.setMSBlok(this.mShtora.array[1]);

            

            this.array[this.array.length] =this.mObject = new MObject(this,function(s,p){
                self.fun(s,p)
            });


            this.mObject.setMSBlok(this.mShtora.array[2]);

            /*this.array[this.array.length] =this.mDebag = new MDebag(this,function(s,p){
                
            });*/



            this.array[this.array.length]=window.dragPic=this.dragPic = new DDragPic(this.par.dCont);
            window.mCPodskazka.sahSim=7.2; 

            this.array[this.array.length] =window.mMessage =this.mMessage = new MMessage(this,function(s,p){
                self.fun(s,p)
            });

        }




        this.setObject = function(obj){ 
               
            this.mObject.setObject(obj);
            this.menuNizObj.setObject(obj);
            
            if(window.controler)controler.setObject(obj);
        }


        this.setSob = function(_s,_p,_p1){  

        }


        this.update = function(){ 
            this.mVisi3d.update();
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


        this.keydown=function(s,e,boolCTRL){   

           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].keydown)this.array[i].keydown(s,e,boolCTRL)
            }
        }
        this.keyup=function(s,e,boolCTRL){            
           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].keyup)this.array[i].keyup(s,e,boolCTRL)
            }
        }



        this.init()
  	}

    set indexStep(value) {       
        if (this._indexStep != value) { 
            this._indexStep = value;           
            this.mLeftGal.indexStep=this._indexStep;
        }
    }
    get indexStep() {
        return this._indexStep;
    }
}














