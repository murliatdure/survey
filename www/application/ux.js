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
            console.log($(this));
        });
    });
    
    
}