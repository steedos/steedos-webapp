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

export const getRelativeUrl = (url)=>{
    if(window.Meteor && !/^http(s?):\/\//.test(url)){
        return window.Creator.getRelativeUrl(url)
    }
    return url;
}

export const isMobile = ()=>{
    if(window.Steedos && window.Steedos.isMobile()){
        // Steedos.isMobile中写的是：$(window).width()<767
        return true
    }else{
        return window.outerWidth < 767
    }
}