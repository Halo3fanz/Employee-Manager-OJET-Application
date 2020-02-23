/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['accUtils', 'knockout', '../factories/EmployeeFactory', 'my-employee-form-container/loader', 'ojs/ojknockout-model'],
 function(accUtils, ko, EmployeeFactory) {

    function IncidentsViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      self.collection = EmployeeFactory.createEmployeeCollection();
      self.collection.fetch();

      self.filter = ko.observableArray('');

      self.filterChanged = function (event) {
        var filter = event.target.rawValue;
        var filteredCollection = self.collection;
        if (self.originalCollection == undefined && filter !== undefined) {
            self.originalCollection = filteredCollection.clone();
        }
        var ret = 
            self.originalCollection !== undefined ? 
            self.originalCollection.where({FIRST_NAME: {value: filter, comparator: self.nameFilter}}) : [];
        if (ret.length == 0) {
            while (!filteredCollection.isEmpty()) {
                filteredCollection.pop();
            }
        } else {
            filteredCollection.reset(ret);
            self.datasource(oj.KnockoutUtils.map(self.collection, null, true)());
        }
      };

      self.nameFilter = function (model, attr, value) {
        var deptName = model.get("FIRST_NAME");
        return (deptName.toLowerCase().indexOf(value.toLowerCase()) > -1);
      };

      self.datasource = oj.KnockoutUtils.map(self.collection, null, true);
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return IncidentsViewModel;
  }
);
