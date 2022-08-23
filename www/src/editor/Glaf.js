import { MVisi3D } from '../visi3D/MVisi3D.js';
import { PM } from '../pm/PM.js';
import { UXml } from './UXml.js'
import { SceneSB } from '../visi3D/SceneSB.js'
import { Menu } from './menu/Menu.js';
import { Editor } from './editor/Editor.js';
import { GpsWord } from './gps/GpsWord.js';


export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;        
        this.scale=1;		
       // 
        this.par=par;
        this.param=this.par.param; 

        this._indexStep =-1;

     
        this.contHTML= document.createElement('div');
        this.contHTML.style.position = 'fixed';
        this.contHTML.style.top = '0px';         
        this.contHTML.style.left = '0px';
        //par.contentHTML.appendChild(this.contHTML); 

     

        var o=mhbd.getKeyId("scenes3d",2);
        var oSp=o.json
        
       
        var alpha =oSp.scene.visi3D.alphaAd 
        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(this.contHTML, null, dcmParam.mobile, true, true, true, alpha);		
	 	this.visi3D.yes3d = true;
        this.content3d=new THREE.Object3D();       	
		this.visi3D.groupObject.add(this.content3d);
        window.visi3D=this.visi3D




        this.sceneSB = new SceneSB(this.visi3D); 

        oSp.scene.visi3D.far=6670257*4      

        window.pm=new PM(visi3D,null,this.param);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                oSp.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
        } 

 
        this.dCont = new DCont(par.contentHTML);

        window.uXml=new UXml()


        this.gpsWord = new GpsWord(this, function(s, p, p1){

        });

       /* this.editor  = new Editor(this, function(s, p, p1){

        }); */

        this.menu  = new Menu(this, function(s, p, p1){            
            if(s=="indexStep")self.indexStep=p            
        });


             


  /*      this.view  = new View(this, function(s, p, p1){

        });        

        this.fManager  = new FManager(this, function(s, p, p1){
     
        });
        this.fManager.addMenu(this.menu) 
        this.fManager.addFloor(this.view.facade)   
        this.fManager.index=0         

        this.mozg = new Mozg(this, function(s, p, p1){
                                        
        })*/

        
      

		this.update = function () {
            //this.view.upDate()
			//this.visi3D.upDate();
            //this.editor.update();
            this.menu.update();    
            this.gpsWord.update();   
		}


        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w = _w;
                h = _h;
                s = _s;   
            }
  			this.scale=s;
            this.dCont.scale=s;
           // this.visi3D.sizeWindow(0,0,w,h)
            this.menu.sizeWindow(w,h,s);
           // this.editor.sizeWindow(w,h,s);
           // this.mozg.sizeWindow(w,h,s);
            //this.fManager.sizeWindow(w,h,s);      
  		}


        this.openId = function (id) {            
            $.ajax({
                url: "resources/date/save/"+id+"/config.json",
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;                    
                    self.view.facade.setObj(oo)
                    trace(oo)
                                                
                },
                error:function function_name(data) {
                    console.error("Что то случилось с конфигом")
                }
            });
        }




        var sahSS=0
        this.keydown=function(event){
                
            if(event.keyCode==17)self.boolCTRL=true;

            if(event.keyCode==81&&self.boolCTRL)  {
                self.active =  !self.active;
                self.localStorage.object.dubag=self.active;
                self.localStorage.save();
            } 
            sahSS=0
            if(self.boolCTRL && event.keyCode==83){
                sahSS=1
                self.menu.keydown("save", event, self.boolCTRL)

                return false
            }
            
       
            self.menu.keydown("down", event, self.boolCTRL)
            controler.keydown("down", event, self.boolCTRL);    

        }
        this.keyup=function(event){
            if(event.keyCode==17)self.boolCTRL=false;

            self.menu.keyup("up", event, self.boolCTRL); 
            controler.keyup("up", event, self.boolCTRL);    
        }
        document.onkeydown = this.keydown
        //window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup ); 



             
  	}

}