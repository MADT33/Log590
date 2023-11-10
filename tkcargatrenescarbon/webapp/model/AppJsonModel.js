sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "ypf/tkcargatrenescarbon/utils/FioriComponentHelper"
], function (JSONModel, FioriComponent) {
    "use strict";

    return {
        getModel: function () {
            //gets component
            let component = FioriComponent.getComponent();
            //gets model
            let jsonModel = component.byId("App").getModel("AppJsonModel");
            //checks if the model exists
            if (!jsonModel) {
                jsonModel = new JSONModel();
                component.byId("App").setModel(jsonModel, "AppJsonModel");
            }
            return jsonModel;
        },

        initializeModel: function () {
            let jsonModel = this.getModel();
            jsonModel.setData({
                Log: []
            });
            return jsonModel;
        },

        setProperty: function (sPropery, value) {
            let jsonModel = this.getModel();
            jsonModel.setProperty(sPropery, value);
            jsonModel.updateBindings(true);
        },

        getProperty: function (sPropery) {
            let jsonModel = this.getModel();
            return jsonModel.getProperty(sPropery);
        },

        updateModel: function () {
            let jsonModel = this.getModel();
            jsonModel.updateBindings(true);
        }

    };
});