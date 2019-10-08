export function makeNewID(props){
    console.log('makeNewID props', props);
    return props.id ? props.id : btoa(props.toString()) + Math.floor(Math.random() * 10000);
}