/**
 * @class findernav - Finder container for diretories tree and places
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.findernavbar = function(fm, opts) {

	this.not('.finder-navbar').each(function() {
		var nav    = $(this).addClass('ui-state-default finder-navbar'),
			parent = nav.parent()
				.resize(function() {
					nav.height(wz.height() - delta);
				}),
			wz     = parent.children('.finder-workzone').append(nav),
			delta  = nav.outerHeight() - nav.height(),
			handle;


		if ($.fn.resizable) {
			handle = nav.resizable({
					handles : (fm.direction == 'ltr') ? 'e' : 'w',
					minWidth : opts.minWidth || 150,
					maxWidth : opts.maxWidth || 500
				})
				.bind('resize scroll', function() {
					handle.css({
						top  : parseInt(nav.scrollTop())+'px'
					})
				})
				.find('.ui-resizable-handle').zIndex(nav.zIndex() + 10);

			fm.one('open', function() {
				setTimeout(function() {
					nav.trigger('resize');
				}, 150);
			});
		}
	});

	return this;
}
