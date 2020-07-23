import frappe


def boot_session(bootinfo):
	bootinfo.user.background_image = "/assets/bloomstack_core/images/desk.png"
	bootinfo.compliance_enabled = frappe.db.get_single_value("Compliance Settings", "is_compliance_enabled")

	if frappe.conf.staging_server:
		bootinfo.staging_server = True