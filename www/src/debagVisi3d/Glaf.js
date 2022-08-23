



import { MVisi3D } from '../visi3D/MVisi3D.js';
import { PM } from '../pm/PM.js';
import { SceneSB } from '../visi3D/SceneSB.js'
import { Debbug3dS} from '../component/c3d/Debbug3dS.js';





export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;        
        this.scale=1;		
        this.content3d=new THREE.Object3D();
        this.par=par;
        this.param=this.par.param 
     
        this.contHTML= document.createElement('div');
        this.contHTML.style.position = 'fixed';
        this.contHTML.style.top = '0px';         //drflgkjdflg  dasdasdf dasgfadsgf ads z dasgfda            fgh
        this.contHTML.style.left = '0px';
        par.contentHTML.appendChild(this.contHTML); 


        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(this.contHTML, null, dcmParam.mobile, true, true, true, true);		
	 	this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        window.visi3D=this.visi3D;

        this.content3d.rotation.x=-Math.PI/2;

 




        this.sceneSB=new SceneSB(this.visi3D);
        var o=mhbd.getKeyId("scenes3d",2)
        var oSp=o.json;

        window.pm=new PM(visi3D,null,this.param);
        
        oSp.scene.visi3D.debug=false

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                oSp.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
        } 
        //window.visi3D.rotationX=1.4;
 
        this.dCont = new DCont(par.contentHTML);



        ////////////////////////////////






        /*this.debbug3dS=new Debbug3dS();
        this.content3d.add(this.debbug3dS);*/

        /*this.debbug3dS.p=100;
        this.debbug3dS.k=100;
        this.debbug3dS.s=20;*/

      /*  this.debbug3dS.setDebbudCont(this.dCont,1300,10,function(){
            visi3D.intRend=1;  
            self.drag()
        })*/




       //this.utilMetrik=new UtilMetrik();

        this.uMDebbug=new UMDebbug(this);
       







		this.update = function () {
           // this.debbug3dS.upDate()
            //this.drag()
			this.visi3D.upDate();
           // this.visi3D.intRend=1
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
            this.visi3D.sizeWindow(0,0,w,h)
                     
  		} 


  	}
}






export class UMDebbug{  
    constructor(par) { 
            
        this.type="UMDebbug";
        var self=this;
        this.par=par;
        this.radius=222;


        this.content3d=new THREE.Object3D()
        par.content3d.add(this.content3d);

        this.cont3d=new THREE.Object3D()
        this.content3d.add(this.cont3d);
  /*
        this.pp=new THREE.AxesHelper( 200)
        this.content3d.add(this.pp)*/

        this.debbug3dS=new Debbug3dS();
        this.cont3d.add(this.debbug3dS);

        this.debbug3dS.p=100;
        this.debbug3dS.k=100;
        this.debbug3dS.s=20;

        this.debbug3dS.setDebbudCont(this.dCont,1300,10,function(){
            visi3D.intRend=1;  
            self.drag()
        })


        visi3D.addChildMouse(this.cont3d);
        visi3D.addEvent("down",function(e){
        //visi3D.addEvent("move",function(e){    
            if(e.target!=null){
                self.vector.copy(e.point);
                pObject.addObject(self.vector);
                self.setP(self.vector,true)   
            }
        })



        this.setP=function(v,b){
           // this.pp.position.copy(v);
            visi3D.setPoint(v)   
            visi3D.intRend=1
        }





        

       

        //----------------------debbug----DCM--------------------------------
        
       

        this.vector=new THREE.Vector3(-200,0,0)

        var pObject
        self.d3dS=undefined
        var wind
        this.debbug=false
        this.setDebbudCont = function(dCont,x,y,fun){
            if(wind!=undefined){
                dCont.add(wind)
                return
            }
            if(window["DWindow"]==undefined){
                console.warn("Нет либы DCM либо она не подключена")
                return;
            }
            this.debbug=true



            dcmParam.fontSizeLitte=12


            var wind = new DWindow(dCont,x||0,y||0,"UdebagVisi3d_Debbug")
            wind.width=320;

            pObject=new DParamObject(wind.content,2,2,function(){          
                self.setP(self.vector) 
            },1);
            pObject.tipRide=true;  
            pObject.width=wind.width-4;
            pObject.addObject(this.vector);
            wind.height=pObject.height+36;
            self.setP(self.vector) 
                  
        }


        this.setDebbudCont(par.dCont)

      
           

    }
}
