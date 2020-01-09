import { store } from '../stores'
export function entityStateSelector(state: any, entityName: string){
    return state.entities ? state.entities[entityName] : undefined
}

export function getObject(objectName: string){
    const state = store.getState();
    return state.entities ? state.entities.objects[objectName] : undefined
}