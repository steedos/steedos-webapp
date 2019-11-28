export function makeNewID(props){
    return props.id ? props.id : btoa(props.toString()) + Math.floor(Math.random() * 10000);
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

