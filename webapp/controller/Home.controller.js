sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("tesoroCart.controller.Home", {
		navToDetails: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Detail", {
				ProductId: oEvent.getSource().getBindingContext().getProperty('PRODUCTID') - 1
			});
		},
		
		navToCart: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Cart");
		}
		
	});
});