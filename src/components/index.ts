export function makeNewID(props){
    return props.id ? props.id : btoa(props.toString()) + Math.floor(Math.random() * 10000);
}