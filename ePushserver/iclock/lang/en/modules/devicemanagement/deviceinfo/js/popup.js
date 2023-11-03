var type = "";
function openPopup(id) {
	type = id;
}

jQuery(document).ready(
		function($) {
			// close popup
			$('.cd-popup').on(
					'click',
					function(event) {
						if ($(event.target).is('.cd-popup-close')
								|| $(event.target).is('.cd-popup')) {
							event.preventDefault();
							$(this).removeClass('is-visible');
						}
					});
			// close popup when clicking the esc keyboard button
			$(document).keyup(function(event) {
				if (event.which == '27') {
					$('.cd-popup').removeClass('is-visible');
				}
			});

			// close popup
			$('.cd-insert-popup').on(
					'click',
					function(event) {
						if ($(event.target).is('.cd-insert-popup-close')
								|| $(event.target).is('.cd-insert-popup')) {
							event.preventDefault();
							$(this).removeClass('is-visible');
						}
					});
			// close popup when clicking the esc keyboard button
			$(document).keyup(function(event) {
				if (event.which == '27') {
					$('.cd-insert-popup').removeClass('is-visible');
				}
			});

			// close popup
			$('.popup_device_commands').on(
					'click',
					function(event)
					{
						if ($(event.target).is('.popup_device_commands-close')
								|| $(event.target).is('.popup_device_commands'))
                        {
							event.preventDefault();
							$(this).removeClass('is-visible');
						}
					});
			// close popup when clicking the esc keyboard button
			$(document).keyup(function(event) {
				if (event.which == '27')
				{
					$('.popup_device_commands').removeClass ('is-visible');
				}
			});

		});