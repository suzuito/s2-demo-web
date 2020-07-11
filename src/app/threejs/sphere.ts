import * as THREE from 'three';

export function unitSphere(el: HTMLElement): [THREE.Scene, THREE.PerspectiveCamera, THREE.WebGLRenderer] {
    // Unit sphere
    const scene = new THREE.Scene();
    const geometry = new THREE.WireframeGeometry(
        new THREE.SphereGeometry(
            1, 50, 50,
            0,
            Math.PI * 2,
            0,
            Math.PI * 2,
        ),
    );
    const sphere = new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 0.1,
            linecap: 'round',
            linejoin: 'round',
            opacity: 0.1,
            transparent: true,
        }),
    );
    scene.add(sphere);

    /*
    const clickedAsThreeObject = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const clickedAsThreeObjectMaterial = new THREE.MeshNormalMaterial();
    const clickedAsThreeObjectMesh = new THREE.Mesh(
        clickedAsThreeObject,
        clickedAsThreeObjectMaterial,
    );
    const clickedLine1 = new THREE.Line();
    const clickedLine2 = new THREE.Line();
    const clickedLine3 = new THREE.Line();
    const groupedPoint = new THREE.Group();
    groupedPoint.add(clickedAsThreeObjectMesh);
    groupedPoint.add(clickedLine1);
    groupedPoint.add(clickedLine2);
    groupedPoint.add(clickedLine3);
    scene.add(this.groupedPoint);
    */

    const camera = new THREE.PerspectiveCamera(
        20,
        1,
        0.1,
        1000,
    );
    camera.position.z = 10;

    const width = 500;
    const height = 500;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    // let rotationY = 0;
    // setInterval(
    //     () => {
    //         rotationY += 0.01;
    //         sphere.rotation.y = rotationY;
    //         this.groupedPoint.rotation.y = rotationY;
    //         const g1 = new THREE.Geometry();
    //         g1.vertices.push(new THREE.Vector3(
    //             0,
    //             0,
    //             0,
    //         ));
    //         g1.vertices.push(new THREE.Vector3(
    //             clickedAsThreeObjectMesh.position.x,
    //             clickedAsThreeObjectMesh.position.y,
    //             clickedAsThreeObjectMesh.position.z,
    //         ));
    //         clickedLine1.geometry = g1;
    //         renderer.render(this.scene, camera);
    //     },
    //     100,
    // );

    return [scene, camera, renderer];
}

export function displayRotateY(
    s: THREE.Scene,
    c: THREE.PerspectiveCamera,
    r: THREE.WebGLRenderer,
    g: THREE.Group,
): void {
    let rotationY = 0;
    setInterval(
        () => {
            rotationY += 0.01;
            s.rotation.y = rotationY;
            g.rotation.y = rotationY;
            r.render(s, c);
        },
        100,
    );
}
