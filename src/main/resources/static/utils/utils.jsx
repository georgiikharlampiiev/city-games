import React from 'react';
const $ = require ('jquery');

var executeGetAction = function(url, successFunction, errorFunction){
    $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                console.info("ExecuteGetAction -> data :" ,data);
                successFunction(data);
            },
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                errorFunction(err.toString());
            },
            beforeSend: function(){
                $('#loader').show();
            },
            complete: function(){
                $('#loader').hide();
            }
        });
};

var executePostAction = function(url, sendData, successFunction, errorFunction){
    $.ajax({
        type: "POST",
        url: url,
        data: sendData,
        dataType: 'json',
        success: function (data) {
            console.info("ExecutePostAction -> data :" ,data);
            successFunction(data);
        },
        error: function (xhr, status, err) {
            console.error(url, status, err.toString());
            errorFunction(err.toString());
        },
        beforeSend: function(){
            $('#loader').show();
        },
        complete: function(){
            $('#loader').hide();
        }
    });
};

module.exports = { executeGetAction, executePostAction };