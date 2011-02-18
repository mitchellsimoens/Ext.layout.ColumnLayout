Ext.ns("Ext.layout");

Ext.layout.ColumnLayout = Ext.extend(Ext.layout.ContainerLayout, {
	/**
	  * @cfg {String} itemCls
	  * Default CSS class to be added to each item.
	  * Default: 'x-column-item'
	  */
	itemCls: "x-column-item",
	/**
	  * @cfg {String} targetCls
	  * Default CSS class to be added to target el.
	  * Default: 'x-layout-column'
	  */
	targetCls: "x-layout-column",
	/**
	  * @cfg {String} innerCls
	  * Default CSS class to be added to the inner div.
	  * Default: 'x-layout-column-inner'
	  */
	innerCls: "x-layout-column-inner",
	/**
	  * @cfg {String} innerItemsCls
	  * Default CSS class to be added to div that encapsulates the items
	  * Default: 'x-layout-column-inner-items'
	  */
	innerItemsCls: "x-layout-column-inner-items",
	/**
	  * @cfg {Number} columnCount
	  * Number of columns. Browser will render items with this many columns.
	  * Default: undefined
	  */
	columnCount: undefined,
	/**
	  * @cfg {Number/String} columnWidth
	  * Width of columns. If Number, will append 'px'. Browser will render items with this width
	  * and will fit as many columns as it can.
	  * Default: undefined
	  */
	columnWidth: undefined,
	/**
	  * @cfg {Number/String} columnGap
	  * Width of gap between columns. If a number, will append 'px'.
	  * Default: 3px
	  */
	columnGap: "3px",
	/**
	  * @cfg {Object} columnRule
	  * Object containing width, style, and color of the border separating columns.
	  * Defaults: width - 1px, style - solid, color - black.
	  */
	columnRule: {},
	/**
	  * @private
	  */
	type: "column",

	/**
	  * @private
	  */
	onLayout: function() {
		Ext.layout.ColumnLayout.superclass.onLayout.call(this);

		var target = this.target = this.getTarget();

		if (target.hasCls(this.innerCls)) {
			var itemsWrap = target.child("."+this.innerCls+"-items");

			var styleCfg = this.getStyleCfg();

			itemsWrap.setStyle(styleCfg);
		}

		this.prepareItems();
	},

	/**
	  * @private
	  */
	getStyleCfg: function() {
		var columnCount = this.columnCount,
			columnWidth = this.columnWidth,
			columnGap   = (typeof this.columnGap === "number") ? this.columnGap += "px" : this.columnGap,
			columnRule  = this.columnRuleDefaults(this.columnRule),
			columnFill  = this.columnFill,
			items = this.getLayoutItems(),
			ln = items.length,
			item, i;

		var styleCfg = {
			"-webkit-column-gap"   : columnGap,
			"-webkit-column-rule"  : columnRule.width + " " + columnRule.style + " " + columnRule.color,
			width: "100%"
		};

		if (typeof columnCount != "undefined") {
			styleCfg["-webkit-column-count"] = columnCount;
		} else if (typeof columnWidth !== "undefined") {
			columnWidth = (typeof columnWidth === "number") ? columnWidth += "px" : columnWidth;
			styleCfg["-webkit-column-width"] = columnWidth;
		} else {
			return;
		}

		return styleCfg;
	},

	/**
	  * @private
	  */
	columnRuleDefaults: function(columnRule) {
		Ext.applyIf(columnRule, {
			width: "1px",
			style: "solid",
			color: "black"
		});

		columnRule.width = (typeof columnRule.width === "number") ? columnRule.width += "px" : columnRule.width;

		return columnRule
	},

	/**
	  * @private
	  */
	prepareItems: function() {
		var items = this.getLayoutItems(),
			ln = items.length,
			item, i;

		for (i = 0; i < ln; i++) {
			item = items[i];
			item.doComponentLayout();
		}
	},

	/**
	  * @private
	  */
	getTarget : function() {
		var owner = this.owner,
			innerCt = this.innerCt;

		if (!innerCt) {
			if (owner.scrollEl) {
				innerCt = owner.scrollEl.addCls(this.innerCls);
			} else {
				innerCt = owner.getTargetEl().createChild({cls: this.innerCls});
			}
			this.innerCt = innerCt;
		}

		return innerCt;
	},

	/**
	  * @private
	  */
	renderItem: function(item, position, target) {
		if (target.hasCls(this.innerCls)) {
			if (target.child("." + this.innerItemsCls) === null) {
				target.createChild({ cls: this.innerItemsCls });
			}
			target = target.child("." + this.innerItemsCls);
		}

		Ext.layout.ColumnLayout.superclass.renderItem.call(this, item, position, target);
	}
});

Ext.regLayout("column", Ext.layout.ColumnLayout);