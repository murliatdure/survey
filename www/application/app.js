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

app.getFormData = function($form){
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function(n, i){
		indexed_array[n['name']] = n['value'];
	});

	return indexed_array;
}

app.preSaveSurvey = function(callback) {
    
    var lat = "0.00000";
    var lng = "0.00000";
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(positions){
            
            app.currentPosition = positions;
            console.log(app.currentPosition);
            app.saveSurvey(callback);
            
        });
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

app.saveSurvey = function(callback) {
    
    
    
    
    var communityBO = $.jStorage.get("communityBO");
    
    communityBO.community.createdAt = null;
	communityBO.community.updatedAt = null;
    
    var applicantBO = {};
     applicantBO.applicant = {};
    applicantBO.applicant.id = "111";
    applicantBO.applicant.name = "p";
	applicantBO.applicant.createdAt = null;
	applicantBO.applicant.updatedAt = null;

	var communityPreferencesByCaseType = {};
	communityPreferencesByCaseType.id = Number(app.communityPreferenceBO.communityPreferences.id);

	var communityPreferencesByServiceType = {};
	if(app.communityLinkedPreferenceBO) {
		communityPreferencesByServiceType.id = Number(app.communityLinkedPreferenceBO.communityPreferences.id);
	} else {
		communityPreferencesByServiceType.id = Number(app.communityPreferenceBO.communityPreferences.id);
	}



	var caseBO = {};
	var caseSet = {};
	caseSet.applicant = applicantBO.applicant;
	caseSet.community = communityBO.community;
	caseSet.communityPreferencesByCaseType = communityPreferencesByCaseType;
	caseSet.communityPreferencesByServiceType = communityPreferencesByServiceType;
	//caseSet.callBackYn = $("#reqCallbackFlag:checked").length > 0 ? 'Y' : 'N';
	//caseSet.callBackNo = $("#callBackNo").val();
	caseSet.latitude = app.currentPosition ? app.currentPosition.coords.latitude : null;
	caseSet.longitude = app.currentPosition ? app.currentPosition.coords.longitude : null;
	caseSet.activeYN = 'Y';
	caseSet.deleteYN = 'N';
	caseSet.status = 9;
    caseSet.type = "SURVEY";
	caseSet.caseExtensions = [];
	caseBO.caseSet = caseSet;

	var attributes = {};
	/*$.extend(true, attributes, JSON.parse(localStorage.getItem("f7form-edform")));*/
	//console.log(attributes);
	var cbValue = [];
	var cbParent = '';
	$('.multiSelect:checked').each(function(){
		cbParent = $(this).data('parent');
		cbValue.push($(this).data('checkbox-value'));
	});
    
    if(cbParent) {
	   attributes[cbParent] = cbValue;
    }
    
	var formData = app .getFormData($('#surveyForm'));
    console.log(formData);
	$.extend(true, attributes, formData);


	caseSet.caseExtensions = [{
		/*rate : null,
		comments : null,
		photoId: null,
		imageURL: null,
		audioURL: null,
		videoURL: null,
		summary : null,
		barCode : null,*/
		jsonValue : JSON.stringify(attributes)
	}];

	var caseExtendedDetails = {};
	caseExtendedDetails.socialService = false;
	caseExtendedDetails.liked = false;
	caseExtendedDetails.disliked = false;
	caseBO.caseExtendedDetails = caseExtendedDetails;

	//caseBO.caseSet.createdAt = moment().
	//alert(JSON.stringify(caseBO));
	console.log(caseBO);
	apiservices.createCase(caseBO, callback);
}

app.init();