// ========== VARIABLES ==========
var currentTime = moment();

/** An object of today's Date
 * 
 * @property {Number} m_day Today's day
 * 
 * @property {Number} m_month Today's month
 */
var currentDate = { m_day: moment().date(), m_month: moment().date()};

var timerInterval;


// ========== RUNTIME FUNCTIONS ============

$("document").ready(function(){
    for(let i = 8; i <= 16; i++){
        var t_index = (i % 12) + 1;

        $("#button-" + t_index).on("click",HandleClick);
        $("#textarea-" + t_index).prop("disabled", false);
    }

    SetCurrentTimeblock();

    // Set timerInterval to update the time every 15 seconds
    timerInterval = setInterval(updateTime(), 15000);
});



// ========== FUNCTIONS ==========

/**
 * Updates the time and if the hour of currentTime doesn't match, calls @see SetCurretTimeblock
 */
function updateTime(){
    currentDate.m_day = moment().date();
    currentDate.m_month = moment().date();
    
    var t_time = moment();
    
    // Update timeblocks
    if(t_time.hour() != currentTime.hour()){
        SetCurrentTimeblock();
    }

    // Update current time
    currentTime = moment();
}

function HandleClick(a_event){

    if(!event.target.matches("button")){
        return;
    }

    var t_hour = $(event.target).data("index");
    $("#textarea-" + t_hour).prop("disabled", (a_property, a_value) => !a_value);
}

function SetCurrentTimeblock(){
    var t_hour = currentTime.moment();

    for(let i = 9; i <= 17; i++){
        // Remove time classes from textarea
        var t_index = ((i - 1) % 12) + 1;
        $("#textarea-" + t_index).removeClass(["past", "present", "future"]);

        // If the index is less than the current hour
        if(i < t_hour){
            $("#textarea-" + t_index).addClass("past").attr("disabled", "disabled");
            $("#button-" + t_index).off("click").attr("disabled", "disabled").css("background-color","gray");
        }
        // If the index is equal to the current hour
        else if(i == t_hour){
            $("#textarea-" + t_index).addClass("present");
        }
        // if the index is greater than the current hour
        else{
            $("#textarea-" + t_index).addClass("future");
        }
    }
}

function Testing(a_hour, a_minute, a_second){
    console.log("real time is " + currentTime);

    currentTime.hour(a_hour);
    currentTime.minute(a_minute);
    currentTime.second(a_second);

    console.log("time set to " + currentTime);
}

function TestingUpdate(){
    timerInterval = setInterval(updateTime, 1000);
    console.log(currentTime);
}