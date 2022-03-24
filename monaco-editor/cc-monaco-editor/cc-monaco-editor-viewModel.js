/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/cc-monaco-editor-strings', 'ojs/ojcontext', 'ojs/ojknockout', 'vs/editor/editor.main'], function (ko, componentStrings, Context) {
    
    function CCMonacoEditorComponentModel(context) {
        var self = this;
        
        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.properties = context.properties;
        self.res = componentStrings['cc-monaco-editor'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }
		//Added by Satish
		self.uniqueId = context.uniqueId;
		
        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
	
	CCMonacoEditorComponentModel.prototype._extractValue = function () {
      var self = this;
	  let val =  self.editor.getValue();
	  self.properties.editorValue = val;
      return val;
     };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //CCMonacoEditorComponentModel.prototype.activated = function(context){
    //};

    //CCMonacoEditorComponentModel.prototype.connected = function(context){
    //};

    CCMonacoEditorComponentModel.prototype.bindingsApplied = function(context){
		var self = this; 
		var eleId = 'container'+ self.uniqueId;
		self.editor = monaco.editor.create(document.getElementById('container' + self.uniqueId), {
		  value: self.properties.editorInitialValue,
		  language: self.properties.editorLanguage,
		  theme: self.properties.editorTheme,
		});
		
		//Assign Initial Value to value
		self.properties.editorValue = self.properties.editorInitialValue;
		
		//Listen to value change and update the property editorValue
		self.editor.onDidChangeModelContent(function (e) {
			self._extractValue();
		});
    };

    //CCMonacoEditorComponentModel.prototype.disconnected = function(context){
    //};

    //CCMonacoEditorComponentModel.prototype.propertyChanged = function(context){
    //};

    return CCMonacoEditorComponentModel;
});
