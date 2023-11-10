/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "ypf/tkcargatrenescarbon/model/models",
        "ypf/tkcargatrenescarbon/utils/FioriComponentHelper"
    ],
    function (UIComponent, Device, models, FioriComponent) {
        "use strict";

        return UIComponent.extend("ypf.tkcargatrenescarbon.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
            createContent: function () {
                //sets component
                FioriComponent.setComponent(this);
                // create root view
                var view = sap.ui.view({
                    id: this.createId("App"),
                    viewName: "ypf.tkcargatrenescarbon.view.App",
                    type: "XML",
                    viewData: {
                        component: this
                    }
                });
    
                return view;

            }
        });
    });