var GAP=GAP||{};GAP.Module=GAP.Module||{},GAP.Module.Lot=GAP.Module.Lot||{},GAP.Module.Lot.Model=GAP.Module.Lot.Model||{},GAP.Module.Lot.Model.LotModel=GAP.Module.Lot.Model.LotModel||{},GAP.Module.Lot.Model.LotSearchResultModel=GAP.Module.Lot.Model.LotModel.extend({initialize:function(){this.constructor.__super__.initialize.apply(this,arguments),this.set({Type:"SearchResult"});this.on("change:WinningBidderId",this.winningStatusLogic,this);this.on("change:BidderId",this.winningStatusLogic,this);this.on("change:LotClosed",this.winningStatusLogic,this);this.on("change:TimerAlert",this.timerHeadingAlertLogic,this);_.bindAll(this,"generateTimer"),this.generateValues()},prepareUpdate:function(n){if(_.isArray(n)&&n.length===1&&typeof(n[0].LotId!=="undefined")&&n[0].LotId===this.get("LotId")){var t=JSON.stringify(n),i={tarditional:!0,data:t,contentType:"application/json"};this.executeUpdate(i)}},parse:function(n){var t,i,u,f,r,o,e;if(_.isArray(n)||(n=[n]),n.length)for(t=0;t<n.length;t++){if(typeof n[t].Model!="undefined"?typeof n[t].Model.LotId!="undefined"&&(i=n[t].Model):typeof n[t].LotId!="undefined"&&(i=n[t]),i){u={},f=this.get("Map");for(r in i){o=!1;for(e in f)r===e&&(u[f[e]]!==i[r]&&(u[f[e]]=i[r]),o=!0);o||u[r]!==i[r]&&(u[r]=i[r])}return u}continue}else return n},saveValues:function(n){if(typeof n!="undefined"&&n.LotId===this.get("LotId"))for(var t in n)this.get("Filter").indexOf(t)===-1&&(typeof this.get("Map")[t]!="undefined"?this.set(this.get("Map")[t],n[t]):this.set(t,n[t]))},winningStatusLogic:function(){var n="Leading",t="Outbid",i="Pending";window.localizer&&window.localizer.Leading&&(n=window.localizer.Leading),window.localizer&&window.localizer.Outbid&&(t=window.localizer.Outbid),window.localizer&&window.localizer.Pending&&(i=window.localizer.Pending),this.get("LotClosed")?(this.set({WinningStatusMessage:""}),this.set({WinningStatusClass:""})):this.get("BidderStatus")==="Pending"?(this.set({WinningStatusMessage:i}),this.set({WinningStatusClass:"pending"})):this.get("WinningBidderId")&&this.get("BidderId")&&this.get("WinningBidderId")===this.get("BidderId")?(this.set({WinningStatusMessage:n}),this.set({WinningStatusClass:"leading"}),this.set({BidderHasBids:!0})):this.get("WinningBidderId")&&this.get("BidderId")&&this.get("BidderHasBids")!==!1?(this.set({WinningStatusMessage:t}),this.set({WinningStatusClass:"outbid"})):(this.set({WinningStatusMessage:""}),this.set({WinningStatusClass:""}))},timerHeadingAlertLogic:function(){this.set({TimerHeadingAlert:this.get("TimerAlert")})},generateValues:function(){this.constructor.__super__.generateValues.apply(this,arguments),this.winningStatusLogic(),this.timerHeadingAlertLogic()},generateTimer:function(n){var i=location.pathname.split("/")[1],r=moment(+new Date+n*1e3),t;this.setTimeRemaining({SecondsRemaining:n}),t="",this.get("TimeRemaining").Days>1?(this.get("TimerHeading")!==portalScriptResources.TimerHeadingBiddingEnds+": "&&this.set({TimerHeading:portalScriptResources.TimerHeadingBiddingEnds+": "}),this.set({Timer:"<strong>"+r.locale(i).format(this.get("TimerFormat"))+"</strong>"})):(this.get("TimeRemaining").Days>0?(this.get("TimerHeading")!==portalScriptResources.TimerHeadingEndsIn&&this.set({TimerHeading:portalScriptResources.TimerHeadingEndsIn}),t+=this.get("TimeRemaining").Days+portalScriptResources.d+" "+(this.get("TimeRemaining").Hours-this.get("TimeRemaining").Days*24)+portalScriptResources.h):(this.get("TimerHeading")!==portalScriptResources.TimerHeadingEndsIn&&this.set({TimerHeading:portalScriptResources.TimerHeadingEndsIn}),t+=this.displayCountdown()),this.get("TimeRemaining").Seconds===300&&this.dataReload(),this.get("TimeRemaining").Minutes<10&&!this.get("TimerAlert")&&this.set({TimerAlert:!0}),t&&(t="<strong>"+t+"</strong>"),this.set({Timer:t}))},biddingOpens:function(){if(this.get("StartDate")){var n=this.get("StartDate");this.get("StartDateOffset")&&(n+=this.get("StartDateOffset")),this.set({TimerHeading:portalScriptResources.TimerHeadingBiddingOpens+" "}),this.set({Timer:"<strong>"+moment.unix(n/1e3).format(this.get("TimerFormat"))+"</strong>"})}},dataReload:function(){var n=[];this.set({Log:!0}),n.push({LotId:this.get("LotId"),BidderHasBids:this.get("BidderHasBids")}),Backbone.Events.trigger("GAP.SingleLot.Update",n)}}),GAP=GAP||{},GAP.Module=GAP.Module||{},GAP.Module.Lot=GAP.Module.Lot||{},GAP.Module.Lot.View=GAP.Module.Lot.View||{},GAP.Module.Lot.View.WinningStatus=GAP.Module.Lot.View.LotView.extend({initialize:function(){this.constructor.__super__.initialize.apply(this,arguments);this.model.on("change:WinningStatusClass",this.changeClass,this);this.model.on("change:LeadingBid",this.changeClass,this);this.changeClass()},changeClass:function(){var n=this.model.get("WinningStatusClass"),i="bid-status label-"+(n?n:"none"),r,t,u,f;n&&(r=$("#featuredLabel-"+this.model.get("LotId")),r.hide()),t=$("#reserveNotMetLabel-"+this.model.get("LotId")),this.model.get("HasReserve")&&(u=this.model.get("LeadingBid")<this.model.get("Reserve"),f=n==="leading",t&&(u&&f?(t.show(),i+=" leading-reserve-not-met"):t.hide())),this.el.className=i}}),GAP=GAP||{},GAP.Module=GAP.Module||{},GAP.Module.SearchResults=GAP.Module.SearchResults||{},GAP.Module.SearchResults.Registration=GAP.Module.SearchResults.Registration||{},GAP.Module.SearchResults.Registration=Backbone.View.extend({defaults:{RegistrationStatuses:{Pending:0,Approved:1,Declined:2},StatusClasses:{Pending:"bidder-pending",Approved:"bidder-approved",Declined:"bidder-declined"}},initialize:function(){this.constructor.__super__.initialize.apply(this,arguments),this.options=_.extend({},this.defaults,this.options);Backbone.Events.on("Gap.Lot.BidderRegistrationStatus.Update",this.bidderRegistrationStatusUpdated,this)},bidderRegistrationStatusUpdated:function(n){if(typeof n!="undefined"&&typeof n.RegistrationStatus!="undefined"){var t=$("#cataloguePages"),i=t.data("bidderId");if(i===""||i!==n.BidderId)return;switch(n.RegistrationStatus){case this.options.RegistrationStatuses.Declined:t.removeClass(this.options.StatusClasses.Pending),t.removeClass(this.options.StatusClasses.Approved),t.addClass(this.options.StatusClasses.Declined);break;case this.options.RegistrationStatuses.Pending:case this.options.RegistrationStatuses.Approved:t.removeClass(this.options.StatusClasses.Pending),t.removeClass(this.options.StatusClasses.Declined),t.addClass(this.options.StatusClasses.Approved)}}}})