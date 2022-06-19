var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var nameRequired = document.getElementById("nameRequired");
var urlRequired = document.getElementById("urlRequired");
var sitesContainer;

//localStorage Checked
if(localStorage.getItem("mySites") != null){
    sitesContainer = JSON.parse(localStorage.getItem("mySites")) 
    displaySite(sitesContainer)
}
else{
    sitesContainer = [];
}

// Add Site function
function addSite(){
    
    var site ={
        siteName:siteName.value,
        siteURL:siteURL.value
    }

    if(siteName.value == "" && siteURL.value == "" ){
        nameRequired.classList.replace("d-none", "d-block");
        nameRequired.value = "Name is required";
        urlRequired.classList.replace("d-none", "d-block");
    }
    else if(siteURL.value == ""){
        urlRequired.classList.replace("d-none", "d-block");
    }
    else if(siteName.value == ""){
        nameRequired.classList.replace("d-none", "d-block");
        nameRequired.value = "Name is required";
    }
    else if(check() == true){
        nameRequired.classList.replace("d-none", "d-block");
        nameRequired.value = "this name already exist";
    }
    else{
        sitesContainer.push(site)
        localStorage.setItem("mySites",JSON.stringify(sitesContainer) );
        clearForm()
        displaySite(sitesContainer);
    }
}

//check name exist
function check(){
    for(var i = 0; i<sitesContainer.length; i++){
        if(siteName.value == sitesContainer[i].siteName){
            return true;
        }
        else{
            nameRequired.classList.add("d-none");
        }
    }
}

//Clear Form Function
function clearForm(){
    siteName.value = ""
    siteURL.value = ""
    nameRequired.classList.add("d-none");
    urlRequired.classList.add("d-none");
}

//Display Site Function
function displaySite(sitesList){

    var displayContainer = ``
    
    for(var i = 0; i<sitesList.length; i++){
        displayContainer += `
    
        <div class="p-4 mb-4" >
            <div class="w-50 d-flex justify-content-between">
                <h4>${sitesList[i].siteName}</h4>
                <div>
                    <a target="_blank" href="${sitesList[i].siteURL}" class="btn btn-primary me-3 ">Visit</a>
                    <button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>`
    }
    document.getElementById("singleSite").innerHTML = displayContainer;
}

//Delete Site Function
function deleteSite(deletedIndex){
    sitesContainer.splice(deletedIndex,1);
    localStorage.setItem("mySites",JSON.stringify(sitesContainer) );
    displaySite(sitesContainer)
}