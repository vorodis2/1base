
/**
Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
Разработчик и владелец данного кода Сидоров Евгений vorodis2: 
The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
Developer and owner of this code Sidorov Evgeniy vorodis2
contacts:
site: http://vorodis2.com/
mail: vorodis2@gmail.com
skype: vorodis2
phone: +380951026557

* Хрень для замеров тайма, удобняк в плане отслеживать иницилизации обьектов
*/


export class TimeInfo  {
  	constructor() {  		
  		this.type="TimeInfo";
  		var self=this;
        this.array=[]
        this.sah=-1

        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }

        this.getK=function(p,k){
            let s=p+"";
            for (var i = s.length; i < k; i++) {
                s+="_";
            }
            return s
        }


        this.dragConsole=function(){          
            for (var i = 0; i < this.sah+1; i++) {
                let mm=Math.round((this.array[i].time-this.array[0].time)*1000)/1000000
                let mm1=0;
                if(i!=0)mm1=Math.round((this.array[i].time-this.array[i-1].time)*1000)/1000000
                let ss=this.getK(mm,10)
                let ss1=this.getK(mm1,10)
                console.log(this.getK(i,3)+":"+ss+":"+ss1+":"+this.array[i].t+"::"+this.array[i].s+"::",this.array[i].p)
            }
            let mm1=Math.round((this.array[this.sah].time-this.array[0].time)*1000)/1000000
            console.warn("time::",mm1)
        }

        this.get=function(s,p,t){
            this.sah++;
            if(this.array[this.sah]==undefined){
                this.array[this.sah]=new THron()
                this.array[this.sah].idArr=this.sah
            }
            this.array[this.sah].set(s,p,t)
            return this.array[this.sah];
        }

        this.stop=function(s,p){
            this.get(s,p,"stop")
            this.dragConsole()
            this.sah=-1
        }
        this.start=function(s,p){
            this.sah=-1
            this.get(s,p,"start")
        }

        this.trace=function(s,p){
            this.get(s,p,"trace")
        }

    }
}
export class THron  {
    constructor() {         
        this.type="TimeInfo";
        var self=this;
        this.idArr=-1
        this.s;
        this.p;
        this.time
        this.date
        this.set=function(s,p,t){
            this.t=t; 
            this.s=s;            
            this.p=p;
            this.date=new Date()
            this.time=this.date.getTime()            
        }
    }
}

