
import { Pipe } from './Pipe.js';
import { Base } from '../Base.js';
export class Pipes extends Base {
    constructor(par, fun) {
        super(par,fun);         
        this.type="Pipes";
        var self=this; 
       

        
        this.clear=function(){            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false;
            }
            this.children.length=0;
        }

        
        
        this.array=[]; 
        this.getCreat=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){ 
                    this.array[i].life=true                   
                    return this.array[i]
                }
            } 
            let g= new Pipe(this, this.sob);
            g.idArr=this.array.length;
            g.life=true 
            this.array.push(g); 

            return g;
        } 

        //проверяем существование обьекта глобално и в низ по дереву
        this.creatParentObj=function(){            
            if(this.object==undefined){
                let o={}
                o["Pipe"]=[];
                this.parent.nizCreatObj(this, o);                
            }
        }



        this.plusObj=function(obj, bool){ 
            
            if(bool){
                this.creatParentObj();
            }
            

            
            let o=this.getCreat();
            o.activeModel=this.activeModel            
            o.setObject(obj);
            this.add(o)
        }


        this.postSetObject=function(){ 

            this.objectKey = this.object; 
            this.objectKey=this.object;
            let a=[];            
            if(this.object["Pipe"]==undefined)return;            
            var oo=this.object["Pipe"];            
            if(oo.length==undefined){
                a=[oo]
            }else{
                a=oo
            }

            
            for (var i = 0; i < a.length; i++) {                
                this.plusObj(a[i])
            }                 
        }       
    }
}

