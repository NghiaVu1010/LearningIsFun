/*
* Description: 
*
* Author: Neo
*/
"use strict";

function registerCourse() {
    $.post("api/register", $("#registerForm").serialize(), function(data) {
        $("#msgDiv").text("Registered!");
    });

    //console.log("we in?");
    return false;
}

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    $("#courseId").val(courseId);

    $("#registerBtn").on("click", function() {
        //alert("Feature Pending");
        registerCourse();
    });

    $("#cancelBtn").on("click", function() {
        location.href = "courses.html";
    });
});