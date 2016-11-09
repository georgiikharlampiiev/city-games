import React from 'react';
const $ = require ('jquery');

var executeGetAction = function(url){

    var response;

    $.ajax({
            url: url,
            async: false,
            dataType: 'json',
            success: function (data) {
                console.info("executeGetAction data " ,data);
                response = data;
            },
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            },
            beforeSend: function(){
                $('#loader').show();
            },
            complete: function(){
                $('#loader').hide();
            }
        });
    return response;

};

module.exports = executeGetAction;