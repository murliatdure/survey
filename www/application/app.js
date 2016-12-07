var app = {};

app.init = function() {
    var communityBO = $.jStorage.get("communityBO");
    console.log(communityBO);
    if(!communityBO) {
        apiservices.loadCommunityProfile({
            uuid : config.uuid
        }, 'ux.communityProfileSuccess');
    } else {
        ux.communityProfileSuccess(communityBO);
    }
}

app.init();