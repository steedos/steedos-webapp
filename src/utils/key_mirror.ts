export default function keyMirror(obj: any) {
    let key;
    let mirrored = {};
    if ( obj && typeof obj === 'object' ) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                mirrored[key] = key;
            }
        }
    }
    return mirrored;
}