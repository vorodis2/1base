import {Glaf } from './Glaf.js';
import { Param } from '../component/Param.js';
import { MHBDPHP } from '../component/MHBDPHP.js';
import { Calc } from '../component/Calc.js';


import { LocalStorage} from '../component/LocalStorageE6.js';
import {Languages} from '../component/Languages.js';
import { TStyle } from '../t3d/TStyle.js';

//xz
/*sdf			f
sdfsf	
*/
export class Main{
 	constructor(fun) {
		this.type="Main";	//4444 	 	
	 

	    var self=this;
	  	this.contentHTML= document.createElement(
			'div'
		);// dsds
	 	this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';			
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  
		
		//создание сцены
  		this.start = function () {	   
			this.tick();
        	   
        	this.fina();
		};


		this.fina = function () { 			
			self.glaf=new Glaf(this);
		 	fun("init");         	
        }


		//тик размит надва
		var b=true
		this.tick = function () {				
			TWEEN.update();		
			if (self.glaf) {
				self.glaf.update();
			}	
			requestAnimationFrame( self.tick );		
		}


		//Маштабим окна 
		this.scale=1; var d;//890809
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			//if(dcmParam.isIE==true)
				this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}
  		
  		window.languages=new Languages([{key:"ru"},{key:"en"}])
  		window.localS=new LocalStorage(function(){},"3d_editor_v4")
  		window.calc=new Calc()
  		this.param = new Param().param;

  		/**/
  		this.param.wh=32;
  		dcmParam.wh2=this.param.wh2=24;
  		this.param.fontSize=14;
  		this.param.otstup=2;
  		
  		dcmParam.fontSize=this.param.fontSize
  		dcmParam.fontSizeLitte=this.param.fontSizeLitte=10;
  		
  		
  		/*dcmParam.color="#777777";
  		dcmParam.color1="#303841"
  		dcmParam.color2="#ffffff"*/

  		dcmParam.color= "#777777";
  		dcmParam.color1="#e6e6e6";
  		dcmParam.colorActive="#303841";
  		//dcmParam.color2="#ffffff"

  		dcmParam.fontFamily = "PT Mono";


  		dcmParam.scalePic=0.5;
  		this.param.sizeBase=200


  		window.tStyle= new TStyle();
  		document.body.style.backgroundColor = dcmParam.color1
  		window.tStyle._gage=0.1

   		window.mhbd=new MHBDPHP(this);
   		window.mhbd.load(function(){
   			var loader = new THREE.FontLoader();
			loader.load( 'resources/font/helvetiker_bold.typeface.json', function ( font ) {
				tStyle._fontSize=self.param.fontSizeLittel 

				tStyle.addFont(font);
				self.start()
			})
   			//self.start()
   		})
		
		/*window.mhbd.load(
			function(){
				var loader = new THREE.FontLoader();
				loader.load( 'resources/font/helvetiker_bold.typeface.json', 
					function ( font ) {
					tStyle._fontSize=self.param.fontSizeLittel 

					tStyle.addFont(font);
					self.start()
				})				
			}
		);  */		
  	}
}




