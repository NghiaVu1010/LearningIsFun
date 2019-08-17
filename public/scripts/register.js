/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

//send the data to server
function registerCourse() {
    $.post("api/register", $("#registerForm").serialize(), function(data) {
        alert("Registered successfully!");
    });

    return false;
}

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    $("#courseId").val(courseId);

    $("input[type='text']").on("focus", function() {
        $(this).css({'background-color' : '#4ac3f3'});
    });

    $("input[type='text']").on("blur", function() {
        $(this).css({'background-color' : ''});
    });

    //send back to details after registration
    $("#registerBtn").on("click", function() {
        registerCourse();
        location.href = "details.html?courseId=" + courseId;
    });

    //cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "details.html?courseId=" + courseId;
    });
});