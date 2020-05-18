export const t = (key:string, defaultValue:string)=>{
    return window.t ? window.t(key) : defaultValue;
}