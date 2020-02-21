function getRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export function makeNewID(props){
    return props.id ? props.id : getRandomString(16);
}

export {default as Bootstrap} from './bootstrap';
export {default as Dashboard} from './dashboard';
export {default as Grid} from './grid';
export {default as Lookup} from './lookup';
export {default as Organizations} from './organizations';
export {default as SelectUsers} from './select_users';
export {default as Tree} from './tree';
export {default as WidgetApps} from './widget_apps';
export {default as WidgetObject} from './widget_object';
export {default as Notifications} from './notifications';
export {default as Favorites} from './favorites';
export {default as Flows} from './flows';
export {default as FlowsModal} from './flows_modal';
export * from './slds_app_launcher'
export * from './slds_illustration'


