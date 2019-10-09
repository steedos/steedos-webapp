import _ from 'underscore';

function getCreatorApps(state: any) {
    let apps = state.entities ? state.entities.apps : {};
    let assigned_apps = state.entities ? state.entities.assigned_apps : [];
    let adminApp: any, sortedApps: any;

    _.each(apps, function (app: any, key: string) {
        if (!app._id) {
            app._id = key;
        }
        if (app.is_creator) {
        } else {
            app.visible = false;
        }
    });

    sortedApps = _.sortBy(_.values(apps), 'sort');

    let creatorApps: any = {};

    adminApp = {};

    _.each(sortedApps, function (n: any) {
        if (n._id === "admin") {
            return adminApp = n;
        } else {
            return creatorApps[n._id] = n;
        }
    });

    creatorApps.admin = adminApp;

    if (assigned_apps.length) {
        _.each(creatorApps, function (app: any, key: string) {
            if (assigned_apps.indexOf(key) > -1) {
                app.visible = app.is_creator;
            } else {
                app.visible = false;
            }
        });
    }
    return creatorApps;
}

function getVisibleApps(state: any, includeAdmin: boolean = true){
    let creatorApps = getCreatorApps(state);
    var apps: any = [];
    _.each(creatorApps, function (v: any, k: string) {
        if ((v.visible !== false && v._id !== "admin") || (includeAdmin && v._id === "admin")) {
            apps.push(v);
        }
    });
    return apps;
}

export default {
    getCreatorApps,
    getVisibleApps
}