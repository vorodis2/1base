export class MHelp  {
    constructor(par, fun) {         
        this.type="MHelp";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont();

        this._width=400;
        this._height=400;

        this._leng=languages.key;

        this._active=false;
        this.array=[];

        this.panel=undefined


        this.mHxz=new MHxz(this)

        this.sob=function(s,p){

        } 

        this.draw=function(){
            if(this.panel==undefined)return

            var s1=(w/s)/(this._width+this.param.otstup*2)
            if(s1>(h/s)/(this._height+this.param.otstup*2))s1=(h/s)/(this._height+this.param.otstup*2)
            if(s1>1)s1=1
            this.panel1.width=w/s                          //масштаб прозрачной подложки
            this.panel1.height=h/s
            this.panel.scale=s1   
            this.panel.x=(w/s-this._width*s1)/2            //масштаб самой панели Help
            this.panel.y=(h/s-this._height*s1)/2/s1
        }


        this.setPage=function(o){
            this.mHxz.setPage(o)   
        }

        this.init = function(){
            if(this.panel!=undefined)return                                    //создаем прозрачную подложку


            this.panel1=new DPanel(this.dCont,0,0)
            this.panel1.alpha=0.75

            //this.panel1.alpha=0.7          
            this.panel=new DPanel(this.dCont,0,0)                               //создаем панель Help
            this.panel.width= this._width       
            this.panel.height= this._height


            this.button=new DButton(this.panel.dCont,0,this.param.otstup,' ',function(){ //кнопка крестик закрытия панели
                self.active = !self.active
            });
            this.button.width=this.button.height=28;                           
            this.button.x=this._width-this.button.width-this.param.otstup      //стартовая позиция кнопки при инициализации
            this.button.scalePic=0.5;          
            this.button.boolFond=false                                          //убираем бекграунд у кнопки
            mhbd.getKeyId("info",3,function(e){
                self.button.link=mhbd.getLink(e.icon);
                mCPodskazka.setBuuton(self.button,e)
            })
            this.mHxz.width=this._width
            this.mHxz.height=this._height
            
            this.mHxz.init()
            this.sizeWindow()
        }

        languages.arrayFun.push(function(k){
            self.leng=k;
        })


        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            } 
            if(this.panel) {
                this.draw()              
            }
        }       
        
    }

    set active(value){
        if(this._active!=value){
            this._active= value;              
            if(this._active==true){
                this.init()
                this.par.dCont.add(this.dCont)
            }
            else {                
                this.par.dCont.remove(this.dCont)
            }     
        }
    } 

    get active() {
        return this._active;
    }


    set width(value) {
        if (this._width != value) {
            this._width = value;
            if(this.panel){
                this.panel.width=value
                this.mHxz.width=value
                this.button.x=this._width-this.button.width-this.param.otstup;
            }
            
            this.draw()
        }
    }
    get width() {
        return this._width;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            if(this.panel){
                this.panel.height=value
                this.mHxz.height=value
            }
            this.draw()
        }
    }
    get height() {
        return this._height;
    }


    set leng(value){
        if(this._leng!=value){
            this._leng= value;
            this.mHxz.leng=value
        }
    } 

    get leng() {
        return this._leng;
    }

}





export class MHxz  {
    constructor(par, fun) {         
        this.type="MHxz";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont();
        this.dCont1=new DCont();
        this.array=[]
        this._leng=this.par._leng
        this._index=-1;
        this._width=this.par.width
        this._height=this.par.height

        this.dCont1.x=this._width
        this.dCont1.y=this._height

        this.button1=undefined



        this.sob=function(s,p,p1){
            if(s=="index"){
                self.index=p
                if(p>=self.array.length)self.par.active=false //временно для удобства отключаю исчезновение окна
                if(p==self.array.length)self.index=0
                return
            }
        }


        this.plus=function(arr){
            this.array.push(new MHBlok(this,this.sob)); 
            this.array[this.array.length-1].idArr=this.array.length-1;
            this.array[this.array.length-1].setArr(arr)
            this.array[this.array.length-1].active=false
        }


        this.aa=[]                         //если панель еще не вызвана - в массив аа запушиваем болванки 
        this.setPage=function(o){ 
            if(this.par.panel){
                this.plus(o)               //если панель вызвана - вызываем метод добавления элемента на панель 
            }else{
                this.aa.push(o)            //если панель еще не вызвана - в массив аа запушиваем болванки 
            }            
        }


        this.init=function(o){
            this.par.panel.add(this.dCont)              //добавляем на панель элементы  
            this.par.panel.add(this.dCont1)              //добавляем на панель элементы  
            for (var i = 0; i < this.aa.length; i++) {  //добавляем на панель элементы, созданые до инициализации самой панели
                this.plus(this.aa[i])
            }
            this.aa.length=0;
            this.init1()
        }


        this.init1=function(o){                                            //создаем кнопку после создания панели
            if(this.button1!=undefined)return
            this.button1=new DButton(this.dCont1,-100-this.param.otstup,-32-this.param.otstup,' ',function(){             //кнопка внизу панели панели
                self.sob("index",self.index+1)
            });                           
            this.button1.scalePic=1;
            this.array[0].active=true                     //делаем активным нулевой элемент при старте
            this._index=0
            this.drag()                                   //вызываем метод для расположения элементов на панели
        }

        this.drag=function() {
            var xx=-this.button1.width-this.param.otstup
            for (var i = this.array.length-1; i >= 0; i--) {
                xx-=this.array[i].button.width+this.param.otstup
                this.array[i].button.x=xx;               
            }
        }
    

    }
    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.dCont1.x=this._width
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.dCont1.y=this._height
           
        }
    }
    get height() {
        return this._height;
    }

    set index(value) {
        if (this._index != value) {
            this._index = value;            
            for (var i = 0; i < this.array.length; i++) {                
                if (this.array[i].idArr==this._index) { 
                    this.array[i].active=true                   
                }else{
                    this.array[i].active=false 
                }                
            }
        }
    }
    get index() {
        return this._index;
    }

    set active(value){
        if(this._active!=value){
            this._active= value;              
            if(this._active==true){
                this.dCont.visible=true
            }
            else {            
                this.dCont.visible=false
            }
        }
    } 

    get active() {
        return this._active;
    }

    set leng(value){
        if(this._leng!=value){
            this._leng= value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].leng=value
            }             
        }
    } 

    get leng() {
        return this._leng;
    }
}




export class MHBlok  {
    constructor(par, fun) {         
        this.type="MHBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._leng=this.par._leng

        this.param=this.par.param;
        this.idArr=-1
        this.dCont=new DCont();
        this.array=[]
 
           
        this.init=function(){
            this.button=new DButton(this.par.dCont1,0,-this.param.otstup-32,''+this.idArr,function(){ //кнопка крестик закрытия панели                       
                self.fun("index",self.idArr)
            });        
            this.button.width=this.button.height;                           
            this.button.scalePic=1; 

            if (self._active==true) {
                self.button.color=dcmParam.colorActive
            } else {
                self.button.color=dcmParam.color
            }

            this.dCont1=new DCont(this.dCont);

            for (var i = 0; i < this.arr.length; i++) {
                var comp
                if (this.arr[i].type==='pic') {
                    comp =new DImage(this.dCont1, 0, 0)
                    let c=comp;

                    mhbd.getKeyId(this.arr[i].ru.key,this.arr[i].ru.id,function(e){
                        
                        c.event_ru=e;
                        self.dragContent();                        
                    })
                    mhbd.getKeyId(this.arr[i].en.key,this.arr[i].en.id,function(e){
                     
                        c.event_en=e;
                        self.dragContent();                        
                    })
                }

                if (this.arr[i].type==='text') {
                    comp =new DLabel(this.dCont1, 0, 0)
                    let c=comp;

                    mhbd.getKeyId(this.arr[i].key,this.arr[i].id,function(e){
                        c.eventMy=e
                        self.dragContent()
                        //comp.text=mhbd.getLink(e.name);
                        // mCPodskazka.setBuuton(self.button1,e)
                        //languages.setCompObj(self.arrComp[13],e)
                    })
                }
                comp.width=this.arr[i].w 
                comp.height=this.arr[i].h
                comp.x = this.arr[i].x                  
                comp.y = this.arr[i].y
                comp.myObj=this.arr[i]

                this.array.push(comp)
                this.array[this.array.length-1].idArr=this.array.length-1;
                self.dragContent();
            }
            this.drag()
        }

        this.dragContent=function() {
            trace(this,this._leng,this.array)
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].myObj.type==='text') {
                    if(this.array[i].eventMy[this._leng])this.array[i].text=this.array[i].eventMy[this._leng]
                }
                if (this.array[i].myObj.type==='pic') {
                    if(this.array[i]["event_"+this._leng])this.array[i].link=mhbd.getLink(this.array[i]["event_"+this._leng].icon)
                }
            }
        }


        var o={x:0,x1:0,w:0,y:0,y1:0,h:0}
        this.drag=function() {
            o.x=99999999999
            o.x1=-99999999999
            o.y=99999999999
            o.y1=-99999999999
            for (var i = 0; i < this.arr.length; i++) {
                if(o.x>this.arr[i].x)o.x=this.arr[i].x
                if(o.x1<this.arr[i].x+this.arr[i].w)o.x1=this.arr[i].x+this.arr[i].w  
                
                if(o.y>this.arr[i].y)o.y=this.arr[i].y
                if(o.y1<this.arr[i].y+this.arr[i].h)o.y1=this.arr[i].y+this.arr[i].h  
            }
            o.w=o.x1-o.x
            o.h=o.y1-o.y
            this.dCont1.x=-o.x+(this.par.width-o.w)/2
            this.dCont1.y=-o.y+(this.par.height-o.h)/2
        }

        this.arr
        this.setArr=function(arr){
            this.arr=arr;
            this.init()
        }


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

    set active(value){
        if(this._active!=value){
            this._active= value;              
            if(this._active==true){
                if(this.button)this.button.color=dcmParam.colorActive;
                this.par.dCont.add(this.dCont)
            }
            else {    
                if(this.button)this.button.color=dcmParam.color;      
                this.par.dCont.remove(this.dCont)
            }
            
        }
    } 

    get active() {
        return this._active;
    }

    set leng(value){
        if(this._leng!=value){
            this._leng= value;              
            this.dragContent()
        }
    } 

    get leng() {
        return this._leng;
    }

}