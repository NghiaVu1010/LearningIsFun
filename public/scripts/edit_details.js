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
    let inputValue;

    if(value == "0.00") {
        value = "Free";
    }

    //console.log(prop);
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
    else if(prop == "CourseId" || prop == "Category") {
        inputValue = $("<input>", {value: value, name: prop.toLowerCase(), readonly: true});
        element = "<tr><td>" + prop + "</td><td></td></tr>";
    }
    else {
        inputValue = $("<input>", {value: value, name: prop.toLowerCase()});
        element = "<tr><td>" + prop + "</td><td></td></tr>";
    }

    $("#coursesBody").append(element);
    $("#coursesBody tr td:last").append(inputValue);
}

function validateForm() {
    let errMsg = [];
    let allInput = $("input[type='text']");
    let regExp = /^\d{2}\/\d{2}\/\d{2}$/;
    console.log("we in");

    for(let i = 0; i < allInput.length; i++){

        console.log(allInput[i].id);

        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";
        }
        else if(allInput[i].name == "startdate" || allInput[i].name == "enddate") {
            if(regExp.test($("#" + allInput[i].id).val().trim()) == false) {
                errMsg[errMsg.length] = allInput[i].name + " needs to be MM/DD/YY format";
            }
        }
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

    //grab course data and show
    let objs;
    $.getJSON("/api/courses/" + courseId, function(data) {
        objs = data;
        
        for(let i in objs) {
            showData(i, objs[i])
        }
    });

    //link to registration for current class
    $("#saveBtn").on("click", function() {
        validateForm();

        console.log("editing course");
        // $.ajax({
        //     url: "/api/courses",
        //     method: "PUT",
        //     data: $("#editForm").serialize(),
        //     done: function() {
        //         alert("Edit successful");
        //         location.href = "details.html?courseId=" + courseId;
        //     }
        // })
    });

    //cancel back to courses
    $("#cancelBtn").on("click", function() {
        location.href = "courses.html";
    });
});