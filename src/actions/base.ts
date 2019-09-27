export function createAction(actionType: string, partialStateName: any, partialStateValue: any, object: any) {
    return {
        type: actionType,
        partialStateName,
        partialStateValue,
        object
    }
}