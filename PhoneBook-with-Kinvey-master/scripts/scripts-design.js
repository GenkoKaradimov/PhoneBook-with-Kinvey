$(function(){
	//izpulni kogato e gotov DOM
	showHideNavigationBar();
	if(sessionStorage.getItem('authToken') == null)
		showOnlyHome();
	else 
		showOnlyPeople();
});

function divPopup (type, text) {
	if(type=="error") {
		$("#divPopupText").text(text);
		$("#divPopupText").css("background", "red");
		$("#divPopup").show(500);
	}
	
	if(type=="success") {
		$("#divPopupText").text(text);
		$("#divPopupText").css("background", "green");
		$("#divPopup").show(500);
	}
	
	if(type=="info") {
		$("#divPopupText").text(text);
		$("#divPopupText").css("background", "blue");
		$("#divPopup").show(500);
	}
};

function hideDivPopup() {
	$("#divPopup").hide(500);
}

function showOnlyHome() {
	    hideDivPopup();
		$("#divLogin").hide();
		$("#editPeople").hide();
		$("#divConfirm").hide();
		$("#divPersonalSetting").hide();
		$("#divRegister").hide();
		$("#divPeople").hide();
		$("#divAddPerson").hide();
		$("#divHome").show(500);
}
	
function showOnlyLogin() {
	    hideDivPopup();
		$("#divHome").hide();
		$("#divPersonalSetting").hide();
		$("#editPeople").hide();
		$("#divConfirm").hide();
		$("#divRegister").hide();
		$("#divPeople").hide();
		$("#divAddPerson").hide();
		$("#divLogin").show(500);
}

function showOnlyRegister() {
	    hideDivPopup();
		$("#divHome").hide();
		$("#editPeople").hide();
		$("#divPersonalSetting").hide();
		$("#divConfirm").hide();
		$("#divPeople").hide();
		$("#divAddPerson").hide();
		$("#divLogin").hide();
		$("#divRegister").show(500);
}

function showOnlyPeople() {
	    hideDivPopup();
		$("#divHome").hide();
		$("#editPeople").hide();
		$("#divPersonalSetting").hide();
		$("#divConfirm").hide();
		$("#divAddPerson").hide();
		$("#divLogin").hide();
		$("#divRegister").hide();
		$("#divPeople").show(500);
		//alert("9-people e izvikan, sledva startirane na zarejdaneto na telefoni");
		loadPhones();
		//alert("10-telefonite bi trqbvalo da sa zaredeni");
}

function showOnlyAddPerson() {
	    hideDivPopup();
	    $("#divHome").hide();
	    $("#editPeople").hide();
		$("#divLogin").hide();
		$("#divPersonalSetting").hide();
		$("#divRegister").hide();
		$("#divConfirm").hide();
		$("#divPeople").hide();
		$("#divAddPerson").show(500);
		
}

function showOnlyPersonalSettings() {
	    hideDivPopup();
		$("#divHome").hide();
		$("#editPeople").hide();
		$("#divLogin").hide();
		$("#divRegister").hide();
		$("#divPeople").hide();
		$("#divConfirm").hide();
		$("#divAddPerson").hide();
		$("#divPersonalSetting").show(500);
}

function showOnlyEditPage() {
	    //alert("3-zarejdane na stranicata za edit-vane");
	    hideDivPopup();
		$("#divPersonalSetting").hide();
		$("#divHome").hide();
		$("#divLogin").hide();
		$("#divRegister").hide();
		$("#divPeople").hide();
		$("#divAddPerson").hide();
		$("#divConfirm").hide();
		$("#editPeople").show(500);
}

function showOnlyConfirm() {
	    //alert("3-zarejdane na stranicata za edit-vane");
	    hideDivPopup();
		$("#divPersonalSetting").hide();
		$("#divHome").hide();
		$("#divLogin").hide();
		$("#divRegister").hide();
		$("#divPeople").hide();
		$("#divAddPerson").hide();
		$("#editPeople").hide();
		$("#divConfirm").show(500);
}

function showHideNavigationBar() {
	if(sessionStorage.getItem('authToken') == null) {
		//ne sme lognati
		$("#asideBarPersonalSettingsLink").hide();
		$("#asideBarLoginLink").show();
		$("#asideBarRegisterLink").show();
		$("#asideBarPeopleLink").hide();
		$("#asideBarAddPersonLink").hide();
		$("#asideBarLogoutLink").hide();
	}
	else {
		//lognati sme
		$("#asideBarPersonalSettingsLink").text(sessionStorage.getItem('lastUserName'));
		$("#asideBarPersonalSettingsLink").css("color", "rgb(85,26,139)");
		if(sessionStorage.getItem('lastUserName').length > 14)
			$("#asideBarPersonalSettingsLink").css("font-size", "0.6em");
		$("#asideBarPersonalSettingsLink").show();
		$("#asideBarLoginLink").hide();
		$("#asideBarRegisterLink").hide();
		$("#asideBarPeopleLink").show();
		$("#asideBarAddPersonLink").show();
		$("#asideBarLogoutLink").show();
	}
}





