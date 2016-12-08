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

apiservices.createCase = function(caseBO, callback) {
    var request = {
        url: apiservices.api + 'cases/save.json?callback=' + callback,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(caseBO),
        error:function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            if(jqXHR.status == 0) {
                //create case offline
                console.log(caseBO.caseSet.type);
                //ux.createOfflineRequest(caseBO.caseSet.type,caseBO);
            }
        },
        fail:function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    };
    $.ajax(request);
}