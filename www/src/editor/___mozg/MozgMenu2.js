
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu2 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu2";
        var self=this;
        this.sobIndex2=undefined


        this.init=function(){            
            if(this.dCont!=undefined)return
            this.sobIndex2=this.par.par.fManager.sobIndex[2]    
            trace("===",this.sobIndex2)
                

            this.dCont = new DCont();
            this.panel=new  DPanel(this.dCont, this.otstup*4 + this.param.wh,this.otstup) 
            this.panel.width=this.param.sizeBase;
            var bwh=(this.panel.width-this.otstup*3)/3-this.otstup


            this.gallery=new Gallery2(this.panel, this.otstup, this.otstup, function(){                
                var o=this.array[this.index].object;
                var o1=mhbd.getKeyId(o.key, o.id);
                trace(o1, o)
                self.sobIndex2.sobSP("creatObjDin", o1.id)


                visi3D.intRend=1;
            })
            this.gallery.kolII=3;
            this.gallery.widthPic=bwh;
            this.gallery.heightPic=bwh;
            this.gallery.otstup=this.otstup;
            this.gallery.width=this.panel.width-this.otstup*2;

            this.oInfo = mhbd.objectBase.three.json.three;
            var a=[]
            for (var i = 0; i < this.oInfo.array.length; i++) {
                if(this.oInfo.array[i].tId=="2"){
                    a=this.oInfo.array[i].array;
                }
            }

            this.gallery.start(a);
            var ki=Math.ceil(a.length/3)

            this.gallery.height=(this.gallery.widthPic+this.otstup)*ki+this.otstup
            this.panel.height=this.gallery.height+this.otstup*2;
            trace(">",ki,this.oInfo)
        }



        this.dragActive=function(){

            
        }
    }

}

//достроеный класс галерий
export class Gallery2 extends DGallery {
    constructor(dCont, x, y, fun) { 
        super(dCont, x, y, fun); 

        this.createZamen=function(){ 
            var r=new Box2(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink       
            return r
        }      
    }
}






export function Box2(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'Box2';
    var self = this;

    this.id=-1
    var b,link,ooo;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        

        this.object=_obj
        this.obj3d=mhbd.getKeyId(_obj.key,_obj.id)
        
       
      
        this.image.link = mhbd.getLink(this.obj3d.icon);
        this.image.visible = true;
        self.funLoad();

        this.label.visible=true
        this.label.text=""+_obj.id
        this.label.activMouse=false;
        this.label.fontSize=10
    };

    

}

Box2.prototype = Object.create(DBox.prototype);
Box2.prototype.constructor = Box2;
Object.defineProperties(Box2.prototype, {
 
});



