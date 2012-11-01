
/**
 * @class  Finder toolbar
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.findertoolbar = function(fm, opts) {
	this.not('.finder-toolbar').each(function() {
		var commands = fm._commands,
			self     = $(this).addClass('ui-helper-clearfix ui-widget-header ui-corner-top finder-toolbar'),
			panels   = opts || [],
			l        = panels.length,
			i, cmd, panel, button;

		self.prev().length && self.parent().prepend(this);

		while (l--) {
			if (panels[l]) {
				panel = $('<div class="ui-widget-content ui-corner-all finder-buttonset"/>');
				i = panels[l].length;
				while (i--) {
					if ((cmd = commands[panels[l][i]])) {
						button = 'finder'+cmd.options.ui;
						$.fn[button] && panel.prepend($('<div/>')[button](cmd));
					}
				}

				panel.children().length && self.prepend(panel);
				panel.children(':not(:last),:not(:first):not(:last)').after('<span class="ui-widget-content finder-toolbar-button-separator"/>');

			}
		}

		self.children().length && self.show();
	});

	return this;
}
