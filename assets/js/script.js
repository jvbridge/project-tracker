/*******************************************************************************
 * Global variables
 ******************************************************************************/
// modal elements
var projectNameInput = $("#project-name-input");
var projectTypeInput = $("#project-type-input");
var hourlyWageInput = $("#hourly-wage-input");
var dueDateInput = $("#due-date-input");

// list of projects to store as data
var projects = [];
// list of the elements on the table
var projectRows = [];

var localStorageKey = "projectTracker";
/*******************************************************************************
 * Initialization
 ******************************************************************************/
// Make the time correct on page load
updateTime();

// gets all the projects we've made
retrieveLocal();

// Make it automatically update every second
setInterval(() => {
    updateTime();
},1000)

// add project button
$("#add-project-button").on("click", ()=>{
    // retrieve the values from the DOM
    var projectName = projectNameInput.val();
    var projectType = projectTypeInput.val();
    var hourlyWage = hourlyWageInput.val();
    var dueDate = dueDateInput.val();

    // clear them 
    projectNameInput.val("");
    projectTypeInput.val("");
    hourlyWageInput.val("");
    dueDateInput.val("");

    // use a helper function to make the project
    createProject(projectName, projectType, hourlyWage, dueDate);

    // hide the modal
    $("#create-project-modal").modal("hide");
});

/*******************************************************************************
 * functions
 ******************************************************************************/

function updateTime(){
    $("#time").text(moment().format("h:mm:ss a"));
    $("#date").text(moment().format("MMM Do, YYYY"));
}

/**
 * Creates a project table row element and appends it to the project table
 * @param {string} projectName name of the project
 * @param {string} projectType type of the project
 * @param {number} hourlyWage how much money per hour
 * @param {string} dueDate the day it is due in YYYY-MM-DD format
 */
function createProject(projectName, projectType, hourlyWage, dueDate){
    // main row to append
    var tableRow = $("<tr></tr>");
    // elements based on arguments
    var projectNameEle = $("<td>"+ projectName + "</td>");
    var projectTypeEle = $("<td>" + projectType + "</td>");
    var hourlyWageEle = $("<td>" + hourlyWage + "</td>");
    var dueDateEle = $("<td>"+ moment(dueDate, "YYYY-MM-DD").format("D/M/YYYY") + "</td>");

    // days until due
    var momentDue = moment(dueDate, "YYYY-MM-DD");
    var momentToday = moment();
    var daysUntilDue = momentDue.diff(momentToday,"days");

    // declaration for easy modification
    var potentialEarnings;
    // if the due date is today or in the past
    if (daysUntilDue < 0){
        daysUntilDue = "project due!";
        potentialEarnings = 0;
    } else {
        potentialEarnings = daysUntilDue * hourlyWage * 8;
    }

    // append those elements
    var daysUntilDueEle = $("<td>" + daysUntilDue + "</td>");
    var potentialEarningsEle = $("<td>$" + potentialEarnings + "</td>");

    // finished making the items for the row, so we append them
    tableRow.append(projectNameEle);
    tableRow.append(projectTypeEle);
    tableRow.append(hourlyWageEle);
    tableRow.append(dueDateEle);
    tableRow.append(daysUntilDueEle);
    tableRow.append(potentialEarningsEle);

    // we have all the information we need, now we will store it
    projectData = {
        projectName: projectName,
        projectType: projectType,
        hourlyWage: hourlyWage,
        dueDate: dueDate
    }

    // for local storage
    projects.push(projectData);
    storeLocal(); // over writes local storage, should not

    // our current index for removal of this element later
    var projectIndex = projects.length - 1;

    // button addition
    var buttonEle = $("<button class='btn btn-primary text-dark'>Delete</button>");
    buttonEle.on("click", ()=>{
        // remove the element from the row
        tableRow.remove();
        // remove the element from storage array
        projects.splice(projectIndex, 1);

        // Update local storage
        storeLocal();
    });

    tableRow.append(buttonEle);
    // append the row to the table-body
    $("#table-body").append(tableRow);
};

// Testing function for ease of use
function createABunchOfProjects(){
    createProject("Hitchhike accross the galaxy","everything","42","2022-08-21");
    createProject("Procrastinate","everything","12","2021-08-21");
}

/**
 * Function to update local storage. Able to be called in the middle of a 
 * retrieval as well
 */
function storeLocal(){
    console.log("storing local");
    console.log(projects);
    // simply stringifies the projects[] array and sends it to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(projects));
}

/**
 * Function that retrives all infor0mation from local storage
 */
function retrieveLocal(){
    console.log("retrieving local");
    // empty the table just in case
    $("#table-body").empty();
    // overwrite our projects array
    var local = localStorage.getItem(localStorageKey);
    // if we find something write it in
    if(local){
        // temporary array to hold our projects
        var projectsList = JSON.parse(local);
        projects = [];
        // loop over the array making projects as we go
        projectsList.forEach(element => {
            createProject(
                element.projectName,
                element.projectType,
                element.hourlyWage,
                element.dueDate
            )
        });
    } else {
        // we found nothing, just make a new array
        projects =[];
        storeLocal();
    }
};

/**
 * removes all projects
 */
function clearProjects(){
    $("#table-body").empty();
    projects = [];
    storeLocal();
}