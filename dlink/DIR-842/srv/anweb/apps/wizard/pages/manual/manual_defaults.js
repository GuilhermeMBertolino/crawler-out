"use strict";!function(){var vendorId,hostname,app=angular.module("wizard");vendorId="",hostname="";var manualDefaults={$InternetStep:{VendorID:vendorId,Hostname:hostname,Ping:!1}};manualDefaults.$InternetStep,manualDefaults.$InternetStep.DialNumber="*99#",manualDefaults.$InternetStep.ModemIfaceType=!1,app.constant("manualDefaults",manualDefaults)}();