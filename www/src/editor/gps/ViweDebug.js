

import { MVisi3D } from '../../visi3D/MVisi3D.js';
import { PM } from '../../pm/PM.js';
import { SceneSB } from '../../visi3D/SceneSB.js'



export class ViweDebug  {
  	constructor(par, fun) {  		
  		this.type="ViweDebug";
  		var self=this; 
        this.par=par;
        this.fun=fun;

        this.param=this.par.par.param ;

        this._width=600;
        this._height=400;
        this.content3d=new THREE.Object3D();

        this.window=new DWindow(this.par.par.dCont,this.param.otstup,this.param.otstup*2+32,"Временый вювер")
        //this.window.minimize=true
        this.window.hasMinimizeButton=false
        this.panel=new DPanel(this.window.content, this.param.otstup, this.param.otstup)
        this.panel.width=this._width
        this.panel.height=this._height

        this.window.width=this.panel.width+this.param.otstup*2;
        this.window.height=this.panel.height+this.param.otstup*2+32;

        this.init = function () {
            

            /*this.contHTML= document.createElement('div');
            this.contHTML.style.position = 'fixed';
            this.contHTML.style.top = '0px';         
            this.contHTML.style.left = '0px';
            this.panel.div.appendChild(this.contHTML); 

            var o=mhbd.getKeyId("scenes3d",2)
            var oSp=o.json
            
           
            var alpha =oSp.scene.visi3D.alphaAd 
            //порезаный от пикси вювер        
            this.visi3D = new MVisi3D(this.contHTML, null, dcmParam.mobile, true, true, true, alpha);       
            this.visi3D.yes3d = true;           
            this.visi3D.groupObject.add(this.content3d);
            window.visi3D=this.visi3D



            this.sceneSB=new SceneSB(this.visi3D);       

            window.pm=new PM(visi3D,null,this.param);
            for (var i = 0; i <  this.sceneSB.array.length; i++) {
                if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                    oSp.scene[this.sceneSB.array[i].name] = {};                
                }            
                this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
            }*/

            /* var group = new THREE.Object3D();           
             this.content3d.add(group);
                //this.group.position.z=-333
                let geometry = new THREE.BoxGeometry( 1, 1, 1);            
                var r=3;
                var r1=200;
                for (var i = 0; i <212; i++) {
                    let cube = new THREE.Mesh( geometry );
                    cube.scale.set(r*Math.random()+1,r*Math.random()+1,r*Math.random()+1)
                    cube.position.set(r1*Math.random()-r1/2,r1*Math.random()-r1/2,r1*Math.random()-r1/2)
                    group.add(cube); 

                }*/


            //this.visi3D.sizeWindow(0,0,this._width,this._height)

        }

        this.init()

		this.update = function () {
           // this.visi3D.upDate();            
		}



        this.render=function(){

        }    


        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w = _w;
                h = _h;
                s = _s;   
            }  			      
  		}


        
  	}
}