


TubLGB3D = function(curve) {

	this.curve=curve;//CatmullRomCurve3
	var self=this;


	var arrPoint=[];
	var arrCent=[];
	var arrProsent=[];
	var tangents=[];		
	this._sigmDist=30;

	this.content3D = new THREE.Object3D();


	var grid = [];
	var radialSegments=8;


	var distCurve=50;
	var sahCurve=20;
	var sahCurve2=0.1;
	var kolSigmrnt=0;
	var kolSigmrntStar=0;
	var pom;
	var pom2;
	var pom3;
	var pom4;	
	//дебаги
	var dBoxBlek=[];
	var vect;

	var radius = 10;
	var taper =  THREE.TubLabGeometry.NoTaper;
	var v,cx,cy,u,pos,theta,normal,binormal,pos2 = new THREE.Vector3(),r;



	var normals = [];
	var binormals = [];
	var vec = new THREE.Vector3();
	var mat = new THREE.Matrix4();
	//Ищем точки по кругу
	
	var setka=[];

	var point = new THREE.Vector2();
	var point1 = new THREE.Vector2();

	this.poiscPervu = function (num) {
		normals[ num ] = new THREE.Vector3();
		binormals[ num ] = new THREE.Vector3();
		smallest = Number.MAX_VALUE;
		tx = Math.abs( tangents[ num ].x );
		ty = Math.abs( tangents[ num ].y );
		tz = Math.abs( tangents[ num ].z );

		if ( tx <= smallest ) {
			smallest = tx;
			vec.set( 1, 0, 0 );
		}

		if ( ty <= smallest ) {
			smallest = ty;
			vec.set( 0, 1, 0 );
		}

		if ( tz <= smallest ) {
			vec.set( 0, 0, 1 );
		}
		vec.crossVectors( tangents[ num ], vec ).normalize();
		normals[ num ].crossVectors( tangents[ num ], vec );
		binormals[ num ].crossVectors( tangents[ num ], normals[ num ] );
	}	

	var geometry;
	var arrIndex;
	var arrPosition;
	var arrUv;
	var	arrNormal;
	//var imgTexture = THREE.ImageUtils.loadTexture( "p.jpg" );
	//var imgTexture = THREE.TextureLoader( "p.jpg" );
	var _materi=new THREE.MeshLambertMaterial( {} ); 
	
	var texloader = new THREE.TextureLoader();
	texloader.load("p4.jpg", function(tex) {
		
		
		_materi.map=tex;
		self.meshInd.material=new THREE.MeshLambertMaterial( {map:tex} )
	});
	

	this.meshInd;


	var kolSah=0;
	var kolSah2=0;
	var kolSah3=0;
	var nJ;
	this.zapolnenie=function(i, j, bSig){
		for (var k = 0; k < 6; k++) {
			arrIndex[kolSah+k]=kolSah+k;

			arrUv[kolSah*2+k*2]=Math.random();
			arrUv[kolSah*2+k*2+1]=Math.random();
		}

		kolSah3=kolSah*3;

		arrPosition[kolSah3]=setka[i][j].x;
		arrPosition[kolSah3+1]=setka[i][j].y;
		arrPosition[kolSah3+2]=setka[i][j].z;		

		kolSah3+=3;nJ=j+1;
		if(bSig==true)nJ=0;

		arrPosition[kolSah3]=setka[i+1][nJ].x;
		arrPosition[kolSah3+1]=setka[i+1][nJ].y;
		arrPosition[kolSah3+2]=setka[i+1][nJ].z;


		kolSah3+=3;nJ=j+1;
		if(bSig==true)nJ=0;

		arrPosition[kolSah3]=setka[i][nJ].x;
		arrPosition[kolSah3+1]=setka[i][nJ].y;
		arrPosition[kolSah3+2]=setka[i][nJ].z;



		kolSah3+=3;
		arrPosition[kolSah3]=setka[i][j].x;
		arrPosition[kolSah3+1]=setka[i][j].y;
		arrPosition[kolSah3+2]=setka[i][j].z;

		kolSah3+=3;
		arrPosition[kolSah3]=setka[i+1][j].x;
		arrPosition[kolSah3+1]=setka[i+1][j].y;
		arrPosition[kolSah3+2]=setka[i+1][j].z;		

		kolSah3+=3;nJ=j+1;
		if(bSig==true)nJ=0;
		arrPosition[kolSah3]=setka[i+1][nJ].x;
		arrPosition[kolSah3+1]=setka[i+1][nJ].y;
		arrPosition[kolSah3+2]=setka[i+1][nJ].z;



		//point.x=j/radialSegments;		
		//if(bSig==true)point1.x=1;
		//else point1.x=(j+1)/radialSegments;
		point.y=(j)/radialSegments;
		point.x=0;
		point1.x=1;


		if(bSig==true)point1.y=1;
		else point1.y=(j+1)/radialSegments;
		

		//uv
		kolSah3=kolSah*2;
		arrUv[kolSah3+1]=point.x;
		arrUv[kolSah3]=point.y;

		kolSah3+=2;
		arrUv[kolSah3+1]=point1.x;
		arrUv[kolSah3]=point1.y;

		kolSah3+=2;
		arrUv[kolSah3+1]=point.x;
		arrUv[kolSah3]=point1.y;

		///////
		kolSah3+=2;
		arrUv[kolSah3+1]=point.x;
		arrUv[kolSah3]=point.y;

		kolSah3+=2;
		arrUv[kolSah3+1]=point1.x;
		arrUv[kolSah3]=point.y;

		kolSah3+=2;
		arrUv[kolSah3+1]=point1.x;
		arrUv[kolSah3]=point1.y;





		kolSah+=6;
	}




	this.restartIndex=function(){
		var kolPoint=4*2*radialSegments*(kolSigmrnt-1);
		var nazBool=true;
		
		if(kolSigmrnt>kolSigmrntStar){
			
			arrIndex=null;
			arrPosition=null;
			arrUv=null;
			arrNormal=null;

			arrIndex=new Uint16Array(kolPoint);
			arrPosition=new Float32Array( kolPoint*3);
			arrUv=new Float32Array( kolPoint*2);
			arrNormal=new Float32Array( kolPoint*3 );
			
			if(kolSigmrntStar==0){
				nazBool=false;
				kolSigmrntStar=1;
				geometry=new THREE.BufferGeometry();

				geometry.addAttribute( 'position', new THREE.BufferAttribute( arrPosition, 3 ) );
				geometry.addAttribute( 'uv', new THREE.BufferAttribute( arrUv, 2 ) );
				//geometry.addAttribute( 'normals', new THREE.BufferAttribute( arrNormal, 3 ) );
				geometry.addAttribute( 'indexs', new THREE.BufferAttribute( arrIndex, 1 ) );		
				//geometry.computeBoundingSphere();

				this.meshInd = new THREE.Mesh(geometry, _materi);
				//this.meshInd.position.copy(arrCent[1]);
				this.meshInd.castShadow = true;
       			this.content3D.add(this.meshInd);

			}else{
				//this.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
				//this.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
				geometry.addAttribute( 'position', new THREE.BufferAttribute( arrPosition, 3 ) );
				geometry.addAttribute( 'uv', new THREE.BufferAttribute( arrUv, 2 ) );
				//geometry.addAttribute( 'normals', new THREE.BufferAttribute( arrNormal, 3 ) );
				geometry.addAttribute( 'indexs', new THREE.BufferAttribute( arrIndex, 1 ) );	
			}
			
			kolSigmrntStar=kolSigmrnt;
		}

		
		kolSah2=0;
		kolSah3=0;
		var i,j;
		
		kolSah=arrPosition.length;
		for (i = 0; i < kolSah; i++) {
			arrPosition[i]=0;
		}
		kolSah=arrIndex.length;
		for (i = 0; i < kolSah; i++) {
			arrIndex[i]=0;
		}


		kolSah=0;

		for (i = 0; i < kolSigmrnt-1; i++) {
			for (j = 0; j < radialSegments; j++) {
				if(j==radialSegments-1)this.zapolnenie(i,j, true);
				else this.zapolnenie(i,j, false);				
			}
		}


		
		
		geometry.attributes.position.needsUpdate = true;		
		geometry.attributes.uv.needsUpdate = true;
		//geometry.attributes.normals.needsUpdate = true;
		geometry.attributes.indexs.needsUpdate = true;
		//geometry.computeBoundingSphere();
		
		//this.content3D.add(this.meshInd);

		
	}

	this.plusSkura = function () {	
		
		
		this.restartIndex();
		//this.content3D.add(this.meshInd);
		



		
		
	}


	this.poiscRadius = function () {	
		var i,j;

		this.poiscPervu(0);


		for ( i = 1; i < kolSigmrnt; i ++ ) {
			this.poiscPervu(i);
			normals[ i ] = normals[ i - 1 ].clone();			
			binormals[ i ] = binormals[ i - 1 ].clone();
			vec.crossVectors( tangents[ i - 1 ], tangents[ i ] );
			if ( vec.length() > Number.EPSILON ) {
				vec.normalize();
				theta = Math.acos( THREE.Math.clamp( tangents[ i - 1 ].dot( tangents[ i ] ), - 1, 1 ) ); // clamp for floating pt errors
				normals[ i ].applyMatrix4(mat.makeRotationAxis( vec, theta ) );
			}
			binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );
		}

		var kol=0;
		for ( i = 0; i < kolSigmrnt; i ++ ) {
			pos = arrCent[i];
			tangent = curve.getTangentAt(arrProsent[i]);
			normal = normals[ i ];
			binormal = binormals[ i ];
			r = radius * taper( u );
			if(setka[i]==undefined)setka[i]=[];
			for ( j = 0; j < radialSegments; j ++ ) {
				v = j / radialSegments * 2 * Math.PI;
				cx = - r * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
				cy = r * Math.sin( v );
				pos2.copy( pos );
				pos2.x += cx * normal.x + cy * binormal.x;
				pos2.y += cx * normal.y + cy * binormal.y;
				pos2.z += cx * normal.z + cy * binormal.z;	
				arrPoint[kol] = new THREE.Vector3(pos2.x, pos2.y,pos2.z);
				
				if(setka[i][j]==undefined)setka[i][j]=new THREE.Vector3(pos2.x, pos2.y,pos2.z);
				else setka[i][j].set(pos2.x, pos2.y,pos2.z);
				this.plusMeshBox(setka[i][j],0xff0000,2.5);
				kol++;
			}
		}
	}


/*
	//Ищем центральные точки
	this.poiscCent = function () {		
		distCurve=this.getDistansSpline(20);
		sahCurve=distCurve/this._sigmDist;
		sahCurve2=sahCurve/distCurve;
		kolSigmrnt=0;

		arrProsent[0]=0;
		tangents[ 0 ] = this.curve.getTangentAt( 0);
		tangents[ 0 ].normalize();
		arrCent[0]=curve.getPoint(0);
		this.plusMeshBox(arrCent[0],0,5);
		this.plusMeshBoxRot(arrCent[kolSigmrnt], tangents[ kolSigmrnt ],0x00ff00)
		kolSigmrnt++;

		//наполнение и выравнисание сигментов
		for (var i = sahCurve2; i < 1; i+=sahCurve2) {			
			vect=curve.getPoint(i);	
			pom=this.getDistance3d(arrCent[kolSigmrnt-1], vect);
			pom2=this._sigmDist/pom;	
			i-=sahCurve2;
			pom3=sahCurve2*pom2;
			i+=pom3;
			if(i>1){
				i=1;
				vect=curve.getPoint(i);	
				pom=this.getDistance3d(arrCent[kolSigmrnt-1], vect);
				pom2=this._sigmDist/pom;
				arrCent[kolSigmrnt]=curve.getPoint(i);
				arrProsent[kolSigmrnt]=i;
				tangents[ kolSigmrnt ] = this.curve.getTangent( i);
				tangents[ kolSigmrnt ].normalize();
				this.plusMeshBox(arrCent[kolSigmrnt],0,5);
				kolSigmrnt++;
			}else{
				i-=pom3;
				pom4=pom3*pom2;
				i+=pom4;
				if(i>1)i=1;			
				
				
				vect=curve.getPoint(i);	
				pom=this.getDistance3d(arrCent[kolSigmrnt-1], vect);
				
				arrCent[kolSigmrnt]=curve.getPoint(i);
				arrProsent[kolSigmrnt]=i;
				tangents[ kolSigmrnt ] = this.curve.getTangent( i);
				tangents[ kolSigmrnt ].normalize();
				this.plusMeshBox(arrCent[kolSigmrnt],0,5);

				kolSigmrnt++;
			}
			this.plusMeshBoxRot(arrCent[kolSigmrnt-1], tangents[ kolSigmrnt-1 ],0x00ff00)
			
			
		}
		arrProsent[kolSigmrnt]=1;
		arrCent[kolSigmrnt]=curve.getPoint(1);
		arrProsent[kolSigmrnt]=1;
		tangents[ kolSigmrnt ] = this.curve.getTangentAt(1);
		tangents[ kolSigmrnt ].normalize();
		
		this.plusMeshBox(arrCent[kolSigmrnt],0,20.5);
		kolSigmrnt++;		
	}*/

	this.getProc = function(v , proc , sh) {
 		this.tempDist = this.getDistance3d(v, this.curve.getPoint(proc)); // дистанция
 		this.tryCount = 500; // количество попыток найти процент
 		var t=0;
 		var shah2 = 10;
 		if (this.tempDist <= this._sigmDist * 0.9) {
 			for (var i = 0; i < this.tryCount; i++) {
			
				this.tempDist = this.getDistance3d(v, this.curve.getPoint(proc));

				if ( this.tempDist <= this._sigmDist * 0.9) {
					proc+=sh;
					this.tempDist = this.getDistance3d(v, this.curve.getPoint(proc+sh*shah2));					
					if ( this.tempDist > this._sigmDist * 0.9) {
						shah2/=2;
					} else {

						proc+=sh*shah2;
						shah2*=2;
					}
				} else {

					return proc;
				}
			}

 		} else {
 			for (var i = 0; i < this.tryCount; i++) {

				this.tempDist = this.getDistance3d(v, this.curve.getPoint(proc));

				if ( this.tempDist >= this._sigmDist * 1.1) {
					proc-=sh;
					this.tempDist = this.getDistance3d(v, this.curve.getPoint(proc-sh*shah2));

					if (this.tempDist < this._sigmDist * 1.1) {
						shah2/=2;
					} else {
						proc-= sh*shah2
						shah2*=2;
					}

				} else {
					return proc;
				}
			}
 		}

		return 1;
	}

	this.testP = function() {
		arrProsent=[];
		arrCent=[];
		tangents=[];
		distCurve=this.getDistansSpline(20);
		sahCurve=distCurve/this._sigmDist;
		sahCurve2=sahCurve/distCurve/2;
		var v ;	
		var dis ;
		var pr = 0; // процент
		var kol = 0; // количество точек между основными точками
		
		kolSigmrnt = 0;

		/// первый елеметнт
		v = this.curve.getPoint(pr);
		arrProsent.push(pr);
		arrCent.push(v);
		tangents.push(this.curve.getTangent( pr));
		kolSigmrnt++;

		for (var i = 0; i < this.curve.points.length-1; i++) {
			dis = this.getDistance3d(this.curve.points[i], this.curve.points[i+1]);
			kol = Math.floor(dis / this._sigmDist);

			kolSigmrnt += kol+1;

			for (var j = 0; j <= kol; j++) {

				pr = this.getProc(v, pr, sahCurve2/10);
				v = this.curve.getPoint(pr);

				arrProsent.push(pr);
				arrCent.push(v);
				tangents.push(this.curve.getTangent( pr));
			}

		}

		/// последний елемент
		pr=1;
		v = this.curve.getPoint(pr);
		arrProsent.push(pr);
		arrCent.push(v);
		tangents.push(this.curve.getTangent( pr));
		kolSigmrnt++;
		/// рисуем коробки 
		for (var i = 0; i < arrCent.length; i++) {
			this.plusMeshBox(arrCent[i],0,5); 
		}

	}




	this.clear = function () {
        for (var i = this.content3D.children.length - 1; i >= 0; i--) {           
           //	this.content3D.remove(this.content3D.children[i]);
        }
    }

 	this.plusMeshBox = function (v, color, whd) {        
      /*  if(whd==undefined)whd=0.31;
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(whd, whd, whd), new THREE.MeshBasicMaterial({color: color}));
        this.mesh.position.copy(v);
        this.content3D.add(this.mesh);*/
    }

    this.plusMeshBoxRot = function (v, q, color, whd, d) {        
       /* if(whd==undefined)whd=7;
		if(d==undefined)d=60;
		this.cont = new THREE.Object3D();		
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(whd, d,  whd/4), new THREE.MeshBasicMaterial({color: color}));
       	this.cont.position.copy(v);
       	this.mesh.position.y=d/2;
       	this.cont.quaternion.x= q.x;
		this.cont.quaternion.y= q.y;
		this.cont.quaternion.z= q.z;

        this.cont.add(this.mesh);
        this.content3D.add(this.cont);*/
    }

	///длина волны с шагом NUM
    this.getDistansSpline = function (num) {
        this.pointDin=new THREE.Vector3();
        this.pointDin1=new THREE.Vector3();
        var rezult=0;
        for (var i = 1; i < num; ++i) {
            this.pointDin.copy(curve.getPoint((i-1) / num));
            this.pointDin1.copy(curve.getPoint((i) / num));
            rezult+= this.getDistance3d(this.pointDin, this.pointDin1);
        }       
        return rezult;
    }
    ///дистанция между 3д поинт
    this.getDistance3d= function(a,b){
        return Math.sqrt((b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y)+ (b.z - a.z)*(b.z - a.z));   
    }





    this.drag = function(){	
    	this.clear();
    	//this.poiscCent();
    	this.testP();
    	this.poiscRadius();
    	this.plusSkura();
    }

    this.drag();
}


