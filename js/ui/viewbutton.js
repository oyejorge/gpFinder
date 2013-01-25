"use strict"
/**
 * @class  Finder toolbar button to switch current directory view.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.finderviewbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).finderbutton(cmd),
			icon   = button.children('.finder-button-icon');

		cmd.change(function() {
			var icons = cmd.value == 'icons';

			icon.toggleClass('finder-button-icon-view-list', icons);
			button.attr('title', cmd.fm.i18n(icons ? 'viewlist' : 'viewicons'));
		});
	});
}