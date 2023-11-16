odoo.define('nahe_website_barcode_scanner.barcode_scanner', function (require) {
    'use strict';

    var ajax = require('web.ajax');

    $(document).ready(function () {
        // Función para limpiar y enfocar el campo de entrada
        function clearAndFocusInput() {
            var $barcodeInput = $('#barcode-input');
            $barcodeInput.val(''); // Limpiar el campo de entrada
            $barcodeInput.focus(); // Establecer el foco en el campo de entrada
        }

        $('#barcode-form').on('submit', function (e) {
            e.preventDefault();
            var barcode = $('#barcode-input').val();
            
            // Asegúrate de no proceder si el valor del código de barras está vacío.
            if (!barcode.trim()) {
                clearAndFocusInput();
                return;
            }

            ajax.jsonRpc("/barcode_scanner", 'call', {'barcode': barcode})
                .then(function (data) {
                    if (data.found) {
                        var productHtml = 
                            '<div class="row">' +
                                '<div class="col-md-6">' +
                                    '<h2 style="font-size: 2.5em;"><strong>' + data.name + '</strong></h2>' + 
                                    '<p style="font-size: 3em;"><strong>Precio:</strong> ' + data.price + '</p>' + 
                                    (data.description_sale ? '<p>' + data.description_sale + '</p>' : '') + // Descripción si está disponible
                                '</div>' +
                                '<div class="col-md-6">' +
                                    '<img src="' + data.image_url + '" style="max-width: 80%; height: auto;">' + 
                                '</div>' +
                            '</div>';
                        $('#product-info').html(productHtml);
                    } else {
                        $('#product-info').html('<p>Producto no encontrado</p>');
                    }
                    clearAndFocusInput(); // Limpiar y enfocar después de cada búsqueda

                }).catch(function (error) {
                    $('#product-info').html('<p>Se produjo un error al buscar el producto.</p>');
                    console.error('Error en la solicitud JSON-RPC:', error);
                    clearAndFocusInput(); // Asegúrate de limpiar y enfocar incluso si hay un error
                });
        });

        // Inicialmente, pon el foco en el campo de entrada cuando la página se carga
        clearAndFocusInput();
    });
});
