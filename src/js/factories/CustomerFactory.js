define(['ojs/ojcore', 'text!../endpoints.json'], function (oj, endpoints) {
    var CustomerFactory = {
        resourceUrl: JSON.parse(endpoints).customers,
        // Create a single customer instance:
        createCustomerModel: function () {
            var Customer = oj.Model.extend({
                urlRoot: this.resourceUrl, 
                idAttribute: "id"
            });
            return new Customer();
        },
        // Create a customer collection:
        createCustomerCollection: function () {
            var Customers = oj.Collection.extend({
                url: this.resourceUrl, 
                model: this.createCustomerModel()
            });
            return new Customers();
        }
    };
    return CustomerFactory;
});