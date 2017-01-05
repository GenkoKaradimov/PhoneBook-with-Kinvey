const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_BkwFjY3u";
const kinveyAppSecret = "7de34ab6d2e644a88579a1b3fa42223f";

var lastUserName = ""; //po natatuk mu se zadava stoinost

function register() {
	// validaciq na formata
	if(document.getElementById("inputEmailRegister").value.length < 8)
		divPopup ("error", "Емейлът трябва да съдържа поне 8 знака!");
	
	else if(document.getElementById("inputNameRegister").value.length < 5)
	    divPopup ("error", "Името трябва да съдържа поне 5 знака!");
	
	else if(document.getElementById("inputPasswordRegister").value != document.getElementById("inputRePasswordRegister").value)
	    divPopup ("error", "Паролата не съвпадат!");
	
	else if(document.getElementById("inputPasswordRegister").value.length < 8)
	    divPopup ("error", "Паролата трябва да съдържа поне 8 знака!");
	
	else {
		//alert("reg called");
        lastUserName = $('#inputEmailRegister').val();
		const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
		const kinveyAuthHeaders = {
            'Authorization' : 'Basic ' + btoa(kinveyAppKey + ":" + kinveyAppSecret)
        };
		
        let userData = {
            username: $('#inputEmailRegister').val(),
            password: $('#inputPasswordRegister').val(),
            rePassword: $('#inputPasswordRegister').val(),
			fullname: $('#inputNameRegister').val()
        };
	    	
	    $.ajax({
            method: 'POST',
            url: kinveyRegisterUrl,
            headers: kinveyAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        });
		
		function registerSuccess(response) {
            let userAuth = response._kmd.authtoken;
            sessionStorage.setItem('authToken', userAuth);
		    sessionStorage.setItem('accountID', response._id);
            sessionStorage.setItem('lastUserName', lastUserName);
		    showHideNavigationBar();
            showOnlyPeople();
            divPopup("success", "Registration confirmed!");
        }
		clearForms();
		}
}

function login() {
	if(document.getElementById("inputEmailLogin").value.length < 8)
		divPopup ("error", "Имейлът трябва да съдържа поне 8 знака!");
	
	else if(document.getElementById("inputPasswordLogin").value.length < 8)
	    divPopup ("error", "Паролата трябва да съдържа поне 8 знака!");
	
	else {
		//alert("login e izvikana");
		lastUserName = $('#inputEmailLogin').val();
	    const kinveyLoginUrl = kinveyBaseUrl + 'user/' + kinveyAppKey + "/login";
        const kinveyAuthHeaders = { 'Authorization': 'Basic ' + btoa(kinveyAppKey + ":" + kinveyAppSecret) };
		
		let userData = {
        username: $('#inputEmailLogin').val(),
        password: $('#inputPasswordLogin').val()
        };
		
		$.ajax({
        method: 'POST',
        url: kinveyLoginUrl,
        data: userData,
        headers: kinveyAuthHeaders,
        success: loginSuccess,
        error: handleAjaxError
        });
		
		function loginSuccess(response) {
        let userAuth = response._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
		sessionStorage.setItem('accountID', response._id);
        sessionStorage.setItem('lastUserName', lastUserName);
		showHideNavigationBar();
        showOnlyPeople();
		divPopup("success", "Login successful!");
        }
		clearForms();
	}
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if(response.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    }
    if(response.responseJSON && response.responseJSON.description) {
        errorMsg = response.responseJSON.description;
    }
    divPopup("error", errorMsg);
}

function createNewPerson() {
	if(document.getElementById("inputFullNameAddPerson").value.length < 5)
		divPopup ("error", "Името трябва да съдържа поне 5 знака!");
	
	else if(document.getElementById("inputPhoneNumberAddPerson").value.length < 6)
		divPopup ("error", "Телефонният номер трябва да съдържа поне 6 знака!");
	
	else {
		
		const kinveyPhonesUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/phones";
        const kinveyAuthHeaders = {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        };
		
		let phonesData = {
            fullName: $('#inputFullNameAddPerson').val(),
            phoneNumber: $('#inputPhoneNumberAddPerson').val(),
            description: $('#inputDescriptionAddPerson').val()	
        };
		
		$.ajax({
            method: 'POST',
            url: kinveyPhonesUrl,
            headers: kinveyAuthHeaders,
            data: phonesData,
            success: createPhoneSuccess,
            error: handleAjaxError
        });
		
		function createPhoneSuccess(response) {
        showOnlyPeople();
        divPopup("success", "Phone number added successfully!");
        }
				
		clearForms();
	}
}

function logout() {
	sessionStorage.clear();
    showHideNavigationBar();
    showOnlyHome();
	clearForms();
	divPopup("success", "Successful logged out");
}

function clearForms () {
	//first clear login form
	$('#inputEmailLogin').val('');
	$('#inputPasswordLogin').val('');
	//clear register form
	$('#inputEmailRegister').val('');
	$('#inputNameRegister').val('');
	$('#inputPasswordRegister').val('');
	$('#inputRePasswordRegister').val('');
	//clear add person form
	$('#inputFullNameAddPerson').val('');
	$('#inputPhoneNumberAddPerson').val('');
	$('#inputDescriptionAddPerson').val('');
}

function isLoggedIn() {
	if(sessionStorage.getItem('authToken') == null)
		return 0;
	else return 1;
}

function loadPhones() {
	$('#divPeople').empty();

    const kinveyPhonesUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/phones";
    const kinveyAuthHeaders = {
        'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
    };
	
	$.ajax({
        method: 'GET',
        url: kinveyPhonesUrl,
        headers: kinveyAuthHeaders,
        success: loadBooksSuccess,
        error: handleAjaxError
    });

	function loadBooksSuccess(books) {
        //alert("funkciqta e izvikana");
		let loadedDivs = 0;//dvoino podsigurqvane....
        if(books.length == 0) {
            $('#divPeople').html('<p class="NoPhones">No phones in the library.</p>');
        } else {
			$('#divPeople').empty();
            for(let book of books) {
				 let PhoneDiv = $('<div>');
				 PhoneDiv.addClass("PhoneBox");
				 
				 let t = book._id;
				 
				 let PhoneCenterDiv = $('<div style="widht: 90%">');
				PhoneCenterDiv.append(
                    $('<p>').text("Fullname: " + book.fullName),
                    $('<p>').text("Phone number: " + book.phoneNumber),
                    $('<p>').text("Description: " + book.description),
                    $('<p>').html('<a class="contactLink" onclick = ' + 'deleting("'+ t + '")' + ' >DELETE THIS CONTACT</a> &nbsp;&nbsp; <a class="contactLink" onclick = ' + 'editing("'+ t + '")' + ' >EDIT THIS CONTACT</a>')
				); 
				if(book._acl.creator == sessionStorage.getItem('accountID')){
				PhoneDiv.append(PhoneCenterDiv);
		        PhoneCenterDiv = null;
                $('#divPeople').append(PhoneDiv);
				PhoneDiv = null;
				loadedDivs = loadedDivs + 1;}
                
			}
            if(books.length != 0 && loadedDivs==0)
				$('#divPeople').html('<p class="NoPhones">No phones in the library.</p>');
        }
    }
}
let nowIsEdit = 0;
function editing(numberID){
	//alert("1-butona edit e natisnat za nqkoi zapis");
	nowIsEdit = numberID;
	const kinveyGetUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/phones/" + numberID;
    const kinveyAuthHeaders = {
        'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
    };
	$.ajax({
        method: 'GET',
        url: kinveyGetUrl,
        headers: kinveyAuthHeaders,
        success: loadItemSuccess,
        error: handleAjaxError
    });
	function loadItemSuccess(books) {
		//alert("2-zaqvkata za redaktirane e zaredena uspeshno");
	    showOnlyEditPage();
		$("#inputFullNameEditPerson").val(books.fullName);
		$("#inputPhoneNumberEditPerson").val(books.phoneNumber);
		$("#inputDescriptionEditPerson").val(books.description);
		//alert("4-stranicata za edit-vane e zaredena");
	}
}

function editReady() {
	//alert("5-editReady e startirana");
	deleting(nowIsEdit); nowIsEdit = 0; hideDivPopup();
    //alert("6-bi trqbvalo da e iztrilo stariq zapis");
    //alert("7-zaqvka za zapis na noviq ");
	const kinveyPhonesUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/phones";
    const kinveyAuthHeaders = {
        'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
    };
    let phonesData = {
              fullName: $('#inputFullNameEditPerson').val(),
              phoneNumber: $('#inputPhoneNumberEditPerson').val(),
              description: $('#inputDescriptionEditPerson').val()
          };
      
    $.ajax({
              method: 'POST',
              url: kinveyPhonesUrl,
              headers: kinveyAuthHeaders,
              data: phonesData,
              success: editPhoneSuccess,
              error: handleAjaxError
          });
      
    function editPhoneSuccess(response) {
		  //location.reload();
		  //alert("8-noviq e zapisan");
          showOnlyPeople();
          divPopup("success", "Phone number edit successfully!");
          }
     	
    clearForms();
  
}

function deleting(numberID) {
	const kinveyDeleteUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/phones/" + numberID;  
    const kinveyAuthHeaders = {
        'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
    };
		
	$.ajax({
        method: 'DELETE',
        url: kinveyDeleteUrl,
        headers: kinveyAuthHeaders,
        success: successDel,
        error: handleAjaxError
    });
		
	function successDel(response) {
        showOnlyPeople();
        divPopup("success", "Number was removed successfully!");
    }	
}

function deleteAccount() {
	showOnlyConfirm();
	$("#divConfirmTitle").text("Delete account");
	$("#confirmButton").attr('onclick', 'deleteAccountAjax()');
}

function deleteAccountAjax() {
	 
	if(document.getElementById("inputEmailConfirm").value.length < 8)
		divPopup ("error", "Емейлът трябва да съдържа поне 8 знака!");
	
	else if(document.getElementById("inputPasswordConfirm").value.length < 8)
	    divPopup ("error", "Паролата трябва да съдържа поне 8 знака!");
	
	else if(document.getElementById("inputPasswordConfirm").value != document.getElementById("inputRePasswordConfirm").value)
	    divPopup ("error", "Паролата не съвпадат!");
	
	else {
	var numberID = sessionStorage.getItem('accountID');
	const kinveyDeleteUserUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/" + numberID;  
    const kinveyAuthHeaders = {
        'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
    };
	
	$.ajax({
        method: 'DELETE',
        url: kinveyDeleteUserUrl,
        headers: kinveyAuthHeaders,
        success: successDelUser,
        error: handleAjaxError
    });
	
	function successDelUser(response) {
        logout();
		showOnlyHome();
        divPopup("success", "User was deleted successfully!");
    }
	
	}
}










