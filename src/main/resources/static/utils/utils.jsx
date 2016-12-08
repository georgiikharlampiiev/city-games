import React from 'react';
const $ = require ('jquery');

const executeGetAction = function(url, successFunction, errorFunction, showLoader = true){
    $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                console.info("ExecuteGetAction -> url : ", url, " data: ", data);
                successFunction(data);
            },
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                errorFunction(err.toString());
            },
            beforeSend: function(){
                if(showLoader){
                    $('#loader').show();
                }
            },
            complete: function(){
                $('#loader').hide();
            }
        });
};

const executePostAction = function(url, sendData, successFunction, errorFunction){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: url,
        data: sendData,
        dataType: 'json',
        success: function (data) {
            console.info("ExecutePostAction -> data :", data);
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