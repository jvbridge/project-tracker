/*******************************************************************************
 * Initialization
 ******************************************************************************/
// Make the time correct on page load
updateTime();

// Make it automatically update every second
setInterval(() => {
    updateTime();
},1000)


/*******************************************************************************
 * functions
 ******************************************************************************/

function updateTime(){
    $("#time").text(moment().format("h:mm:ss a"));
    $("#date").text(moment().format("MMM Do, YYYY"));
}