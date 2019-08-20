/*
* Description: Display details of the selected course
*
* Author: Neo
*/
"use strict";

/*
* Insert data into table with a new row
* 
* @param element (Object) - Create an row element to build table
*/
function showData(prop, value) {
    let element;

    //check to see if students key, then append each one
    if(prop == "Students") {
        //check to see if any students signed up, else display
        if(value == "") {
            element = "<tr><td>" + prop + "</td><td>No student's have signed up yet!</td></tr>";
        }
        else {
            element = "<tr><td>" + prop + ":</td></tr>";
            $("#coursesBody").append(element);
            $("tr:contains(Students) td").attr("colspan", 2);

            for(let i in value){
                element = "<tr><td>" + value[i].StudentName + "</td><td>" + value[i].Email + "</td></tr>"

                $("#coursesBody").append(element);
            }
            return false;
        }
    }
    //check for cost = 0.00
    else if(value == "0.00") {
        element = "<tr><td>" + prop + "</td><td>Free!</td></tr>";
    }
    else {
        element = "<tr><td>" + prop + "</td><td>" + value + "</td></tr>";
    }

    $("#coursesBody").append(element);
}

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    //grab course data and show
    let objs;
    $.getJSON("/api/courses/" + courseId, function(data) {
        objs = data;
        
        for(let i in objs) {
            showData(i, objs[i])
        }
    });

    //link to registration for current class
    $("#registerBtn").on("click", function() {
        location.href = "register.html?courseId=" + courseId;
    });

    $("#unregisterBtn").on("click", function() {
        alert("Coming soon");
    });

    $("#deleteBtn").on("click", function() {
        alert("Coming soon");
    });

    //cancel back to courses
    $("#cancelBtn").on("click", function() {
        location.href = "courses.html";
    });
});