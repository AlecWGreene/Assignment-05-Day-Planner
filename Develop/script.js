// ========== VARIABLES ==========
var currentTime = new Date();

/** An object of today's Date
 * 
 * @property {Number} m_day Today's day
 * 
 * @property {Number} m_month Today's month
 */
var currentDate = { m_day: new Date().getDate(), m_month: new Date().getMonth()};

var timerInterval;


// ========== RUNTIME FUNCTIONS ============

$("document").ready(function(){
    for(let i = 8; i <= 16; i++){
        var t_index = (i % 12) + 1;

        $("#button-" + t_index).on("click",HandleClick);
        $("#textarea-" + t_index).prop("disabled", false);
    }

    SetCurrentTimeblock();

    // Set timerInterval to update the time every 5 minutes
    timerInterval = setInterval(updateTime(), 300000);
});



// ========== FUNCTIONS ==========

/**
 * Updates the time and if the hour of currentTime doesn't match, calls @see SetCurretTimeblock
 */
function updateTime(){
    currentDate.m_day = new Date().getDay();
    currentDate.m_month = new Date().getMonth();
    
    var t_time = new Date();
    
    // Update timeblocks
    if(t_time.getHours() != currentTime.getHours()){
        SetCurrentTimeblock();
    }

    // Update current time
    currentTime.setTime(t_time.getTime());
}

function HandleClick(a_event){

    if(!event.target.matches("button")){
        return;
    }

    var t_hour = $(event.target).data("index");
    $("#textarea-" + t_hour).prop("disabled", (a_property, a_value) => !a_value);
}

function SetCurrentTimeblock(){
    var t_hour = currentTime.getHours();

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

    var t_date = new Date();
    t_date.setHours(a_hour);
    t_date.setMinutes(a_minute);
    t_date.setSeconds(a_second);
    currentTime = new Date(t_date);

    console.log("time set to " + currentTime);
}

function TestingUpdate(){
    timerInterval = setInterval(updateTime, 1000);
    console.log(currentTime);
}