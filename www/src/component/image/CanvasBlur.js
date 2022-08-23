

export class CanvasBlur  {
    constructor() {          
		this.type= "CanvasBlur";
		var self = this;
		this._kolDrag=1;

		this._width=512;
		this._height=512;
		this._color="#123456";
		this._glow=2;
		this._alpha=1;
		this._boolIn=false;
		this._boolCent=true;
		this._boolZerc=false;

		this._bMiroX=false;
		this._bMiroY=false;

		this.bmd=new DBitmapData(this._width,this._height)
		this.canvas = this.bmd.canvas
		this.ctx =this.bmd.ctx;

		this.bmdS=new DBitmapData(this._width,this._height)
		this.canvasS = this.bmdS.canvas
		this.ctxS =this.bmdS.ctx;

		this.bmdBlur=new DBitmapData(this._width,this._height)
		this.bmdBlur1=new DBitmapData(this._width,this._height)


		/*this.canvas = document.createElement('canvas'); // канвас для картинки
	    this.canvas.width=this._width;
	    this.canvas.height=this._height;	    
	    this.ctx = this.canvas.getContext('2d'); // контекст картинки*/

	    this.clear=function(){
	    	this.bmdBlur1.ctx.clearRect(0, 0, this._width, this._height);
	    	this.bmdBlur.ctx.clearRect(0, 0, this._width, this._height);
	    	this.ctxS.clearRect(0, 0, this._width, this._height);
	    	this.ctx.clearRect(0, 0, this._width, this._height);
	    }


	    this.imgData=null
	    var bb,aa,aa1
	    var cd
	    var aw=[0,0,0,0]
	    var aw1=[0,0,0,0]
	    this.drawImage=function(im, x,y,w,h){
	    	this.ctxS.drawImage(im, x,y,w,h);
	    	bb=false;

	    	if(this._alpha!=1)bb=true;
	    	if(this._color!="#123456")bb=true;
	    	
	    	if(this._boolIn==true)bb=true;

	    	if(bb)this.bmdS.imgData = this.bmdS.ctx.getImageData( 0, 0, this.bmdS.width,this.bmdS.height );


	    	if(this._boolIn==true){
	    		for (var i = 0; i < this._width; i++) {
	    			for (var j = 0; j < this._height; j++) {
	    				aa=this.bmdS.getPixel(i,j)
	    				aa[3]=255-aa[3];
	    				this.bmdS.setPixel(i,j,aa)
	    			}
	    		}

	    	}

	    	if(this._alpha!=1){
	    		bb=true;
	    		for (var i = 0; i < this._width; i++) {
	    			for (var j = 0; j < this._height; j++) {
	    				aa=this.bmdS.getPixel(i,j)
	    				aa[3]=Math.round(aa[3]*this._alpha);
	    				//if(i==100)trace(aa[3])
	    				if(aa[3]>255)aa[3]=255
	    				if(aa[3]<0)aa[3]=0
	    				this.bmdS.setPixel(i,j,aa)
	    			}
	    		}
	    	}
	    	if(this._color!="#123456"){
	    		cd=dcmParam.parseColor(this._color)
	    		for (var i = 0; i < this._width; i++) {
	    			for (var j = 0; j < this._height; j++) {
	    				aa=this.bmdS.getPixel(i,j)
	    				aa[0]=cd.r;
                        aa[1]=cd.g;
                        aa[2]=cd.b;
                        this.bmdS.setPixel(i,j,aa)
	    			}
	    		}	
	    	}

	    	if(bb)this.bmdS.upDate()


	    	if(this._glow==0){
				this.ctx.drawImage(this.ctxS.canvas,0,0,this._width,this._height);
	    	}else{

	    		this.bmdBlur.ctx.filter = 'blur('+this._glow+'px)';
	    		this.bmdBlur.ctx.drawImage(this.bmdS.canvas,0,0,this._width,this._height);

	    		bb=false;

	    		if(this._boolCent==false)bb=true;
	    		if(this._boolZerc==true)bb=true;

	    		if(bb==true){
	    			this.bmdBlur1.ctx.drawImage(this.bmdBlur.canvas,0,0,this._width,this._height);

	    			this.bmdBlur1.imgData = this.bmdBlur.ctx.getImageData( 0, 0, this.bmdBlur.width,this.bmdBlur.height );
	    			this.bmdS.imgData = this.bmdS.ctx.getImageData( 0, 0, this.bmdS.width,this.bmdS.height );
	    		
	    		}else{
	    			this.ctx.drawImage(this.bmdBlur.canvas,0,0,this._width,this._height);
	    			
	    		}



	    		if(this._boolCent==false){
	    			for (var i = 0; i < this._width; i++) {
		    			for (var j = 0; j < this._height; j++) {
		    				aa1=this.bmdS.getPixel(i,j)

		    				aa=this.bmdBlur1.getPixel(i,j)
		    				
		    				if(aa1[3]!==0){
		    					aa[3]=0;
		    				}else{

		    				}
		    				this.bmdBlur1.setPixel(i,j,aa)
		    			}
		    		}
	    		}

	    		if(this._boolZerc==true){
	    			cd=Math.round(this._alpha*255)
	    			for (var i = 0; i < this._width; i++) {
		    			for (var j = 0; j < this._height; j++) {
		    				aa=this.bmdBlur1.getPixel(i,j)
		    				if(aa[3]!==0){
		    					if(i==100){
		    						
		    					}
		    					aa[3]=aa[3]-cd;	
		    					if(aa[3]<0)	aa[3]=0    				
			    				this.bmdBlur1.setPixel(i,j,aa)
			    			}
		    			}
		    		}
	    		}	


	    		if(bb){
	    			this.bmdBlur1.upDate()
					this.ctx.drawImage(this.bmdBlur1.canvas,0,0,this._width,this._height);	
	    		}

	    		
	    		

	    	}


	    	if(this._bMiroX || this._bMiroY){
	    		this.bmd.imgData = this.ctx.getImageData( 0, 0, this.bmdS.width,this.bmdS.height );

	    		if(this._bMiroX){
	    			for (var i = 0; i < this._width/2; i++) {
		    			for (var j = 0; j < this._height; j++) {
		    				aa=this.bmd.getPixel(i,j)
		    				aw[0]=aa[0]
		    				aw[1]=aa[1]
		    				aw[2]=aa[2]
		    				aw[3]=aa[3]

		    				aa =this.bmd.getPixel(this._width-i,j)
		    				aw1[0]=aa[0]
		    				aw1[1]=aa[1]
		    				aw1[2]=aa[2]
		    				aw1[3]=aa[3]
		    				this.bmd.setPixel(i,j,aw1)
		    				this.bmd.setPixel(this._width-i,j,aw)
		    			}
		    		}
	    		}
	    		if(this._bMiroY){
	    			for (var i = 0; i < this._width; i++) {
		    			for (var j = 0; j < this._height/2; j++) {
		    				aa=this.bmd.getPixel(i,j)
		    				aw[0]=aa[0]
		    				aw[1]=aa[1]
		    				aw[2]=aa[2]
		    				aw[3]=aa[3]

		    				aa =this.bmd.getPixel(i,this._height-j)
		    				aw1[0]=aa[0]
		    				aw1[1]=aa[1]
		    				aw1[2]=aa[2]
		    				aw1[3]=aa[3]
		    				this.bmd.setPixel(i,j,aw1)
		    				this.bmd.setPixel(i,this._height-j,aw)
		    			}
		    		}
	    		}

	    		this.bmd.upDate()
	    	}


	    	
	    }

	    var wind
	    this.debbug=false
		this.setDebbudCont=function(dCont,x,y,fun){
			if(wind!=undefined){
				dCont.add(wind)
				return
			}
			this.debbug=true;
            wind=new DWindow(dCont,x||0,y||0,this.type+"_Debbud")
            wind.width=200;
            var pObject=new DParamObject(wind.content,2,2,function(){          
                if(fun)fun()
            },1);
            //pObject.tipRide=true;  
            pObject.width=wind.width-4;
            pObject.addObject(this);
            wind.height=pObject.height+36;
            var dd=new DCont(wind.content)
            dd.div.appendChild(this.canvas); 
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.userSelect="none"
            dd.div.style.pointerEvents = 'none';
            dd.div.style.userSelect="none"
            dd.x=204
            dd.y=2
        }


	    /*this.setDebbudCont=function(dCont,x,y,fun){
	    	var wind=new DWindow(dCont,x||0,y||0,"CanvasBlur_Debbud")
	        wind.width=200;
	        var pObject=new DParamObject(wind.content,2,2,function(){          
	            if(fun)fun()
	        },1);
	        //pObject.tipRide=true;  
	        pObject.width=wind.width-4;
	        pObject.addObject(this);
	    }*/


	}	

	set kolDrag(value) {       
        if (this._kolDrag != value) {           
            this._kolDrag = value;                      
        }
    }
    get kolDrag() {
        return this._kolDrag;
    }

	set bMiroY(value) {       
        if (this._bMiroY != value) {           
            this._bMiroY = value;                      
        }
    }
    get bMiroY() {
        return this._bMiroY;
    }

	set bMiroX(value) {       
        if (this._bMiroX != value) {           
            this._bMiroX = value;                      
        }
    }
    get bMiroX() {
        return this._bMiroX;
    }


	set color(value) {       
        if (this._color != value) {           
            this._color = value;                      
        }
    }
    get color() {
        return this._color;
    }

	set glow(value) {       
        if (this._glow !== Math.round(value)) {           
            this._glow = Math.round(value);                      
        }
    }
    get glow() {
        return this._glow;
    }

	set alpha(value) {       
        if (this._alpha != value) {           
            this._alpha = value;                      
        }
    }
    get alpha() {
        return this._alpha;
    }

	set boolIn(value) {       
        if (this._boolIn != value) {           
            this._boolIn = value;                      
        }
    }
    get boolIn() {
        return this._boolIn;
    }

	set boolCent(value) {       
        if (this._boolCent != value) {           
            this._boolCent = value;                      
        }
    }
    get boolCent() {
        return this._boolCent;
    }

	set boolZerc(value) {       
        if (this._boolZerc != value) {           
            this._boolZerc = value;                      
        }
    }
    get boolZerc() {
        return this._boolZerc;
    }



	set width(value) {       
        if (this._width !== Math.round(value)) {           
            this._width = Math.round(value);
            this.bmd.width=this._width;
            this.bmdS.width=this._width; 
            this.bmdBlur.width=this._width;
            this.bmdBlur1.width=this._width;            
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {       
        if (this._height !== Math.round(value)) {           
            this._height = Math.round(value);
            this.bmd.height=this._height; 
            this.bmdS.height=this._height; 
            this.bmdBlur.height=this._height;
           	this.bmdBlur1.height=this._height;           
        }
    }
    get height() {
        return this._height;
    }		
}



