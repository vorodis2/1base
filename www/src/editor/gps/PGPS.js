

export class PGPS  {
  	constructor(fun) {  		
  		this.type="PGPS";
  		var self=this;
        this.fun=fun
        this.version= "v1.002"

        this._rPoint=5;
        this._rLine=5;
        this._mashtab=1;



        this.setP = function(o){
            
            for(var s in o){
                if(this[s])this["_"+s]=o[s]
            }
        }

        this.localSt=new LocalSt(function(){
            
            if(this.object.pgjs==undefined){
                this.object.pgjs={};
            }else{
                self.setP(this.object.pgjs)
            }

        },"PGPS_"+this.version);



        this.saveLocStor = function(){           
            let o=this.localSt.object.pgjs;
            for(var s in this){
                if(s[0]=="_"){
                    let aa=(s+"").slice(1)
                    if(this[aa]){                        
                        o[aa]=this[s];
                    } 
                }
            }
            if(this.fun)this.fun()
            this.localSt.save()
        }

        

  	}

    set rPoint(value) {       
        if (this._rPoint != value) {           
            this._rPoint = value;
            this.saveLocStor();
        }
    }
    get rPoint() {
        return this._rPoint;
    }  

    set rLine(value) {       
        if (this._rLine != value) {           
            this._rLine = value;
            this.saveLocStor();
        }
    }
    get rLine() {
        return this._rLine;
    } 

    set mashtab(value) {       
        if (this._mashtab != value) {           
            this._mashtab = value;
            this.saveLocStor();
        }
    }
    get mashtab() {
        return this._mashtab;
    }      
}







export function LocalSt(fun,_key) {
    this.fun = fun;
    var self = this;
    this.object;
    this.key = _key||'shirt';
    this.object; // тут храняться все данные с localStorage
    var b;
    // инициализация localStorage
    this.initLoad=function() {
        b=true;
        this.object = window.localStorage[this.key];
        if(this.object == "undefined")b=false;
        if(this.object == undefined)b=false;
        
        // проверка пуст ли  localStorage
        if(b == false) {
            this.object = this.getStartObj(); // если localStorage пуст, записываем обьект с функции getStartObj
        }else {
            this.object = jQuery.parseJSON(this.object); // если localStorage не пуст записываем содержимое предварительно
        }   
        if(this.fun)self.fun();
    }
    
    // если localStorage пуст, записываем обьект
    this.getStartObj = function() {
        /*var obj = {
            activ:false,
            dubag:false,
            menu:{},
            xz:{}
        };*/
        return {}//obj;
    }

    // сохраняем в localStorage данные
    this.save = function() {        
        window.localStorage[this.key] = JSON.stringify(self.object);
    }

    // сохраняем в localStorage данные
    this.clear = function() {
        window.localStorage[this.key] = undefined;
    }
    self.initLoad();
    //setTimeout(function() {self.initLoad();}, 1);
        
}

