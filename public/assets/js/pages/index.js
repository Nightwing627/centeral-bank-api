"use strict";
var Page = function() {

	var initPage = function() {
		// $('#preloader-active').delay(2000).fadeOut('slow');
		// $('body').delay(2000).css({
		// 	'overflow': 'visible'
		// });

		var initStatus = function() {
			var type = $('input[name="type"]:checked').val();
			if (type != undefined) {
				if (type == 'cpf') {
					$('.section_cpf').addClass('d-block').removeClass('d-none');
					$('.section_cnpj').addClass('d-none').removeClass('d-block');
				} else {
					$('.section_cpf').addClass('d-none').removeClass('d-block');
					$('.section_cnpj').addClass('d-block').removeClass('d-none');
				}
			} else {
				$('input[value="cpf"]').prop('checked', 'checked');
				$('.section_cpf').addClass('d-block').removeClass('d-none');
				$('.section_cnpj').addClass('d-none').removeClass('d-block');
			}
		}

		$('input[name="type"]').change(function() {
			initStatus();
		});

		initStatus();
		
		$(':input[data-inputmask]').inputmask({
			autoUnmark: true,
			removeMaskOnSumbit: true,
			oncomplete: function() {
				$(this).parent().find('input[type="hidden"]').val( $(this).inputmask('unmaskedvalue') );
			}
		});

		jQuery.validator.addMethod("exactlength", function(value, element, param) {
			value = $(element).inputmask('unmaskedvalue');
			return this.optional(element) || value.length == param;
		   }, $.validator.format("Documento informado é inválido"));

		// Wait for the DOM to be ready
		$("form[name='dataFrm']").validate({
			// Specify validation rules
			rules: {
				cpf_value: {
					required: true,
					exactlength: 11
				},
				birth_value: "required",
				cnpj_value: {
					required: true,
					exactlength: 14
				},
				openDate_value: "required"
			},
			messages: {
				cpf_value: {
					required: "Campo obrigatório",
				},
				birth_value: "Campo obrigatório",
				cnpj_value: {
					required: "Campo obrigatório",
				},
				openDate_value: "Campo obrigatório"
			},
			errorPlacement: function(label, element) {
				label.addClass('err-msg');
        		label.insertAfter(element);
			},
			wrapper: 'span',
			submitHandler: function(form) {
				$('input[type="date"]').each(function(index) {
					let v = $(this).val();
					let cs = v.split('-');
					$(this).parent().find('input[type="hidden"]').val( cs[2] + '/' + cs[1] + '/' + cs[0] );
				});
				
			  	form.submit();
			}
		});
	};

	return {
		//main function to initiate the module
		init: function() {
			initPage();
		},
	};

}();

jQuery(document).ready(function() {
	Page.init();
});
