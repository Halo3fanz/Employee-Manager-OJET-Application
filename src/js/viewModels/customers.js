/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['accUtils', 'knockout', 'text!../endpoints.json', '../factories/CustomerFactory', 'ojs/ojindexermodeltreedataprovider', 'ojs/ojcollectiontabledatasource', 'my-customer-form-container/loader', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojknockout-model'],
 function(accUtils, ko, endpoints, CustomerFactory, IndexerModelTreeDataProvider) {

    function CustomerViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      self.url = JSON.parse(endpoints).customers;

      self.collection = CustomerFactory.createCustomerCollection();
      self.collection.fetch();

      self.dataSource = oj.KnockoutUtils.map(self.collection, null, true);
      //self.activeLayout = ko.observable('listView');

      // check if the section is available, if not find the next available one
      // eslint-disable-next-line no-undef
      self.handleSectionClick = function (section) {
        // eslint-disable-next-line no-unused-vars, no-undef
        return new Promise(function (resolve, reject) {
          // eslint-disable-next-line no-param-reassign, no-undef
          section = self.findAvailableSection(section);
          if (section != null) {
            document.getElementById('listview').scrollToItem({ key: section });
          }
          resolve(section);
        }.bind(self));
      }.bind(self);
      
      
      self.findAvailableSection = function (section) {
        // eslint-disable-next-line no-use-before-define
        var missing = self.dataProvider().getMissingSections();
        if (missing.indexOf(section) > -1) {
          // eslint-disable-next-line no-use-before-define
          var sections = self.dataProvider().getIndexableSections();
          var index = sections.indexOf(section);
          if (index + 1 < sections.length) {
            // eslint-disable-next-line no-param-reassign
            section = sections[index + 1];
            // eslint-disable-next-line no-undef
            return self.findAvailableSection(section);
          }

          return null;
        }

        return section;
      }.bind(self);

      self.itemOnly = function (context) {
        return context.leaf;
      }

      self.layoutViewRadios = [{ id: 'thumbView', icon: 'oj-fwk-icon-grid oj-fwk-icon' },
      { id: 'listView', icon: 'oj-fwk-icon-list oj-fwk-icon' }
      ];

      self.handleLayoutChange = function (event) {
        var listview = document.getElementById('listview');
        var indexer = document.getElementById('indexer');

        listview.classList.toggle('oj-listview-card-layout');
        var children, i;
        if (listview.classList.contains('oj-listview-card-layout')) {
          // eslint-disable-next-line block-scoped-var
          children = document.getElementById('listviewcontainer').children;
          // eslint-disable-next-line block-scoped-var
          for (i = 0; i < children.length; i++) {
            // eslint-disable-next-line block-scoped-var
            var child = children[i];
            child.classList.add('demo-contacts-container-landscape');
            child.classList.remove('demo-contacts-container-portrait');
          }
        } else {
          children = document.getElementById('listviewcontainer').children;
          // eslint-disable-next-line block-scoped-var
          for (i = 0; i < children.length; i++) {
            // eslint-disable-next-line block-scoped-var
            child = children[i];
            // eslint-disable-next-line block-scoped-var
            child.classList.add('demo-contacts-container-portrait');
            // eslint-disable-next-line block-scoped-var
            child.classList.remove('demo-contacts-container-landscape');
          }
        }

        listview.refresh();
        indexer.refresh();
      };

      self.activeLayout = ko.observable('listView');

      var array = [{id: 1, FIRST_NAME: "JANE", LAST_NAME: "ATLAS"}, {id: 2, FIRST_NAME: "ADAM", LAST_NAME: "MCGYVER"}];
      self.dataProvider = ko.observable(new IndexerModelTreeDataProvider(array, { keyAttributes: 'id', groupingAttribute: 'LAST_NAME', sectionChangeHandler: self.handleSectionClick}));

       /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Customers page loaded.', 'assertive');
        document.title = "Customers";
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
    return CustomerViewModel;
  }
);
