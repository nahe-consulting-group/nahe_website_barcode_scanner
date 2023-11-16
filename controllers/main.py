from odoo import http
from odoo.http import request
import json


class BarcodeProductController(http.Controller):
    @http.route(
        "/barcode_scanner", type="json", auth="public", website=True, csrf=False
    )
    def barcode_scanner(self, **kwargs):
        barcode = kwargs.get("barcode")
        product_info = {"found": False}
        if barcode:
            ProductTemplate = request.env["product.template"]
            product = ProductTemplate.sudo().search(
                [("barcode", "=", barcode)], limit=1
            )

            if product:
                image_url = "/web/image/product.template/%s/image_1920" % product.id
                product_info.update(
                    {
                        "name": product.name,
                        "description": product.description_sale,
                        "price": product.list_price,
                        "image_url": image_url,
                        "found": True,
                    }
                )

        return product_info
