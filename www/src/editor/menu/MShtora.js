export class MShtora  {
    constructor(par, fun) {         
        this.type="MShtora";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont);
      //  this.dCont.alpha=0.5
        this.dCont1=new DCont();
        this.panel=new DPanel(this.dCont1)

        //this.dCont1.y=100;
        this.dCont1.x=this.param.otstup;

        this.panel.height=32+this.param.otstup*2
        this.array=[]

        this.sob=function(s,p){

        }


        this.plus=function(type, key, id, widthProsent){            
            this.array.push(new MSBlok(this,this.sob,type, key, id, widthProsent)); 
            //this.array[this.array.length-1].active=true
            this.array[this.array.length-1].idArr=this.array.length-1;
            var x=this.param.otstup;
           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].button1!=undefined){
                    this.array[i].button1.x=x;
                    x+=this.param.otstup+this.array[i].button1.width                    
                }
                this.array[i].button.visible=true                
            }            
            this.panel.width=x;
        }



       // this.plus("xz","info",18, 100);     //дерево
        this.plus("xz","info",13, 280)  //дерево папок
        //this.plus("static","info",12, 150)  //дерево обьекта
        //this.plus("xz","info",21, 100);     //код         
        this.plus("din","info",14);        //3д 
        this.plus("static","info",15, 220)  //интерфейс
        //this.plus("xz","info",22, 100);     //демо


      


        this.draw=function(){

            var ww=w/s-this.param.otstup;

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){                 
                    this.array[i].button.visible=true;
                }
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){
                    ww-=this.param.otstup;
                    if(this.array[i].tipe=="xz" || this.array[i].tipe=="static"){
                        ww-=this.array[i].width;
                    }
                }
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){
                    if(this.array[i].tipe=="din"){
                        this.array[i].width=ww
                        this.array[i].button.visible=false;
                    }
                    if(this.array[i].tipe=="static"){
                        this.array[i].button.visible=false;
                    }
                }

             }

            var xx=this.param.otstup;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){
                    this.array[i].x=xx;
                    xx+=this.array[i].width+this.param.otstup;
                    
                }
            }

            for (var i = this.array.length - 1; i >= 0; i--) {
                if(this.array[i].active==true){
                    this.array[i].button.visible=false;
                    break
                }
            }
        }

        this.getMin = function(idArr, pp){            
            var pp1=pp          
            var xx=this.array[idArr].x
            var ww=this.param.otstup
            for (var i = idArr+1; i < this.array.length; i++) {                
                if(this.array[i].active==true){                    
                    if(this.array[i].tipe=="din"||this.array[i].tipe=="static" ){
                        ww+=this.array[i].min+this.param.otstup;
                    } 
                    if(this.array[i].tipe=="xz" ){
                        ww+=this.array[i].width+this.param.otstup;
                    }                    
                }
            }
            var ppo=w/s-ww-xx

            if(pp1>ppo)pp1=ppo
            return pp1
        }

        this.save = function(){  
            var a=[]
            for (var i = 0; i < self.array.length; i++) {
                var oo={}
                oo.active=self.array[i].active
                oo.width=self.array[i].width;  
                oo.tipe=self.array[i].tipe;
                a.push(oo)              
            }
            localS.object["p_MShtora_array"]=a;
          
            localS.save(); 
        } 

       if(localS.object["p_MShtora_array"]!=undefined){
            var a=localS.object["p_MShtora_array"]
           
            for (var i = 0; i < a.length; i++) {
                if(this.array[i]==undefined)break
                if(a[i].tipe!=this.array[i].tipe)break 

                this.array[i].width=  a[i].width;

                this.array[i].active=  a[i].active;  
            }
            this.draw()
        }else{
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active=true;                  
            }
        }



        

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            } 
            this.draw() 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s)
            }           
        } 
        
    }
}



export class MSBlok  {
    constructor(par, fun, tipe, key, id, widthProsent) {         
        this.type="MShtora";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.tipe=tipe;
        this.key=key;
        this.id=id;
      
        this.widthProsent=widthProsent

        this._x=0;
        this.min=100
        this._width=100;
        if(this.tipe=="static"){            
            this._width=widthProsent;
            this.min=this._width
        }
        this._active=false;

        this.dCont=new DCont(); 

        
        this.dCont.y=30+this.param.otstup*4;
   
        


        this.panel=new DPanel(this.dCont,0,0);
       // if(tipe=="static"){ 
            //this.panel.color="#333333"//+Math.round(Math.random()*9999)
       // }

        this.content=new DCont(this.dCont);
        this.button=new DButton(this.dCont,0,0);     
        this.button.width=this.param.otstup
        this.button.alpha=0.2


        if(key!=undefined){
            this.button1=new DButton(this.par.dCont1,0,this.param.otstup,""+this.id,function(){
                self.active = !self.active
                self.par.draw();
                self.par.save();
            });
            this.button1.width=this.button1.height=32
            this.button1.scalePic=0.5;


            mhbd.getKeyId(key,id,function(e){
                
                if(e){
                    self.button1.text=" ";
                    self.button1.link=mhbd.getLink(e.icon);
                    mCPodskazka.setBuuton(self.button1,e)
                    //languages.setCompObj(self.arrComp[13],e)

                }
                
            })
        }

        // this.chek=new DCheckBox(this.dCont,20,200,"test",function(){
        //     self.active = this.value
        //     self.par.draw()
        // })

        //var xxx=0
        //var x
        var sp=undefined;

        this.mousemove=function(e){

            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={                    
                        x:e.clientX,
                        width:self.width,
                        x1:self.x
                    };
                }  
                sp.xs=e.clientX         
            }else{
                if(sp==undefined){
                    sp={                    
                        x:e.targetTouches[0].clientX,
                        width:self.width,
                        x1:self.x
                    };
                }
                sp.xs=e.targetTouches[0].clientX
            }
            sp.xxx=(sp.x-sp.xs); 
            self.drag();
        }

        this.mouseup = function(){
            window.removeEventListener("mouseup", self.mouseup);
            dcmParam.removeFunMove(self.mousemove) 
            sp=undefined;

             self.par.save()
        }

        this.button.fun_mousedown = function(){
            dcmParam.addFunMove(self.mousemove)
            window.addEventListener("mouseup", self.mouseup);
           
        };

        this.button.fun_mouseover = function(){          
            self.button.panel1.div.style.cursor = 'ew-resize';
        };


        this.button.width=this.param.otstup;

        this.drag=function(){

            if(tipe=="static"){
                this.x=sp.x-sp.xxx             
                this.par.draw()
                return
            }
           
            var pp=sp.width-sp.xxx
            //if (this.tipe=='xz') {
                pp<this.min ? pp=this.min : pp=pp;
            //}
            var pp1=this.par.getMin(this.idArr,pp)

            this.width=pp1;
            this.par.draw()
        }

        this.arrFW=[];

        this.draw=function(){
            var xx=this.param.otstup
            this.panel.height=h/s-this.dCont.y-this.param.otstup
            this.panel.width=this._width;
            this.button.x=this._width;   

            this.button.height=this.panel.height

            for (var i = 0; i < this.arrFW.length; i++) {
                this.arrFW[i](this.panel.width,this.panel.height)
            }

           /* if(this.sizeWin){
                this.sizeWin(this.panel.width,this.panel.height)
            }*/


        }
        this._sizeWin = undefined;

        this.funActive=undefined;


        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }  
            this.draw()
        }  
    }

    set sizeWin(value) {       
       
        for (var i = 0; i < this.arrFW.length; i++) {
            if(this.arrFW[i]===value)return
        }
        this.arrFW.push(value)

    } 

    set active(value) {       
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                if(this.button1)this.button1.color=dcmParam.colorActive
                this.par.dCont.add(this.dCont)
            }else{
                if(this.button1)this.button1.color=dcmParam.color
                this.par.dCont.remove(this.dCont)
            }
            if(this.funActive)this.funActive(this._active)
            this.draw()    
        }
    }
    get active() {
        return this._active;
    }

    set width(value) {
        if (this._width != value) {
            if(this.tipe=="static")return
            this._width = value;
            

            if(this._width<this.min){
                this._width=this.min
            }
            this.draw()    
        }
    }
    get width() {
        return this._width;
    }

    set x(value) {
        if (this._x != value) {
            this._x = value; 
            this.dCont.x =this._x;         
        }
    }
    get x() {
        return this._x;
    }
}