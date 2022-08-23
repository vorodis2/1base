

export default function MPPZdvig (_par) {
	var self = this;
	this.par = _par;

	trace("#####")
	this.distans=0
	var v3=this.par.parent

	this.c3d=new THREE.Object3D()
	this.par.parent.groupObject.add(this.c3d)

	var aa=new THREE.AxesHelper(100)
    this.c3d.add(aa)

    var aa1=new THREE.AxesHelper(200)
    this.c3d.add(aa1)


	this.vector=new THREE.Vector3()
	this.vNull=new THREE.Vector3()
	this.setPoint=function(v){
		this.vector.copy(v);
		trace(v)
		this.distans=this.getDistance3d(this.vector, this.vNull)
		aa.position.x=v.x;
		aa.position.y=v.z;
		aa.position.z=-v.y;
		//aa.position.copy(v)
	}

	this.korect=function(t,p,po){
		if(this.distans==0)return;
		this["korect_"+t](p,po)
		
	}

	var a,a1,d,d1;
	var _v=new THREE.Vector3()
	var _v1=new THREE.Vector3()

	this.korect_rotationZ=function(p,po){
		
		_v.x=this.vector.x;
		_v.y=this.vector.y;
		a=p-po;
		a1 = this.getAngle(this.vNull, _v)
		d1 = this.getDistance(this.vNull, _v)
		trace("_v",a1);
		trace(_v);
		this.getVector(d1, a1+a, _v1)
		_v1.x-=_v.x;
		_v1.y-=_v.y;

		v3.xVerh+=_v1.x;
		this.vector.x-=_v1.x;
		aa.position.x=this.vector.x;
		//v3.yVerh+=_v1.x
		trace(_v1);
	}
	

    this.getAngle = function (a, b) {           
        return Math.atan2(b.y - a.y, b.x - a.x);
    };
    this.getDistance3d = function (p1, p2) {                    
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
    };
    this.getDistance = function (p1, p2) {        
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    };
    this.getVector = function (length, angle, point) {
        if (point == undefined) var point = new THREE.Vector2(0, 0);
        if (length < 0) angle += Math.PI;
        point.x = Math.abs(length) * Math.cos(angle);
        point.y = Math.abs(length) * Math.sin(angle);
        return point;
    };
}
