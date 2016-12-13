// once everything is loaded, we run our Three.js stuff.
function init() {
    var stats = initStats();

    var scene = new THREE.Scene();

    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    
    // camera
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.x = 100;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //light
	var light = new THREE.PointLight(0xffffff,0.6);
	light.position.set(100,100,100);
	scene.add( light );
	/*var light2 = new THREE.PointLight(0xcccccc,0.2);
	light2.position.set(100,0,0);
	scene.add( light2 );*/

    //background
    var planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var plane = createMesh(planeMaterial,new THREE.PlaneGeometry(5, 20, 32));
    plane.position.x = 100;
    scene.add(plane);

    //Lock
	var cylinderMaterial = new THREE.MeshPhongMaterial( { 
	    color: 0xff0000, 
	    specular: 0x050505,
	    shininess: 100
	});
    //cylinderMaterial.wireframe = true;
    var cylinder = createMesh(cylinderMaterial,new THREE.CylinderGeometry(23, 23, 5,20));
    cylinder.rotation.z = 90 * Math.PI / 180;
    scene.add(cylinder);

	//Lock border
	var torusMaterial = new THREE.MeshPhongMaterial( { 
	    color: 0xff9900, 
	    specular: 0x232323,
	    shininess: 100
	});
    torusMaterial.wireframe = false;
    var torus = createMesh(torusMaterial,new THREE.TorusGeometry(25, 3, 16, 100));
    torus.rotation.y = 90 * Math.PI / 180;
    scene.add(torus);

    document.getElementById('lockpick').appendChild(webGLRenderer.domElement);

    var step = 0;

    render();

    function createMesh(material,geom) {
        var mesh = new THREE.Mesh( geom, material );
        return mesh;
    }
    function render() {
        stats.update();
        cylinder.rotation.x = step += 0.01;
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }
    function initStats() {
        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms
        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById('stats').appendChild(stats.domElement);
        return stats;
    }
}
window.onload = init;