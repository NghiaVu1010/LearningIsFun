/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

/*
* Build generic dropdown list
* 
* @param element (Object) - Create an option element to build drop down
*/
function buildList(dropdown, list) {
    for(let i = 0; i < list.length; i++) {
        let element = $("<option>", {text: list[i].Category, value: list[i].Category});
        dropdown.append(element);
    }
}

//send the data to server
function addCourse() {
    $.post("api/courses", $("#courseForm").serialize(), function(data) {
        console.log(data);
    })
    .done(function() {
        alert("Added successfully!");
    })
    .fail(function() {
        alert("There was a problem, please try again.");
    });

    return false;
}

//complex-generic validation form
function validateForm() {
    let errMsg = [];
    let allInput = $("input[type='text']");
    let regExp = /^\d{2}\/\d{2}\/\d{2}$/;

    for(let i = 0; i < allInput.length; i++){
        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";
        }
        else if(allInput[i].name == "startdate" || allInput[i].name == "enddate") {
            if(regExp.test($("#" + allInput[i].id).val().trim()) == false) {
                errMsg[errMsg.length] = allInput[i].name + " needs to be MM/DD/YY format";
            }
        }
    }

    if($("#coursesDDL").val() == "") {
        errMsg[errMsg.length] = "category is required";
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
    //dynamically build DDL with categories
    let categoryData;
    $.getJSON("/api/categories", function(data) {
        categoryData = data;

        buildList($("#coursesDDL"), categoryData);
    });

    $("input[type='text']").on("focus", function() {
        $(this).css({'background-color' : '#4ac3f3'});
    });

    $("input[type='text']").on("blur", function() {
        $(this).css({'background-color' : ''});
    });

    $("#addCourseBtn").on("click", function() {
        let isValid = validateForm();

        if(isValid == true) {
            //console.log("adding course");
            addCourse();
            location.href = "details.html?courseId=" + $("#addId").val();
        }
    });

    //cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "courses.html";
    });
});