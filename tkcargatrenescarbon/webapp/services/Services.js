sap.ui.define([], function() {
	"use strict";
	return {
		_oModel: null,
		getOdataModel: function() {
			if (this._oModel) {
				return this._oModel;
			}
			const sPath = "/sap/opu/odata/sap/ZGW_CARGA_TK_TRENESC_SRV";
			//builds model
			this._oModel = new sap.ui.model.odata.ODataModel(sPath, {
				json: true,
				headers: {
					"DataServiceVersion": "2.0",
					"Cache-Control": "no-cache, no-store",
					"Pragma": "no-cache"
				},
				useBatch: false
			});
			return this._oModel;
		},

		callGetService: function(sEntity, aFilter = []) {
			return new Promise((res, rej) => {
				this.getOdataModel().read(sEntity, {
					filters: aFilter,
					success: res,
					error: rej
				});
			});
		},

		callPostService: function(sEntity, oPayload) {
			return new Promise((res, rej) => {
				this.getOdataModel().create(sEntity, oPayload, {
					success: res,
					error: rej
				});
			});
		},

		callDeleteService: function(sEntity) {
			return new Promise((res, rej) => {
				this.getOdataModel().remove(sEntity, {
					success: res,
					error: rej
				});
			});
		},

		postData: function(oPayload) {
			return this.callPostService("/HeaderSet", oPayload);
        },
        
        getData: function() {
			return this.callGetService("/CMVSet");
		}

	};
});