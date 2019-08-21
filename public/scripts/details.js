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
    let remove;

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

                remove = $("<input>", {type: "button", class: "bg-danger float-right", id: "student" + i, value: "x"});
                $("#coursesBody tr td:last").append(remove);
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

function removeStudent(serial) {
    $.post("api/unregister", serial, function(data) {

    })
        .done(function() {
            alert("Unregistered successfully!");
            location.reload();
            //location.href = "details.html?courseId=" + courseId;
        })
        .fail(function() {
            alert("There was a problem, please try again.");
        });

    return false;
}

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    //grab course data and show
    let objs;
    let captainCrunch;
    $.getJSON("/api/courses/" + courseId, function(data) {
        objs = data;
        
        for(let i in objs) {
            showData(i, objs[i])
        }

        for(let i = 0; i < objs.Students.length; i++) {
            $("#student" + i).on("click", function() {
                captainCrunch = 
                "courseid=" + courseId + 
                "&studentname=" + objs.Students[i].StudentName + 
                "&email=" + objs.Students[i].Email;

                $("#unregisterModal").modal(focus);
            });
        }
    });

    //link to registration for current class
    $("#registerBtn").on("click", function() {
        location.href = "register.html?courseId=" + courseId;
    });

    $("#deleteBtn").on("click", function() {
        alert("Coming soon");
    });

    //cancel back to courses
    $("#cancelBtn").on("click", function() {
        location.href = "courses.html";
    });

    $("#confirmModalBtn").on("click", function () {
        removeStudent(captainCrunch);
    });
});