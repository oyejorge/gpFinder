"use strict";
/**
 * @class  Finder toolbar's button tor upload file
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.finderuploadbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).finderbutton(cmd)
				.unbind('click'),
			form = $('<form/>').appendTo(button),
			input = $('<input type="file" multiple="true"/>')
				.change(function() {
					var _input = $(this);
					if (_input.val()) {
						cmd.exec({input : _input.remove()[0]});
						input.clone(true).appendTo(form);
					}
				});

		form.append(input.clone(true));

		cmd.change(function() {
			form[cmd.disabled() ? 'hide' : 'show']();
		})
		.change();
	});
}
