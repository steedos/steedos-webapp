export function entityStateSelector(state: any, entityName: string){
    return state.entities ? state.entities[entityName] : undefined
}