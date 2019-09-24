export function createGridAction(actionType: string, partialStateName: any, partialStateValue: any, objectName: string) {
    return {
        type: actionType,
        partialStateName,
        partialStateValue,
        objectName
    }
}