/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./my-customer-form-container-view.html', './my-customer-form-container-viewModel', 'text!./component.json', 'css!./my-customer-form-container-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('my-customer-form-container', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);