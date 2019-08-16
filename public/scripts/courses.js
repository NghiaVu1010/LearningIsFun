/*
* Description: 
*
* Author: Neo
*/
"use strict";

function displayData(list) {
    for(let i = 0; i < list.length; i++) {
        insertTableRow(list[i]);
    }
}

function insertTableRow(list) {
    let courseId = list.CourseId;
    let courseTitle = list.Title;
    let courseMeets = list.Meets;

    let element = 
    "<tr><td>" + courseId + 
    "</td><td>" + courseTitle + 
    "</td><td>" + courseMeets + 
    "</td><td><a href='details.html?courseId=" + courseId + "'>View Details</a>"+ 
    "</a></td></tr>";

    $("#coursesBody").append(element);
}

/*
* Build generic dropdown list
* 
* @param element (Object) - Create an option element to build drop down
*/
function buildList(dropdown, list) {
    for(let i = 0; i < list.length; i++) {
        let element = $("<option>", {text: list[i].Category, value: list[i].Value});
        dropdown.append(element);
    }
}

$(function() {
    let categoryData;
    $.getJSON("/api/categories", function(data) {
        categoryData = data;

        buildList($("#coursesDDL"), categoryData);
    });

    let courseData;
    $("#coursesDDL").on("change", function() {
        $("#coursesBody").empty();
        if($("#coursesDDL").val() == "") {
            $("#coursesTable").hide();
            return false;
        }
        else $("#coursesTable").show();

        $.getJSON("/api/courses/bycategory/" + $("#coursesDDL").val(), function(data) {
            courseData = data;

            displayData(courseData);
        });
    });
    
    // $("#addBtn").on("click", function() {
    //     location.href = "details.html";
    // });

    // Bind Click Event Handler to Reset Buttom
    $("#resetBtn").on("click", function() {
        $("#coursesTable").hide();
        $("#coursesBody").empty();
    });
});