/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./cc-monaco-editor-view.html', './cc-monaco-editor-viewModel', 'text!./component.json', 'css!./cc-monaco-editor-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('cc-monaco-editor', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);