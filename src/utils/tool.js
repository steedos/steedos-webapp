export const getObjectRecordUrl = (objectName, recordId, spaceId)=>{
    let url = `/app/-/${objectName}/view/${recordId}`;
    if (objectName === "instances"){
        url = `/workflow/space/${spaceId}/inbox/${recordId}`;
    }
    return getAbsoluteUrl(url);
}

export const getAbsoluteUrl = (url)=>{
    if(window.Meteor && !/^http(s?):\/\//.test(url)){
        return window.Steedos.absoluteUrl(url)
    }
    return url;
}