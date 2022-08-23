
import { Breakline } from './Breakline.js';
import { Base } from './Base.js';
export class WordBreaklines extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="WordBreaklines";
        var self=this; 
       



 
        this.copyChild = function (_child ) {   
            
            var p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==_child.uuid){
                    p=i;
                }
            }  
            if(p!==-1){
                this.children[p].korektRect();
                let rect=this.children[p].rect

                let oo=JSON.parse(JSON.stringify(this.children[p].object));
                if(oo["@name"]!=undefined){
                   oo["@name"]=oo["@name"]+"_Copy"; 
                }
                this.object["Breaklines"]["Breakline"].push(oo);
                let breakline=this.creatToObj(oo);


                
                let op={
                    x:breakline.position.x,
                    y:breakline.position.y,
                    z:breakline.position.z
                }

                breakline.setStartPoind(op);
                
                for (var i = 0; i < breakline.children.length; i++) {
                    breakline.children[i].position.x+=1
                }
                breakline.korektRect();
                breakline.activeModel=this.activeModel;                       
                

                menuGPS.mStructure.reDrag();
                menuBig.setObject(breakline);
            }

            visi3D.intRend=1
            return true;
        }

        //удоляем из линии точку
        this.killChild = function (_child ) {             
            var p=-1;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==_child.uuid){
                    p=i;
                }
            }  
            let r=this.remove(_child);
            if(r){                
                this.object["Breaklines"]["Breakline"].splice(p,1);

                if(this.children[0]!=undefined){
                    menuGPS.mStructure.reDrag()
                    menuBig.setObject(this.children[0]);
                }               
                if(self.fun)self.fun("dragPoint", self);

            }

            

            visi3D.intRend=1
            return true;
        }

        
        
        this.arrC=[]; 
        this.getCreat=function(){
            for (var i = 0; i < this.arrC.length; i++) {
                if(this.arrC[i].life==false){                    
                    return this.arrC[i]
                }
            } 
            let g= new Breakline(this, this.sob);
            g.idArr=this.arrC.length;
            this.arrC.push(g);            
            return g;
        }


        this.postSetObject=function(){
            this.objectKey=this.object;
            let a=[];
            if(this.object["Breaklines"]==undefined)return;            
            var oo=this.object["Breaklines"]["Breakline"];

            if(oo.length==undefined){
                a=[oo];
            }else{
                a=oo;
            }            
            for (var i = 0; i < a.length; i++) {
                 
                this.creatToObj(a[i])                             
            } 

        } 
        this.creatToObj=function(o){
            let breakline = this.getCreat();                         
            breakline.setObject(o);
            breakline.life=true
            this.add(breakline); 
            return breakline
        }

    }


    // set name(value) {       
    //     if (this._name != value) {           
    //         this._name = value;
    //         this.object["@name"] = value;
    //     }
    // }
    // get name() {
    //     return this._name;
    // }
}

