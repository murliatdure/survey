var ux = {};

ux.communityProfileSuccess = function(r) {
    console.log(r);
    $.jStorage.set('communityBO', r);
    
    // List Of Services
    $.get('templates/surveylist.html', function (data) {
        $('#surveyList').empty();
        var compiled = Template7.compile(data);
        $('#surveyList').append(compiled(r.communitySurveyBOs));
        
        $(".trigger-open-survey").off("click");
        $(".trigger-open-survey").on("click", function() {
            // On Click of the survey - generate alpaca form
            $("#alpacaContainer").empty();
            var surveyID = $(this).data('id');
            /*console.log(surveyID);
            var surveyDB = TAFFY(r.communitySurveyBOs);
            console.log(surveyDB({}).get());
            */
            $(r.communitySurveyBOs).each(function(i,ele){
                if(ele.communityPreferences.id == surveyID) {
                    var surveyData = ele.communityPreferences.jsonValue;
                    if(surveyData) {
                        try {
                            surveyData = JSON.parse(surveyData);
                            console.log(surveyData);
                            $("#alpacaContainer").alpaca(surveyData);
                            $(".trigger-submit").removeClass('hide');
                            app.communityPreferenceBO = r.communitySurveyBOs[i];
                        }catch(e){
                            console.log(e);
                        }
                    }else{
                        console.log("no data found");
                    }
                }
            })
        });
        
        $(".trigger-submit").on("click", function() {
            console.log("11");
            app.saveSurvey('ux.surveySuccessCallback');
        })
    });
    
    
}

ux.surveySuccessCallback = function(r) {
    console.log(r);
    console.log("Thanks for your input!");
}