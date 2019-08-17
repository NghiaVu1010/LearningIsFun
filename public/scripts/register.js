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

    return false;
}

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    $("#courseId").val(courseId);

    $("#registerBtn").on("click", function() {
        //alert("Feature Pending");
        registerCourse();
        alert("Successfully Registered!");
        location.href = "details.html?courseId=" + courseId;
    });

    $("#cancelBtn").on("click", function() {
        location.href = "details.html?courseId=" + courseId;
    });
});