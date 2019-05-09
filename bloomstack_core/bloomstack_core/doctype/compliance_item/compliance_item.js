// Copyright (c) 2019, Bloomstack, Inc and contributors
// For license information, please see license.txt

frappe.ui.form.on('Compliance Item', {
	onload: (frm) => {
		frm.set_query("metrc_item_category", () => {
			if (frm.doc.metrc_uom) {
				return {
					query: "bloomstack_core.bloomstack_core.doctype.compliance_item.compliance_item.metrc_item_category_query",
					filters: {
						metrc_uom: frm.doc.metrc_uom
					}
				}
			}
		});

		frm.set_query("metrc_uom", () => {
			if (frm.doc.metrc_item_category) {
				return {
					query: "bloomstack_core.bloomstack_core.doctype.compliance_item.compliance_item.metrc_uom_query",
					filters: {
						metrc_item_category: frm.doc.metrc_item_category
					}
				}
			}
		});

		frm.set_query("metrc_unit_uom", () => {
			if (frm.doc.metrc_item_category) {
				return {
					query: "bloomstack_core.bloomstack_core.doctype.compliance_item.compliance_item.metrc_unit_uom_query",
					filters: {
						metrc_item_category: frm.doc.metrc_item_category
					}
				}
			}
		});
	},

	refresh: (frm) => {
		frm.trigger("toggle_metrc_fields_display");
	},

	metrc_uom: (frm) => {
		frm.trigger("toggle_metrc_fields_display");
	},

	toggle_metrc_fields_display: (frm) => {
		if (frm.doc.metrc_uom) {
			frappe.db.get_value("Compliance UOM", { "name": frm.doc.metrc_uom }, "quantity_type", (r) => {
				if (!r.exc) {
					frm.toggle_display("metrc_unit_value", r.quantity_type == "CountBased");
					frm.toggle_display("metrc_unit_uom", r.quantity_type == "CountBased");
				}
			});
		}
	},
});