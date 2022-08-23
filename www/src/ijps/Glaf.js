



import { MVisi3D } from '../visi3D/MVisi3D.js';
import { PM } from '../pm/PM.js';
import { SceneSB } from '../visi3D/SceneSB.js'
import { Debbug3dS} from '../component/c3d/Debbug3dS.js';


import { UtilMetrik } from '../component/c3d/UtilMetrik.js';
import { TimeInfo } from '../component/utility/TimeInfo.js';


export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;        
        this.scale=1;		
        this.content3d=new THREE.Object3D();
        this.par=par;
        this.param=this.par.param 
        window.timeInfo=new TimeInfo()
        timeInfo.stop()
        timeInfo.start()
        this.contHTML= document.createElement('div');
        this.contHTML.style.position = 'fixed';
        this.contHTML.style.top = '0px';         //drflgkjdflg  dasdasdf dasgfadsgf ads z dasgfda            fgh
        this.contHTML.style.left = '0px';
        par.contentHTML.appendChild(this.contHTML); 

        timeInfo.trace("---1----")
        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(this.contHTML, null, dcmParam.mobile, true, true, true, true);		
	 	this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        window.visi3D=this.visi3D;

        this.content3d.rotation.x=-Math.PI/2;

 




        this.sceneSB=new SceneSB(this.visi3D);
        var o=mhbd.getKeyId("scenes3d",2)
        var oSp=o.json;

        window.pm=new PM(visi3D,null,this.param);
        
        oSp.scene.visi3D.debug=false

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                oSp.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
        } 
        //window.visi3D.rotationX=1.4;
 
        this.dCont = new DCont(par.contentHTML);
       
        ////////////////////////////////


        timeInfo.stop("---3----")



        /*this.debbug3dS=new Debbug3dS();
        this.content3d.add(this.debbug3dS);*/

        /*this.debbug3dS.p=100;
        this.debbug3dS.k=100;
        this.debbug3dS.s=20;*/

      /*  this.debbug3dS.setDebbudCont(this.dCont,1300,10,function(){
            visi3D.intRend=1;  
            self.drag()
        })*/




       //this.utilMetrik=new UtilMetrik();

        this.uMDebbug=new UMDebbug(this);
       







		this.update = function () {
           // this.debbug3dS.upDate()
            //this.drag()
			this.visi3D.upDate();
           // this.visi3D.intRend=1
		}

        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w = _w;
                h = _h;
                s = _s;   
            }

  			this.scale=s;
            this.dCont.scale=s;
            this.visi3D.sizeWindow(0,0,w,h)
                     
  		} 


  	}
}






export class UMDebbug{  
    constructor(par) { 
            
        this.type="UMDebbug";
        var self=this;
        this.par=par;
        this.radius=6378137;
        this.mashtab=250;
        this.mashtabOt=1/this.radius*this.mashtab;

        this.content3d=new THREE.Object3D()
        par.content3d.add(this.content3d);

        this.cont3d=new THREE.Object3D()
        this.content3d.add(this.cont3d);

        const geometry = new THREE.SphereGeometry( this.radius, 256, 256 );
        this.mesh=new THREE.Mesh(geometry,pm.matDop.getIDObj(16))
        this.cont3d.add(this.mesh)

        this.content3d.scale.set(this.mashtabOt,this.mashtabOt,this.mashtabOt)

        this.pp=new THREE.AxesHelper( this.radius*2)
        this.cont3d.add(this.pp)

        this.utilMetrik=new UtilMetrik();
        this.umdBox=new UMDBox(this)

        this.umdC=new UMDC(this)

        this.bMmove=false;




        this.token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTk4ODE3ZS0zNGI5LTQ2NjYtYWFmMi1mMjEwM2NhMTEwMmMiLCJpZCI6OTE2ODQsImlhdCI6MTY1MTE3MDMxNH0.pFrUc1_NUXivWboLf2nYKgjBzm2a7TaI9mvOC9OHXAE" 
        Cesium.Ion.defaultAccessToken =this.token;
        /*var v={x:6678271.14, y:25500482.23,z:0};
        var v1={x:60.131892, y:25.031317,z:0};
        var v3={x:v.x/v1.x, y:v.y/v1.y,z:0};
        var v4={x: 111060.3860593643, y: 1018743.1300558416, z: 0};
        trace("==",v3)
        //var cartographic = Cesium.Cartographic.fromCartesian(position);
        //var v1=Cesium.Cartographic.fromDegrees(v.y,v.x,v.z)
        var position = new Cesium.Cartesian3(v.y, v.x, v.z);
        var v1=Cesium.Ellipsoid.WGS84.cartesianToCartographic(position)
        trace(v)
        trace(v1)
        trace(v.x/6378137,v.y/6378137,)*/
       // this.utilMetrik.isCesium=true

        this.setSob=function(e){
            if(e.target!=null){
                var p=new THREE.Vector3();
                
                p.x=e.point.x/self.mashtabOt;
                p.y=e.point.y/self.mashtabOt;
                p.z=e.point.z/self.mashtabOt;
               
                self.setVisi("xyz",p)


                var v=self.utilMetrik.c_xyz_WGS84(p);
                self.setVisi("WGS84",v);

                var v=self.utilMetrik.c_xyz_cil(p);
                self.setVisi("cil",v);
                
                self.setVisi("i8b",self.utilMetrik.c_xyz_i8b(self.objArr["xyz"].vector))

                self.setVisi("i8c",self.utilMetrik.c_xyz_i8c(self.objArr["xyz"].vector))

                self.setP(p)
            }
        }

        visi3D.addChildMouse(this.cont3d);
        visi3D.addEvent("down",function(e){
            if(self.bMmove==false)self.setSob(e)
        })        
        visi3D.addEvent("move",function(e){    
            if(self.bMmove==true)self.setSob(e)
        })

        this.setP=function(v,b){
            if(!b)this.setVisi("i8b",this.utilMetrik.c_xyz_i8b(this.objArr["xyz"].vector))
            this.umdBox.setI(this.objArr["i8b"].vector,this.objArr["i8b"].bool)

            if(!b)this.setVisi("i8c",this.utilMetrik.c_xyz_i8c(this.objArr["xyz"].vector))

            this.umdC.setI(this.objArr["i8c"].vector,this.objArr["i8c"].bool)

            self.pp.position.copy(v)
            visi3D.intRend=1
        }





        



        this.array=[
            {name:"xyz",    vector:{x:0,y:0,z:0}, title:"xyz ||THREE.Vector3"},
            {name:"i8c",    vector:{x:0,y:0,z:0}, title:"i8c ||x,y:celind, z:radius ",bool:true},

            {name:"WGS84",  vector:{x:6675153.04,y:25500366.337,z:0}, title:"WGS84 ||x:lat y:long,z:высота"},
            {name:"cil",    vector:{x:0,y:0,z:0}, title:"cil ||x:lat y:long,z:высота"},
            {name:"i8b",    vector:{x:0,y:0,z:0}, title:"i8b ||x,y:box, z:sah 1..32 0-сброс 9null",bool:false},
            
        ]

        this.objArr={}
        for (var i = 0; i < this.array.length; i++) {
            this.objArr[this.array[i].name]=this.array[i]
        }

        this.otKor=function(name,ooo){
            
            if(name=="WGS84"){ 
                this.setVisi("xyz",this.utilMetrik.c_WGS84_xyz(this.objArr[name].vector))
                this.setVisi("cil",this.utilMetrik.c_WGS84_cil(this.objArr[name].vector))
                this.setP(this.objArr["xyz"].vector)
                //this.setVisi("EPSG",this.utilMetrik.c_WGS84_EPSG(this.objArr[name].vector))
                //this.setVisi("xyz",this.utilMetrik.c_WGS84_xyz(this.objArr[name].vector))
            }
           if(name=="xyz"){ 
                this.setVisi("WGS84",this.utilMetrik.c_xyz_WGS84(this.objArr[name].vector))
                this.setVisi("cil",this.utilMetrik.c_xyz_cil(this.objArr[name].vector))
                //this.setVisi("i8b",this.utilMetrik.c_xyz_i8b(this.objArr[name].vector))
                this.setP(this.objArr["xyz"].vector)
            }

            if(name=="cil"){ 
                
                this.setVisi("xyz",this.utilMetrik.c_cil_xyz(this.objArr[name].vector))
                this.setVisi("WGS84",this.utilMetrik.c_cil_WGS84(this.objArr["cil"].vector))
                this.setP(this.objArr["xyz"].vector)
            }
            if(name=="i8b"){
                this.setVisi("xyz",this.utilMetrik.c_i8b_xyz(this.objArr[name].vector))
                this.setVisi("WGS84",this.utilMetrik.c_xyz_WGS84(this.objArr["xyz"].vector))
                this.setVisi("cil",this.utilMetrik.c_xyz_cil(this.objArr["xyz"].vector))
                this.setP(this.objArr["xyz"].vector,true)
            }

            if(name=="i8c"){
                this.setVisi("xyz",this.utilMetrik.c_i8c_xyz(this.objArr[name].vector))
                this.setVisi("WGS84",this.utilMetrik.c_xyz_WGS84(this.objArr["xyz"].vector))
                this.setVisi("cil",this.utilMetrik.c_xyz_cil(this.objArr["xyz"].vector))
                this.setP(this.objArr["xyz"].vector,true)
            }
        }



        this.setVisi=function(name,vect){            
            this.objArr[name].vector.x=vect.x;
            this.objArr[name].vector.y=vect.y;
            this.objArr[name].vector.z=vect.z;

            this.objArr[name].obj["x"].value=vect.x;
            this.objArr[name].obj["y"].value=vect.y;
            this.objArr[name].obj["z"].value=vect.z;
        }


        //----------------------debbug----DCM--------------------------------
        
        this.localS=new LocalS(null,"UtilMetrik_Debbud_v1")

        self.d3dS=undefined
        var wind
        this.debbug=false
        this.setDebbudCont=function(dCont,x,y,fun){
            if(wind!=undefined){
                dCont.add(wind)
                return
            }
            if(window["DWindow"]==undefined){
                console.warn("Нет либы DCM либо она не подключена")
                return;
            }
            this.debbug=true



            dcmParam.fontSizeLitte=12


            var wind = new DWindow(dCont,x||0,y||0,"UtilMetrik_Debbud")
            wind.width=320;

            if(self.localS.object["UtilMetrik_bMmove"]==undefined) self.localS.object["UtilMetrik_bMmove"]=this.bMmove;
            this.bMmove=self.localS.object["UtilMetrik_bMmove"]


            var chek=new DCheckBox(wind, wind.width+2,2,"move",function(){
                self.localS.object["UtilMetrik_bMmove"]=this.value
                self.localS.save()
                self.bMmove=this.value;
            })
            chek.value=self.bMmove


            if(self.localS.object["UtilMetrik_pz_x"]!=undefined)this.utilMetrik.pz.x=self.localS.object["UtilMetrik_pz_x"]
            if(self.localS.object["UtilMetrik_pz_y"]!=undefined)this.utilMetrik.pz.y=self.localS.object["UtilMetrik_pz_y"]
            if(self.localS.object["UtilMetrik_pz_z"]!=undefined)this.utilMetrik.pz.z=self.localS.object["UtilMetrik_pz_z"]
            

            var slid=new DSliderBig(wind, wind.width+2,24,function(){
                self.localS.object["UtilMetrik_pz_x"]=this.value
                self.utilMetrik.pz.x=this.value
                self.localS.save()
                self.otKor("WGS84");
            },"x",-90,90)
            slid.value=this.utilMetrik.pz.x
            slid.width=200

            var slid1=new DSliderBig(wind, wind.width+2,70,function(){
                self.localS.object["UtilMetrik_pz_y"]=this.value
                self.utilMetrik.pz.y=this.value
                self.localS.save()
                self.otKor("WGS84");
            },"y",-90,90)
            slid1.value=this.utilMetrik.pz.y
            slid1.width=200

            var slid2=new DSliderBig(wind, wind.width+2,120,function(){
                self.localS.object["UtilMetrik_pz_z"]=this.value
                self.utilMetrik.pz.z=this.value
                self.localS.save()
                self.otKor("WGS84");
            },"y",-100,100)
            slid2.value=this.utilMetrik.pz.z
            slid2.width=200



            var b=new DButton(wind,wind.width-102,2,"test",function(){
                if(self.d3dS==undefined){
                    self.d3dS=new Debbug3dS()
                    self.content3d.add(self.d3dS)
                }


                var k=155;
                var kyy=20;
                self.d3dS.k=125*125;
                self.d3dS.s=111100/5;
                var po={x:0,y:0,z:0}
                var pppp={x:0,y:0,z:0}
                var pppp1,ppp2;
                var sr=21000
                var sagg=0
                for (var i = 0; i < k; i++) {
                    for (var j = 0; j < k; j++) {
                        pppp.x=self.objArr["cil"].vector.x+i/k*kyy
                        pppp.y=self.objArr["cil"].vector.y+j/k*kyy
                        pppp.z=self.objArr["cil"].vector.z;

                        pppp1=self.utilMetrik.c_cil_xyz(pppp)
                        ppp2=self.utilMetrik.c_xyz_i8c(pppp1,300000)
                        po=self.utilMetrik.c_i8c_xyz(ppp2)  
                        //po=self.utilMetrik.c_cil_xyz(pppp) 
                        if(self.d3dS.array[sagg]==undefined)continue
                        self.d3dS.array[sagg].position.set(po.x,po.y,po.z)
                        self.d3dS.array[sagg].scale.set(sr,sr,sr)
                        sagg++
                    }
                }

                for (var i = 0; i < k; i++) {
                    
                }
                visi3D.intRend=1

            })

            //wind.scale=0.7;
/*
            var panel=new DPanel(null,2,222);
            panel.width=wind.width-4
            var pObject=new DParamObject(panel.content,2,2,function(){          
                if(fun)fun();
            },1);
            pObject.width=panel.width-4;
            pObject.addObject(this.utilMetrik);
            panel.height=pObject.height+2;



            wind.addD(panel) */      
            

            function sob(){
                if(this.name=="i8c"){
                    self.objArr[this.name].vector.x=self.objArr[this.name].obj["x"].value
                    self.objArr[this.name].vector.y=self.objArr[this.name].obj["y"].value*1
                    self.objArr[this.name].vector.z=self.objArr[this.name].obj["z"].value*1

                    self.otKor(this.name,this)
                    return
                }
                self.objArr[this.name].vector.x=self.objArr[this.name].obj["x"].value*1
                self.objArr[this.name].vector.y=self.objArr[this.name].obj["y"].value*1
                self.objArr[this.name].vector.z=self.objArr[this.name].obj["z"].value*1

                self.otKor(this.name,this)
                
            }
            var pp=["x","y","z"]
            function plusD(_o){                
                var panel=new DPanel(null,2,222);
                panel.width=wind.width-4
                wind.addD(panel)



                var l=new DLabel(null,0,0,_o.title)

                l.fontSize=dcmParam.fontSizeLitte;            
                panel.addD(l);

                var pan=new DPanel(null,2,0);            
                pan.width=panel.width-4
                pan.height=28;

                var l1=new DLabel(pan.content,60,10,"")

                l1.fontSize=10; 

                l1.width=pan.width-l1.x

                let bb=new DButton(pan.content,2,2,"g",function(){
                    if(self.localS.object[_o.name]!==undefined){
                        self.localS.object[_o.name]=undefined
                        bb1.activMouse=false
                        l1.text=""
                        self.localS.save()
                        return
                    }

                    var s=_o.vector.x+" : "+_o.vector.y+" : "+_o.vector.z
                    self.localS.object[_o.name]=s;
                    self.localS.save()
                    
                    l1.text=s
                    bb1.activMouse=true
                }); 
                bb.width=bb.height=24
                let bb1=new DButton(pan.content,28,2,"s",function(){
                    var aa=self.localS.object[_o.name].split(":")
                    trace(aa)
                    if(aa[0])if(isNaN(aa[0]*1)!=true){
                        _o.vector.x=aa[0]*1;
                        trace(_o.obj)
                        _o.obj.x.value=aa[0]*1;
                    }
                    if(aa[1])if(isNaN(aa[1]*1)!=true){
                        _o.vector.y=aa[1]*1;
                        _o.obj.y.value=aa[1]*1;
                    }
                    if(aa[2])if(isNaN(aa[2]*1)!=true){
                        _o.vector.z=aa[2]*1;
                        _o.obj.z.value=aa[2]*1;
                    }
                    self.otKor(_o.name)

                }); 
                bb1.activMouse=false
                bb1.width=bb1.height=24
                var chek
                if(_o.bool!==undefined){
                    chek=new DCheckBox(pan.content,pan.width-24,2," ",function(){
                        
                        self.localS.object[_o.name+"_bool"]=chek.value;
                        _o.bool=chek.value
                        self.localS.save()
                    });
                    chek.value= _o.bool   
                }
                
                if(self.localS.object[_o.name]!==undefined){
                    l1.text=self.localS.object[_o.name]
                    bb1.activMouse=true;
                    var aa=self.localS.object[_o.name].split(":")
                    if(aa[0])if(isNaN(aa[0]*1)!=true){
                        _o.vector.x=aa[0]*1;
                    }
                    if(aa[1])if(isNaN(aa[1]*1)!=true){
                        _o.vector.y=aa[1]*1;
                    }
                    if(aa[2])if(isNaN(aa[2]*1)!=true){
                        _o.vector.z=aa[2]*1;
                    }
                } 

                if(self.localS.object[_o.name+"_bool"]!==undefined){
                    chek.value=self.localS.object[_o.name+"_bool"];
                    _o.bool=chek.value
                }










                panel.addD(pan);
                
                let a=_o.param;
                var okrug=0.01
                if(_o.name=="i8b")okrug=1
                let oo={}
                for (var i = 0; i < pp.length; i++) {
                    let o=new DInput(null,0,0,"",sob)
                    o.title=pp[i]
                    o.widthTitle=20;
                    o.height=18;
                    o.name=_o.name;
                    o.value=  _o.vector[pp[i]];                      
                    oo[pp[i]] = o;
                    o.max=999999999999999999999999999999999999999999999999999999999  
                    if(_o.name!=="i8c")o.setNum(okrug)
                    o.fontSize=dcmParam.fontSizeLitte; 
                    //o.okrug=0.0001

                   // o.bYY=false      
                    panel.addD(o);
                }
                _o.obj=oo;
                
            }
            for (var i = 0; i < this.array.length; i++) {
                plusD(this.array[i]);
            }           
        }




        this.setDebbudCont(par.dCont)

        this.otKor("WGS84");
           

    }
}

export class UMDC{  
    constructor(par) { 
            
        this.type="UMDC";
        var self=this;
        this.par=par;
        this.radius=6378137;



        this.cont3d=new THREE.Object3D()
        par.content3d.add(this.cont3d);

        this.array=[]
        const geometry = new THREE.BoxBufferGeometry( 1, 1, 1, 1, 1, 1 );
        
        //const geometry = new THREE.SphereGeometry( 0.5, 32, 32);
      
        for (var i = 0; i < 32; i++) {
            let m=new THREE.MeshPhongMaterial({
                color:0xffffff*Math.random(),
                //transparent:false,
                //opacity:0.3,
                wireframe:true,
            })
            //m.side=THREE.BackSide


            let mesh=new THREE.Mesh(geometry,m)
            this.cont3d.add(mesh)
            this.array[i]=mesh
        }

        /*let m=new THREE.MeshPhongMaterial({
                color:'#00ff00',
                transparent:false,
                opacity:0.1,
                wireframe:true,
            })

        let mesh=new THREE.Mesh(geometry,m)
        this.cont3d.add(mesh)
        mesh.scale.set(this.radius*4,this.radius*4,this.radius*4)*/

        
        this.clear=function(){
            for (var i = 0; i < 32; i++) {
                this.array[i].visible=false;
            }
        }

        this.zs=par.utilMetrik.zs
        var _rect = {x:0,y:0,z:0,whd:this.radius,id:0};
        var a=[] 
        var ss
        var ii,sah,lmm
        this.setI=function(v,b){
            this.clear()
            if(!b)return
            
            _rect.x=0;
            _rect.y=0;
            _rect.z=0;
            _rect.rt=v.y
            _rect.id="";
            _rect.whd=this.radius;
            var a=[]
            for (var i = 0; i < v.x.length; i++) {
                a[i]=v.x[i]*1
            }
            sah=0
            for (var i = 0; i < a.length; i++) {
            //for (var i = 0; i < 3; i++) {    
                this.daa(_rect,a[i]);
                sah++
            }

          

        }
        var sota=par.utilMetrik.sota;
        var ii;
        var ppi,ddd,ddd1
        var rew=1
        var ddsdf
        var mmm,ryy
        this.daa=function(r,v){
            
            rew=sota[v]

            r.x+=rew.x*r.whd/this.zs;
            r.y+=rew.y*r.whd/this.zs;
            r.z+=rew.z*r.whd/this.zs;
            

            if(this.array[sah]){
                ryy=r.whd*2;
                mmm = this.array[sah];
                mmm.visible=true;
                mmm.position.x=r.x;
                mmm.position.y=r.y;
                mmm.position.z=r.z;
                mmm.scale.set(ryy,ryy,ryy); 
                
            }
            r.whd/=2/this.zs;
            
           /* ppi=0;
            ddd=999999999999999999999999999999999999999999999999999999999
            for (ii = 1; ii < 9; ii++) {
                _point.x=r.x+_rect.whd*this.sota[ii].x;
                _point.y=r.y+_rect.whd*this.sota[ii].y;
                _point.z=r.z+_rect.whd*this.sota[ii].z;
                ddd1=this.getDistance3d(_point,v)
                    
                if(ddd1<ddd){
                    ddd=ddd1;
                    ppi=ii;
                    _point1.x=_point.x;
                    _point1.y=_point.y;
                    _point1.z=_point.z;
                }
            }

            if(ppi!=0){ 
                ddsdf=r.whd/2
                if(ddsdf<r.rt)return

                r.x=_point1.x;
                r.y=_point1.y;
                r.z=_point1.z;
                r.id+=ppi;                             
                r.whd=ddsdf
                this.daa(r,v,sah+1)
                
            }*/
            
        } 
    }
}










export class UMDBox{  
    constructor(par) { 
            
        this.type="UMDebbug";
        var self=this;

        this.radius=6378137;



        this.cont3d=new THREE.Object3D()
        par.content3d.add(this.cont3d);

        this.array=[]
        const geometry = new THREE.BoxBufferGeometry( 1, 1, 1, 1, 1, 1 );
        var mat = new THREE.MeshPhongMaterial()//pm.matDop.getIDObj(15);

        for (var i = 0; i < 32; i++) {
            let m=new THREE.MeshPhongMaterial({
                color:'#ff0000',
                transparent:false,
                opacity:0.1+i/32,
                wireframe:true,
            })

            let mesh=new THREE.Mesh(geometry,m)
            this.cont3d.add(mesh)
            this.array[i]=mesh
        }

    /*    let mesh=new THREE.Mesh(geometry,mat)
        this.cont3d.add(mesh)
        mesh.scale.set(this.radius*2,this.radius*2,this.radius*2)*/

        
        this.clear=function(){
            for (var i = 0; i < 32; i++) {
                this.array[i].visible=false
            }
        }


        var _rect = {x:0,y:0,z:0,whd:this.radius,id:0};
        var a=[] 
        var ss
        var ii,sah,lmm
         this.setI=function(v,b){
            this.clear()
            if(!b)return
            _rect.x=0;
            _rect.y=0;
            _rect.z=0;
            _rect.id=0;
            _rect.whd=this.radius*2;
            ss=v.x+""+v.y;
            sah=0
            for (var i = 0; i < ss.length; i++) {
                a[i]=ss[i]*1;
            }
            lmm=v.z;
            if(isNaN(lmm)==true)lmm=1;
            if(lmm<1)lmm=1;
            if(lmm>32)lmm=32;
            a.length=lmm//2//

            a.length=lmm//2//
            
            for (var i = 0; i < a.length; i++) {
                if(this.c_plusRec(a[i],_rect)==false)return
                sah++
            } 
                
                    
        }
        var mmm
        var ryy=0;
        var rss=0;
        var zdvigV=[0,0,0];
        this.c_plusRec=function(n,r){
            //let p = this.getNum(n,sah1-sah)
            if(n==1){this.setPR(-1,1,-1,r,n)  ;return true ;}               
            if(n==2){this.setPR(1,1,-1,r,n)   ;return true ;} 
            if(n==3){this.setPR(-1,1,1,r,n)   ;return true ;}           
            if(n==4){this.setPR(1,1,1,r,n)    ;return true ;} 

            if(n==5){this.setPR(-1,-1,1,r,n)    ;return true ;} 
            if(n==6){this.setPR(1,-1,1,r,n)    ;return true ;} 
            if(n==7){this.setPR(-1,-1,-1,r,n)    ;return true ;} 
            if(n==8){this.setPR(1,-1,-1,r,n)    ;return true ;}  

            return false;  
        } 
        this.setPR=function(n,n1,n2,r,t){
            zdvigV[0]=n;            
            zdvigV[1]=n1;
            zdvigV[2]=n2;
            
            r.whd/=2;
            rss=r.whd;//2
            r.x=r.x+zdvigV[0]*rss;
            r.y=r.y+zdvigV[1]*rss;
            r.z=r.z+zdvigV[2]*rss;
            
     
            

            mmm = this.array[sah];
            mmm.visible=true;
            ryy=r.whd*2
            mmm.scale.set(ryy,ryy,ryy)
            mmm.position.set(r.x,r.y,r.z)

        }
        
    }
}





export function LocalS(fun,_key) {
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

