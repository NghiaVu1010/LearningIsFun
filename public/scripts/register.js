/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

//send the data to server
function registerCourse() {
    $.post("api/register", $("#registerForm").serialize(), function(data) {

    })
        .done(function() {
            alert("Registered successfully!");
        })
        .fail(function() {
            alert("There was a problem, please try again.");
        });

    return false;
}

function validateForm() {
    let errMsg = [];
    let allInput = $("input[type='text']");
    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    for(let i = 0; i < allInput.length; i++){
        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";
        }
    }

    if(regExp.test($("#emailField").val()) == false) {
        errMsg[errMsg.length] = "Please enter a valid email";
    }

    $("#errorMessages").empty();
    if (errMsg.length == 0) {
        return true;
    }
    else {
        for(let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
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
        let isValid = validateForm();

        if(isValid == false) return;

        //console.log($("#registerForm").serialize());

        registerCourse();
        location.href = "details.html?courseId=" + courseId;
    });

    $("#unregisterBtn").on("click", function() {
        location.href = "courses.html";
    });

    //cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "details.html?courseId=" + courseId;
    });
});