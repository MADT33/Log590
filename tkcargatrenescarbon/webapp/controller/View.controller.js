sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ypf/tkcargatrenescarbon/utils/jszip",
    "ypf/tkcargatrenescarbon/utils/xlsx",
    "ypf/tkcargatrenescarbon/services/Services",
    "ypf/tkcargatrenescarbon/model/AppJsonModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, jszip, xlsx, Services, AppJsonModel,MessageBox, MessageToast  ) {
        "use strict";
        var dialog;
        return Controller.extend("ypf.tkcargatrenescarbon.controller.View", {
           
            onInit: function () {

                AppJsonModel.initializeModel()
                var oView = this.getView();               

                dialog = new sap.m.BusyDialog({
                    text: "Enviando Exel..."
                });

            },
            fnReplaceAjusteBS: function (oTable) {

                for (var i in oTable) {

                    var columns = {};                   

                    columns['NumExtFich'] = oTable[i]['NumExtFich']; 
                    columns['NumDocPlanif'] = oTable[i]['Nº doc.planif'];
                    columns['PosClvDocPl'] = oTable[i]['PosClvDocPl'];
                    columns['CantidadNeta'] = oTable[i]['Cantidad Neta'];
                    columns['FechaFinal'] = oTable[i]['Fecha Final'];
                    columns['PatenteVagon'] = oTable[i]['Patente del Vagon'];                    
                    oTable[i] = columns;
                }
                return oTable;
            },
            onEnviar : function(excelArray){
                var oView = this.getView();
                var that = this;
                var oTable = this.getView().byId("idTable");

                Services.postData({
                    Key: "",
                    ToUploadExel: excelArray

                }).then(oData => {

                    console.log(oData);
                    dialog.close();
                    var oModel = oData.ToUploadExel.results;               
                   

                    var Log = AppJsonModel.getProperty("/Log");
                    Log = Log.concat(oModel);
                    AppJsonModel.setProperty("/Log", Log);

                    if(oModel){
                        that.oView.byId("BTN2").setEnabled(true);
                        that.oView.byId("fileUploader").setEnabled(false);
                    }
                    

                    	
                   
                    
                }).catch(oErr => {
                    console.log(oErr)
                }) 

            },

            fileReader: function (oFile) {
                var that = this;
                var excelajusteBS = {};

                var reader = new FileReader();

                reader.onload = function (oEvent) {
                    var data = oEvent.target.result;

                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    workbook.SheetNames.forEach(function (sheetName) {

                        switch (sheetName) {
                            case workbook.SheetNames[0]:
                                excelajusteBS = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                break;
                            default:
                            // code block
                        }
                    });

                    if (excelajusteBS) {
                        var excelArray = that.fnReplaceAjusteBS(excelajusteBS);

                        MessageBox.information("El archivo se cargo correntamente, desea enviarlo?", {
                            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (sAction ) {
                                if (sAction == "OK") {
                                     
                                    dialog.open();
                                    that.onEnviar(excelArray);                                        
  
                                }
                            }
                        });
                         
                    }

                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                };

                reader.readAsBinaryString(oFile);
            },

            onUploadFile: function (oEvent) {
                this.fileReader(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
            }
        });
    });
