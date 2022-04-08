/*******************************************************************************
 * Global variables
 ******************************************************************************/
var projectNameInput = $("#project-name-input");
var projectTypeInput = $("#project-type-input");
var hourlyWageInput = $("#hourly-wage-input");
var dueDateInput = $("#due-date-input");


/*******************************************************************************
 * Initialization
 ******************************************************************************/
// Make the time correct on page load
updateTime();

// Make it automatically update every second
setInterval(() => {
    updateTime();
},1000)

// dueDateInput.datepicker();

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
 * @param {string} projectName 
 * @param {string} projectType 
 * @param {number} hourlyWage 
 * @param {Date} dueDate 
 */
function createProject(projectName, projectType, hourlyWage, dueDate){
    var tableRow = $("<tr></tr>");
    var projectNameEle = $("<td>"+ projectName + "</td>");
    var projectTypeEle = $("<td>" + projectType + "</td>");
    var hourlyWageEle = $("<td>" + hourlyWage + "</td>");
    var dueDateEle = $("<td>"+ moment(dueDate, "YYYY-MM-DD").format("d/m/YYYY") + "</td>");
    
    // days until due
    var dayOfYearDue = moment(dueDate, "YYYY-MM-DD").dayOfYear();
    var currentDayOfYear = moment().dayOfYear();
    
    var daysUntilDue = dayOfYearDue - currentDayOfYear;
    if (daysUntilDue < 0){
        daysUntilDue = "project due!";
    }
    var daysUntilDueEle = $("<td>" + daysUntilDue + "</td>");

    var potentialEarnings = daysUntilDue * hourlyWage * 8;
    var potentialEarningsEle = $("<td>$" + potentialEarnings + "</td>");

    tableRow.append(projectNameEle);
    tableRow.append(projectTypeEle);
    tableRow.append(hourlyWageEle);
    tableRow.append(dueDateEle);
    tableRow.append(daysUntilDueEle);
    tableRow.append(potentialEarningsEle);

    $("#table-body").append(tableRow);
};