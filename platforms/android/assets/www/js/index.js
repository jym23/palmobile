/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('load', this.onDeviceLoad, false);
        //document.addEventListener('offline', this.onDeviceOffline, false);
        //document.addEventListener('online', this.onDeviceOnline, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent();
    },
    onDeviceLoad: function() {
        console.log('onDeviceLoad');
    },

    onDeviceOffline: function() {
        console.log('onDeviceOffline');
    },

    onDeviceOnline: function() {
        console.log('onDeviceOnline');
    },
    // Update DOM on a Received Event
    receivedEvent: function() {

        //set brightness
        window.brightness = cordova.require("cordova.plugin.Brightness.Brightness");
        var appBrightnessValueInit = parseFloat($('#brightness').val()) / 100;
        appBrightness.set( appBrightnessValueInit );

        //load all necessarry contents
        ContentsController.init();
        Menus_Content.init();
        AppGallery.init();
        AppMainJs.init();

    }
};

app.initialize();