export const getObjectRecordUrl = (objectName, recordId, spaceId)=>{
    let url = `/app/-/${objectName}/view/${recordId}`;
    if (objectName === "instances"){
        url = `/workflow/space/${spaceId}/inbox/${recordId}`;
    }
    return getAbsoluteUrl(url);
}

export const getAbsoluteUrl = (url)=>{
    if (!/^http(s?):\/\//.test(url)) {
        if (window.__meteor_runtime_config__)
            url = window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX + url;
    }
    return url;
}