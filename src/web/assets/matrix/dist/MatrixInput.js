!function(t){Craft.MatrixInput=Garnish.Base.extend({id:null,blockTypes:null,blockTypesByHandle:null,inputNamePrefix:null,inputIdPrefix:null,showingAddBlockMenu:!1,addBlockBtnGroupWidth:null,addBlockBtnContainerWidth:null,$container:null,$blockContainer:null,$addBlockBtnContainer:null,$addBlockBtnGroup:null,$addBlockBtnGroupBtns:null,$statusMessage:null,blockSort:null,blockSelect:null,totalNewBlocks:0,init:function(a,i,n,o){var s,l=this;for(this.id=a,this.blockTypes=i,this.inputNamePrefix=n,this.inputIdPrefix=Craft.formatInputId(this.inputNamePrefix),"number"==typeof o&&(o={maxBlocks:o}),this.setSettings(o,Craft.MatrixInput.defaults),this.$container=t("#"+this.id),this.$blockContainer=this.$container.children(".blocks"),this.$addBlockBtnContainer=this.$container.children(".buttons"),this.$addBlockBtnGroup=this.$addBlockBtnContainer.children(".btngroup"),this.$addBlockBtnGroupBtns=this.$addBlockBtnGroup.children(".btn"),this.$addBlockMenuBtn=this.$addBlockBtnContainer.children(".menubtn"),this.$statusMessage=this.$container.find("[data-status-message]"),this.$container.data("matrix",this),this.setNewBlockBtn(),this.blockTypesByHandle={},s=0;s<this.blockTypes.length;s++){var c=this.blockTypes[s];this.blockTypesByHandle[c.handle]=c}var d=this.$blockContainer.children(),r=Craft.MatrixInput.getCollapsedBlockIds();for(this.blockSort=new Garnish.DragSort(d,{handle:"> .actions > .move",axis:"y",filter:function(){return l.blockSort.$targetItem.hasClass("sel")?l.blockSelect.getSelectedItems():l.blockSort.$targetItem},collapseDraggees:!0,magnetStrength:4,helperLagBase:1.5,helperOpacity:.9,onDragStop:function(){l.trigger("blockSortDragStop")},onSortChange:function(){l.blockSelect.resetItemOrder()}}),this.blockSelect=new Garnish.Select(this.$blockContainer,d,{multi:!0,vertical:!0,handle:"> .checkbox, > .titlebar",checkboxMode:!0}),s=0;s<d.length;s++){var h=t(d[s]),p=h.data("id"),u="string"==typeof p&&p.match(/new(\d+)/);u&&u[1]>this.totalNewBlocks&&(this.totalNewBlocks=parseInt(u[1]));var f=new e(this,h);f.id&&-1!==t.inArray(""+f.id,r)&&f.collapse()}this.addListener(this.$addBlockBtnGroupBtns,"click",(function(e){var a=t(e.target).data("type");this.addBlock(a)})),this.$addBlockMenuBtn.length>0&&(this.$addBlockMenuBtn.menubtn(),this.$addBlockMenuBtn.data("menubtn").on("optionSelect",(function(e){l.addBlock(t(e.option).data("type"))}))),this.updateAddBlockBtn(),this.addListener(this.$container,"resize","setNewBlockBtn"),Garnish.$doc.ready(this.setNewBlockBtn.bind(this)),this.trigger("afterInit")},setNewBlockBtn:function(){var t=this;(this.addBlockBtnGroupWidth||(this.addBlockBtnGroupWidth=this.$addBlockBtnGroup.width(),this.addBlockBtnGroupWidth))&&this.addBlockBtnContainerWidth!==(this.addBlockBtnContainerWidth=this.$addBlockBtnContainer.width())&&(this.addBlockBtnGroupWidth>this.addBlockBtnContainerWidth?this.showingAddBlockMenu||(this.$addBlockBtnGroup.addClass("hidden"),this.$addBlockMenuBtn.removeClass("hidden"),this.showingAddBlockMenu=!0):this.showingAddBlockMenu&&(this.$addBlockMenuBtn.addClass("hidden"),this.$addBlockBtnGroup.removeClass("hidden"),this.showingAddBlockMenu=!1,-1!==navigator.userAgent.indexOf("Safari")&&Garnish.requestAnimationFrame((function(){t.$addBlockBtnGroup.css("opacity",.99),Garnish.requestAnimationFrame((function(){t.$addBlockBtnGroup.css("opacity","")}))}))))},canAddMoreBlocks:function(){return!this.maxBlocks||this.$blockContainer.children().length<this.maxBlocks},updateAddBlockBtn:function(){var e,a;if(this.canAddMoreBlocks())for(this.$addBlockBtnGroup.removeClass("disabled"),this.$addBlockMenuBtn.removeClass("disabled"),this.$addBlockBtnGroupBtns.each((function(){t(this).removeAttr("aria-disabled")})),e=0;e<this.blockSelect.$items.length;e++)(a=this.blockSelect.$items.eq(e).data("block"))&&(a.$actionMenu.find("a[data-action=add]").parent().removeClass("disabled"),a.$actionMenu.find("a[data-action=add]").removeAttr("aria-disabled"));else for(this.$addBlockBtnGroup.addClass("disabled"),this.$addBlockMenuBtn.addClass("disabled"),this.$addBlockBtnGroupBtns.each((function(){t(this).attr("aria-disabled","true")})),e=0;e<this.blockSelect.$items.length;e++)(a=this.blockSelect.$items.eq(e).data("block"))&&(a.$actionMenu.find("a[data-action=add]").parent().addClass("disabled"),a.$actionMenu.find("a[data-action=add]").attr("aria-disabled","true"))},updateStatusMessage:function(){var t,e=this;this.$statusMessage.empty(),this.canAddMoreBlocks()||(t=Craft.t("app","Matrix block could not be added. Maximum number of blocks reached.")),setTimeout((function(){e.$statusMessage.text(t)}),250)},addBlock:function(a,i,n){var o=this;if(this.canAddMoreBlocks()){this.totalNewBlocks++;var s="new"+this.totalNewBlocks,l="matrixblock-action-menu-".concat(s),c='\n                <div class="matrixblock" data-id="'.concat(s,'" data-type="').concat(a,'">\n                  <input type="hidden" name="').concat(this.inputNamePrefix,'[sortOrder][]" value="').concat(s,'"/>\n                  <input type="hidden" name="').concat(this.inputNamePrefix,"[blocks][").concat(s,'][type]" value="').concat(a,'"/>\n                  <input type="hidden" name="').concat(this.inputNamePrefix,"[blocks][").concat(s,'][enabled]" value="1"/>\n                  <div class="titlebar">\n                    <div class="blocktype">').concat(this.getBlockTypeByHandle(a).name,'</div>\n                    <div class="preview"></div>\n                  </div>\n                  <div class="checkbox" title="').concat(Craft.t("app","Select"),'"></div>\n                  <div class="actions">\n                    <div class="status off" title="').concat(Craft.t("app","Disabled"),'"></div>\n                    <div>\n                      <button type="button" class="btn settings icon menubtn" title="').concat(Craft.t("app","Actions"),'" aria-controls="').concat(l,'" data-disclosure-trigger></button>\n                        <div id="').concat(l,'" class="menu menu--disclosure">\n                         <ul class="padded">\n                            <li><a data-icon="collapse" data-action="collapse" href="#" aria-label="').concat(Craft.t("app","Collapse"),'" type="button" role="button">').concat(Craft.t("app","Collapse"),'</a></li>\n                            <li class="hidden"><a data-icon="expand" data-action="expand" href="#" aria-label="').concat(Craft.t("app","Expand"),'" type="button" role="button">').concat(Craft.t("app","Expand"),'</a></li>\n                            <li><a data-icon="disabled" data-action="disable" href="#" aria-label="').concat(Craft.t("app","Disable"),'" type="button" role="button">').concat(Craft.t("app","Disable"),'</a></li>\n                            <li class="hidden"><a data-icon="enabled" data-action="enable" href="#" aria-label="').concat(Craft.t("app","Enable"),'" type="button" role="button">').concat(Craft.t("app","Enable"),'</a></li>\n                            <li><a data-icon="uarr" data-action="moveUp" href="#" aria-label="').concat(Craft.t("app","Move up"),'" type="button" role="button">').concat(Craft.t("app","Move up"),'</a></li>\n                            <li><a data-icon="darr" data-action="moveDown" href="#" aria-label="').concat(Craft.t("app","Move down"),'" type="button" role="button">').concat(Craft.t("app","Move down"),"</a></li>\n                          </ul>");if(!this.settings.staticBlocks){c+='\n                          <hr class="padded"/>\n                          <ul class="padded">\n                            <li><a class="error" data-icon="remove" data-action="delete" href="#" aria-label="'.concat(Craft.t("app","Delete"),'" type="button" role="button">').concat(Craft.t("app","Delete"),'</a></li>\n                          </ul>\n                          <hr class="padded"/>\n                          <ul class="padded">');for(var d=0;d<this.blockTypes.length;d++){var r=this.blockTypes[d];c+='\n                            <li><a data-icon="plus" data-action="add" data-type="'.concat(r.handle,'" href="#" aria-label="').concat(Craft.t("app","Add {type} above",{type:r.name}),'" type="button" role="button">').concat(Craft.t("app","Add {type} above",{type:r.name}),"</a></li>")}c+="\n                          </ul>"}c+='\n                        </div>\n                      </div>\n                    <a class="move icon" title="'.concat(Craft.t("app","Reorder"),'" role="button"></a>\n                  </div>\n                </div>');var h=t(c);window.draftEditor&&window.draftEditor.pause(),i?h.insertBefore(i):h.appendTo(this.$blockContainer);var p=t('<div class="fields"/>').appendTo(h),u=this.getParsedBlockHtml(this.blockTypesByHandle[a].bodyHtml,s),f=this.getParsedBlockHtml(this.blockTypesByHandle[a].footHtml,s);t(u).appendTo(p),this.trigger("blockAdded",{$block:h}),h.css(this.getHiddenBlockCss(h)).velocity({opacity:1,"margin-bottom":10},"fast",(function(){h.css("margin-bottom",""),Garnish.$bod.append(f),Craft.initUiElements(p),new e(o,h),o.blockSort.addItems(h),o.blockSelect.addItems(h),o.updateAddBlockBtn(),Garnish.requestAnimationFrame((function(){(void 0===n||n)&&(Garnish.scrollContainerToElement(h),h.find(".text,[contenteditable]").first().trigger("focus")),window.draftEditor&&window.draftEditor.resume()}))}))}else this.updateStatusMessage()},getBlockTypeByHandle:function(t){for(var e=0;e<this.blockTypes.length;e++)if(this.blockTypes[e].handle===t)return this.blockTypes[e]},collapseSelectedBlocks:function(){this.callOnSelectedBlocks("collapse")},expandSelectedBlocks:function(){this.callOnSelectedBlocks("expand")},disableSelectedBlocks:function(){this.callOnSelectedBlocks("disable")},enableSelectedBlocks:function(){this.callOnSelectedBlocks("enable")},deleteSelectedBlocks:function(){this.callOnSelectedBlocks("selfDestruct")},callOnSelectedBlocks:function(t){for(var e=0;e<this.blockSelect.$selectedItems.length;e++)this.blockSelect.$selectedItems.eq(e).data("block")[t]()},getHiddenBlockCss:function(t){return{opacity:0,marginBottom:-t.outerHeight()}},getParsedBlockHtml:function(t,e){return"string"==typeof t?t.replace(new RegExp("__BLOCK_".concat(this.settings.placeholderKey,"__"),"g"),e):""},get maxBlocks(){return this.settings.maxBlocks}},{defaults:{placeholderKey:null,maxBlocks:null,staticBlocks:!1},collapsedBlockStorageKey:"Craft-"+Craft.systemUid+".MatrixInput.collapsedBlocks",getCollapsedBlockIds:function(){return"string"==typeof localStorage[Craft.MatrixInput.collapsedBlockStorageKey]?Craft.filterArray(localStorage[Craft.MatrixInput.collapsedBlockStorageKey].split(",")):[]},setCollapsedBlockIds:function(t){localStorage[Craft.MatrixInput.collapsedBlockStorageKey]=t.join(",")},rememberCollapsedBlockId:function(e){if("undefined"!=typeof Storage){var a=Craft.MatrixInput.getCollapsedBlockIds();-1===t.inArray(""+e,a)&&(a.push(e),Craft.MatrixInput.setCollapsedBlockIds(a))}},forgetCollapsedBlockId:function(e){if("undefined"!=typeof Storage){var a=Craft.MatrixInput.getCollapsedBlockIds(),i=t.inArray(""+e,a);-1!==i&&(a.splice(i,1),Craft.MatrixInput.setCollapsedBlockIds(a))}}});var e=Garnish.Base.extend({matrix:null,$container:null,$titlebar:null,$fieldsContainer:null,$previewContainer:null,$actionMenu:null,$collapsedInput:null,actionDisclosure:null,isNew:null,id:null,collapsed:!1,init:function(t,e){var a=this;this.matrix=t,this.$container=e,this.$titlebar=e.children(".titlebar"),this.$previewContainer=this.$titlebar.children(".preview"),this.$fieldsContainer=e.children(".fields"),this.$container.data("block",this),this.id=this.$container.data("id"),this.isNew=!this.id||"string"==typeof this.id&&"new"===this.id.substr(0,3);var i=this.$container.find("> .actions [data-disclosure-trigger]"),n=i.data("trigger")||new Garnish.DisclosureMenu(i);this.$actionMenu=n.$container,this.actionDisclosure=n,n.on("show",(function(){a.$container.addClass("active"),a.$container.prev(".matrixblock").length?a.$actionMenu.find("a[data-action=moveUp]:first").parent().removeClass("hidden"):a.$actionMenu.find("a[data-action=moveUp]:first").parent().addClass("hidden"),a.$container.next(".matrixblock").length?a.$actionMenu.find("a[data-action=moveDown]:first").parent().removeClass("hidden"):a.$actionMenu.find("a[data-action=moveDown]:first").parent().addClass("hidden")})),n.on("hide",(function(){a.$container.removeClass("active")})),this.$actionMenuOptions=this.$actionMenu.find("a[data-action]"),this.addListener(this.$actionMenuOptions,"click",this.handleActionClick),this.addListener(this.$actionMenuOptions,"keydown",this.handleActionKeydown),Garnish.hasAttr(this.$container,"data-collapsed")&&this.collapse(),this._handleTitleBarClick=function(t){t.preventDefault(),this.toggle()},this.addListener(this.$titlebar,"doubletap",this._handleTitleBarClick)},toggle:function(){this.collapsed?this.expand():this.collapse(!0)},collapse:function(e){var a=this;if(!this.collapsed){this.$container.addClass("collapsed");for(var i="",n=this.$fieldsContainer.children().children(),o=0;o<n.length;o++){for(var s=t(n[o]).children(".input").find('select,input[type!="hidden"],textarea,.label'),l="",c=0;c<s.length;c++){var d,r=t(s[c]);if(r.hasClass("label")){var h=r.parent().parent();if(h.hasClass("lightswitch")&&(h.hasClass("on")&&r.hasClass("off")||!h.hasClass("on")&&r.hasClass("on")))continue;d=r.text()}else d=Craft.getText(this._inputPreviewText(r));d instanceof Array&&(d=d.join(", ")),d&&(d=Craft.trim(Craft.escapeHtml(d)))&&(l&&(l+=", "),l+=d)}l&&(i+=(i?" <span>|</span> ":"")+l)}this.$previewContainer.html(i),this.$fieldsContainer.velocity("stop"),this.$container.velocity("stop"),e?(this.$fieldsContainer.velocity("fadeOut",{duration:"fast"}),this.$container.velocity({height:16},"fast")):(this.$previewContainer.show(),this.$fieldsContainer.hide(),this.$container.css({height:16})),setTimeout((function(){a.$actionMenu.find("a[data-action=collapse]:first").parent().addClass("hidden"),a.$actionMenu.find("a[data-action=expand]:first").parent().removeClass("hidden")}),200),this.isNew?this.$collapsedInput?this.$collapsedInput.val("1"):this.$collapsedInput=t('<input type="hidden" name="'+this.matrix.inputNamePrefix+"[blocks]["+this.id+'][collapsed]" value="1"/>').appendTo(this.$container):Craft.MatrixInput.rememberCollapsedBlockId(this.id),this.collapsed=!0}},_inputPreviewText:function(e){if(e.is("select,multiselect")){for(var a=[],i=e.find("option:selected"),n=0;n<i.length;n++)a.push(i.eq(n).text());return a}if(e.is('input[type="checkbox"]:checked,input[type="radio"]:checked')){var o=e.attr("id"),s=t('label[for="'.concat(o,'"]'));if(s.length)return s.text()}return Garnish.getInputPostVal(e)},expand:function(){var e=this;if(this.collapsed){this.$container.removeClass("collapsed"),this.$fieldsContainer.velocity("stop"),this.$container.velocity("stop");var a=this.$container.height();this.$container.height("auto"),this.$fieldsContainer.show();var i=this.$container.height(),n=this.$fieldsContainer.css("display")||"block";if(this.$container.height(a),this.$fieldsContainer.hide().velocity("fadeIn",{duration:"fast",display:n}),this.$container.velocity({height:i},"fast",(function(){e.$previewContainer.html(""),e.$container.height("auto"),e.$container.trigger("scroll")})),setTimeout((function(){e.$actionMenu.find("a[data-action=collapse]:first").parent().removeClass("hidden"),e.$actionMenu.find("a[data-action=expand]:first").parent().addClass("hidden")}),200),!this.isNew&&"undefined"!=typeof Storage){var o=Craft.MatrixInput.getCollapsedBlockIds(),s=t.inArray(""+this.id,o);-1!==s&&(o.splice(s,1),Craft.MatrixInput.setCollapsedBlockIds(o))}this.isNew?this.$collapsedInput&&this.$collapsedInput.val(""):Craft.MatrixInput.forgetCollapsedBlockId(this.id),this.collapsed=!1}},disable:function(){var t=this;this.$container.children('input[name$="[enabled]"]:first').val(""),this.$container.addClass("disabled"),setTimeout((function(){t.$actionMenu.find("a[data-action=disable]:first").parent().addClass("hidden"),t.$actionMenu.find("a[data-action=enable]:first").parent().removeClass("hidden")}),200),this.collapse(!0)},enable:function(){var t=this;this.$container.children('input[name$="[enabled]"]:first').val("1"),this.$container.removeClass("disabled"),setTimeout((function(){t.$actionMenu.find("a[data-action=disable]:first").parent().removeClass("hidden"),t.$actionMenu.find("a[data-action=enable]:first").parent().addClass("hidden")}),200)},moveUp:function(){this.matrix.trigger("beforeMoveBlockUp",{block:this});var t=this.$container.prev(".matrixblock");t.length&&(this.$container.insertBefore(t),this.matrix.blockSelect.resetItemOrder()),this.matrix.trigger("moveBlockUp",{block:this})},moveDown:function(){this.matrix.trigger("beforeMoveBlockDown",{block:this});var t=this.$container.next(".matrixblock");t.length&&(this.$container.insertAfter(t),this.matrix.blockSelect.resetItemOrder()),this.matrix.trigger("moveBlockDown",{block:this})},handleActionClick:function(t){t.preventDefault(),this.onActionSelect(t.target)},handleActionKeydown:function(t){t.keyCode===Garnish.SPACE_KEY&&(t.preventDefault(),this.onActionSelect(t.target))},onActionSelect:function(e){var a=this.matrix.blockSelect.totalSelected>1&&this.matrix.blockSelect.isSelected(this.$container),i=t(e);switch(i.data("action")){case"collapse":a?this.matrix.collapseSelectedBlocks():this.collapse(!0);break;case"expand":a?this.matrix.expandSelectedBlocks():this.expand();break;case"disable":a?this.matrix.disableSelectedBlocks():this.disable();break;case"enable":a?this.matrix.enableSelectedBlocks():(this.enable(),this.expand());break;case"moveUp":this.moveUp();break;case"moveDown":this.moveDown();break;case"add":var n=i.data("type");this.matrix.addBlock(n,this.$container);break;case"delete":a?confirm(Craft.t("app","Are you sure you want to delete the selected blocks?"))&&this.matrix.deleteSelectedBlocks():this.selfDestruct()}this.actionDisclosure.hide()},selfDestruct:function(){var e=this;t("[name]",this.$container).removeAttr("name"),this.$container.velocity(this.matrix.getHiddenBlockCss(this.$container),"fast",(function(){e.$container.remove(),e.matrix.updateAddBlockBtn(),e.matrix.trigger("blockDeleted",{$block:e.$container})}))}})}(jQuery);
//# sourceMappingURL=MatrixInput.js.map