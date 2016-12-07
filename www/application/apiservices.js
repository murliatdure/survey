var apiservices = {};
apiservices.api = "https://api.imonitorplus.com/api/imonitor/";

apiservices.loadCommunityProfile = function(communityBO, callback) {
    //var generatedSignature = md5(JSON.stringify(communityBO) + appKeys.salt);
    //+"&signature=" + generatedSignature
    var request = {
        url: apiservices.api + 'communities/profile.json?callback=' + callback,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(communityBO)
    };
    $.ajax(request);
}