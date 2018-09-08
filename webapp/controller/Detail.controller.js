sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(Controller, History,Toast) {
	"use strict";

	return Controller.extend("tesoroCart.controller.Detail", {
		
			onInit:function()
			{
				
				
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				 oRouter.attachRoutePatternMatched(this._onObjectMatched, this);
			},
			_onObjectMatched:function(evt)
			{
				this.getView().bindElement({
        		  path: "/products/" + evt.getParameter("arguments").ProductId
        		});	
			 // this.getView().setModel(this.oModel);
			  var oFeedModel=this.getView().getModel("Feed"),
			 ofeedList=this.getView().byId('feedList').setModel(oFeedModel);
			},

			onNavBack: function() {
				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("Home", {}, true);
				}
			},
			selectQuantity: function(oEvent) {
				//Open Fragment to add quantity
				var oView = this.getView();
				var oDialog = oView.byId("addQuantityDialog");
				// create dialog lazily
				if (!oDialog) {
					// create dialog via fragment factory
					oDialog = sap.ui.xmlfragment(oView.getId(), "tesoroCart.view.AddToCart",this);
					oView.addDependent(oDialog);
				}
				oDialog.openBy(oEvent.getSource());
			},
			addToCart:function(oEvent){
				oEvent.getSource().getParent().getParent().close();
				
				//On successful addition to Model
				var quantity = this.getView().byId('idQuantityStepInput').getValue();
				var msg =  quantity + ' units successfully added to cart';
				Toast.show(msg);
			},
			onPost:function(oEvent)
			{
				var sValue = oEvent.getParameter("value");
				var oEntry = {
					Author : "Alexandrina Victoria",
					Type : "Reply",
					Date : "" + "18-Aug-2017",
					Text : sValue
				};
 
			// update model
			var oModel = this.getView().getModel("Feed");
			var aEntries = oModel.getData().EntryCollection;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection : aEntries
			});
				
			}

	});

});