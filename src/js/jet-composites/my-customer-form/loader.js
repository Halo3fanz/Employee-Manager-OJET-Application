/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./my-customer-form-view.html', './my-customer-form-viewModel', 'text!./component.json', 'css!./my-customer-form-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('my-customer-form', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);