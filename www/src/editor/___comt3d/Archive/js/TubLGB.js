


TubLGB = function(path, segments, radius, radialSegments, closed, taper) {
	THREE.BufferGeometry.call( this );
	this.type = 'TubLGB';
	
	var triangles = 5000;
	var normals = new Float32Array( triangles * 3 * 3 );







	this.init = function(){
		

		var positions = new Float32Array( triangles * 3 * 3 );

		var colors = new Float32Array( triangles * 3 * 3 );

		var color = new THREE.Color();

		var n = 800, n2 = n/2;	// triangles spread in the cube
		var d = 120, d2 = d/2;	// individual triangle size

		var pA = new THREE.Vector3();
		var pB = new THREE.Vector3();
		var pC = new THREE.Vector3();

		var cb = new THREE.Vector3();
		var ab = new THREE.Vector3();

		for ( var i = 0; i < positions.length; i += 9 ) {

			// positions

			var x = Math.random() * n - n2;
			var y = Math.random() * n - n2;
			var z = Math.random() * n - n2;

			var ax = x + Math.random() * d - d2;
			var ay = y + Math.random() * d - d2;
			var az = z + Math.random() * d - d2;

			var bx = x + Math.random() * d - d2;
			var by = y + Math.random() * d - d2;
			var bz = z + Math.random() * d - d2;

			var cx = x + Math.random() * d - d2;
			var cy = y + Math.random() * d - d2;
			var cz = z + Math.random() * d - d2;

			positions[ i ]     = ax;
			positions[ i + 1 ] = ay;
			positions[ i + 2 ] = az;

			positions[ i + 3 ] = bx;
			positions[ i + 4 ] = by;
			positions[ i + 5 ] = bz;

			positions[ i + 6 ] = cx;
			positions[ i + 7 ] = cy;
			positions[ i + 8 ] = cz;

			// flat face normals

			pA.set( ax, ay, az );
			pB.set( bx, by, bz );
			pC.set( cx, cy, cz );

			cb.subVectors( pC, pB );
			ab.subVectors( pA, pB );
			cb.cross( ab );

			cb.normalize();

			var nx = cb.x;
			var ny = cb.y;
			var nz = cb.z;

			normals[ i ]     = nx;
			normals[ i + 1 ] = ny;
			normals[ i + 2 ] = nz;

			normals[ i + 3 ] = nx;
			normals[ i + 4 ] = ny;
			normals[ i + 5 ] = nz;

			normals[ i + 6 ] = nx;
			normals[ i + 7 ] = ny;
			normals[ i + 8 ] = nz;

			// colors

			var vx = ( x / n ) + 0.5;
			var vy = ( y / n ) + 0.5;
			var vz = ( z / n ) + 0.5;

			color.setRGB( vx, vy, vz );

			colors[ i ]     = color.r;
			colors[ i + 1 ] = color.g;
			colors[ i + 2 ] = color.b;

			colors[ i + 3 ] = color.r;
			colors[ i + 4 ] = color.g;
			colors[ i + 5 ] = color.b;

			colors[ i + 6 ] = color.r;
			colors[ i + 7 ] = color.g;
			colors[ i + 8 ] = color.b;

		}

		this.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
		this.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

		this.computeBoundingSphere();
	}

	this.drag = function(){		
		var k=this.attributes.position.array.length;		
		for (var i = 0; i < k; i++) {
			this.attributes.position.array[i]+=(Math.random()-0.5)*5
			this.attributes.normal.array[i]+=Math.random()*2-1
		}
		this.attributes.position.needsUpdate = true;
		this.attributes.normal.needsUpdate = true;
	}


	///-----------------
	var	normal = new THREE.Vector3(),
		tangents = [],
		normals = [],
		binormals = [],

		vec = new THREE.Vector3(),
		mat = new THREE.Matrix4(),

		numpoints = segments + 1,
		theta,
		smallest,
		tx, ty, tz,
		i, u;


	// expose internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;

	// compute the tangent vectors for each segment on the path

	for ( i = 0; i < numpoints; i ++ ) {
		u = i / ( numpoints - 1 );
		tangents[ i ] = path.getTangentAt( u );
		tangents[ i ].normalize();

	}

	
	this.rashotPoint=function(){
		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		smallest = Number.MAX_VALUE;
		tx = Math.abs( tangents[ 0 ].x );
		ty = Math.abs( tangents[ 0 ].y );
		tz = Math.abs( tangents[ 0 ].z );
		if ( tx <= smallest ) {
			smallest = tx;
			normal.set( 1, 0, 0 );
		}

		if ( ty <= smallest ) {
			smallest = ty;
			normal.set( 0, 1, 0 );
		}
		if ( tz <= smallest ) {
			normal.set( 0, 0, 1 );
		}
		vec.crossVectors( tangents[ 0 ], normal ).normalize();
		normals[ 0 ].crossVectors( tangents[ 0 ], vec );
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] );
	}
	this.rashotPoint();

	for ( i = 1; i < numpoints; i ++ ) {
		normals[ i ] = normals[ i - 1 ].clone();
		binormals[ i ] = binormals[ i - 1 ].clone();
		vec.crossVectors( tangents[ i - 1 ], tangents[ i ] );
		if ( vec.length() > Number.EPSILON ) {
			vec.normalize();
			theta = Math.acos( THREE.Math.clamp( tangents[ i - 1 ].dot( tangents[ i ] ), - 1, 1 ) ); 
			normals[ i ].applyMatrix4( mat.makeRotationAxis( vec, theta ) );
		}
		binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );
	}

	if ( closed ) {
		theta = Math.acos( THREE.Math.clamp( normals[ 0 ].dot( normals[ numpoints - 1 ] ), - 1, 1 ) );
		theta /= ( numpoints - 1 );
		if ( tangents[ 0 ].dot( vec.crossVectors( normals[ 0 ], normals[ numpoints - 1 ] ) ) > 0 ) {
			theta = - theta;
		}
		for ( i = 1; i < numpoints; i ++ ) {
			// twist a little...
			normals[ i ].applyMatrix4( mat.makeRotationAxis( tangents[ i ], theta * i ) );
			binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );
		}
	}

	this.init();
}
TubLGB.prototype = Object.create( THREE.BufferGeometry.prototype );
TubLGB.prototype.constructor = TubLGB;




// For computing of Frenet frames, exposing the tangents, normals and binormals the spline
THREE.TubLabGeometry.FrenetFrames = function ( path, segments, closed ) {

	var	normal = new THREE.Vector3(),

		tangents = [],
		normals = [],
		binormals = [],

		vec = new THREE.Vector3(),
		mat = new THREE.Matrix4(),

		numpoints = segments + 1,
		theta,
		smallest,

		tx, ty, tz,
		i, u;


	// expose internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;

	// compute the tangent vectors for each segment on the path

	for ( i = 0; i < numpoints; i ++ ) {
		u = i / ( numpoints - 1 );
		tangents[ i ] = path.getTangentAt( u );
		tangents[ i ].normalize();
	}




	initialNormal3();



	function initialNormal3() {

		// select an initial normal vector perpendicular to the first tangent vector,
		// and in the direction of the smallest tangent xyz component

		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		smallest = Number.MAX_VALUE;
		tx = Math.abs( tangents[ 0 ].x );
		ty = Math.abs( tangents[ 0 ].y );
		tz = Math.abs( tangents[ 0 ].z );

		if ( tx <= smallest ) {

			smallest = tx;
			normal.set( 1, 0, 0 );

		}

		if ( ty <= smallest ) {

			smallest = ty;
			normal.set( 0, 1, 0 );

		}

		if ( tz <= smallest ) {
			normal.set( 0, 0, 1 );
		}
		vec.crossVectors( tangents[ 0 ], normal ).normalize();
		normals[ 0 ].crossVectors( tangents[ 0 ], vec );
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] );
	}


	// compute the slowly-varying normal and binormal vectors for each segment on the path

	for ( i = 1; i < numpoints; i ++ ) {
		normals[ i ] = normals[ i - 1 ].clone();
		binormals[ i ] = binormals[ i - 1 ].clone();
		vec.crossVectors( tangents[ i - 1 ], tangents[ i ] );
		if ( vec.length() > Number.EPSILON ) {
			vec.normalize();
			theta = Math.acos( THREE.Math.clamp( tangents[ i - 1 ].dot( tangents[ i ] ), - 1, 1 ) ); // clamp for floating pt errors

			normals[ i ].applyMatrix4( mat.makeRotationAxis( vec, theta ) );

		}

		binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

	}


	// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

	if ( closed ) {

		theta = Math.acos( THREE.Math.clamp( normals[ 0 ].dot( normals[ numpoints - 1 ] ), - 1, 1 ) );
		theta /= ( numpoints - 1 );

		if ( tangents[ 0 ].dot( vec.crossVectors( normals[ 0 ], normals[ numpoints - 1 ] ) ) > 0 ) {

			theta = - theta;

		}

		for ( i = 1; i < numpoints; i ++ ) {
			// twist a little...
			normals[ i ].applyMatrix4( mat.makeRotationAxis( tangents[ i ], theta * i ) );
			binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

		}

	}

};