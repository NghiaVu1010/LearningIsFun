/*
* Description: 
*
* Author: Neo
*/
"use strict";

function showData(prop, value) {
    if(typeof value === 'string') {
        value = value.replace("'", "`");
    }

    let element;
    if(prop == "Students") {
        element = "<tr><td>" + prop + ":</td></tr>";
        $("#coursesBody").append(element);
        $("tr:contains(Students) td").attr("colspan", 2);

        for(let i in value){
            element = "<tr><td>" + value[i].StudentName + "</td><td>" + value[i].Email + "</td></tr>"

            $("#coursesBody").append(element);
        }
    }
    else {
        element = "<tr><td>" + prop + "</td><td>" + value + "</td></tr>";
        $("#coursesBody").append(element);
    }
}

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    let objs;
    $.getJSON("/api/courses/" + courseId, function(data) {
        objs = data;
        
        for(let i in objs) {
            showData(i, objs[i])
        }
    });

    $("#registerBtn").on("click", function() {
        location.href = "register.html";
    });

    $("#cancelBtn").on("click", function() {
        location.href = "courses.html";
    });
});