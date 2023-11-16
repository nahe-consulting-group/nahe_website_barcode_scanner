{
    "name": "NAHE Website Barcode Scanner",
    "summary": """
        Summary of the module"s purpose""",
    "author": "Nahe Consulting Group",
    "maintainers": ["nahe-consulting-group"],
    "website": "https://nahe.com.ar/",
    "license": "AGPL-3",
    "category": "Website",
    "version": "15.0.1.0.0",
    "development_status": "Production/Stable",
    "application": False,
    "installable": True,
    "depends": ["website", "product"],
    "data": [
        "views/templates.xml",
    ],
    "assets": {
        "web.assets_frontend": [
            "nahe_website_barcode_scanner/static/src/js/barcode_scanner.js",
        ],
    },
}
