"use strict";
/**
 * @class Finder command "download".
 * Download selected files.
 * Only for new api
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
Finder.prototype.commands.download = function() {
	var self   = this,
		fm     = this.fm,
		filter = function(hashes) {
			return $.map(self.files(hashes), function(f) { return f.mime == 'directory' ? null : f });
		};

	this.shortcuts = [{
		pattern     : 'shift+enter'
	}];

	this.getstate = function() {
		var sel = this.fm.selected(),
			cnt = sel.length;

		return  !this._disabled && cnt && (!fm.UA.IE || cnt == 1) && cnt == filter(sel).length ? 0 : -1;
	}

	this.exec = function(hashes) {
		var fm      = this.fm,
			base    = fm.options.url,
			files   = filter(hashes),
			dfrd    = $.Deferred(),
			iframes = '',
			cdata   = '',
			i, url;

		if (this.disabled()) {
			return dfrd.reject();
		}

		$.each(fm.options.customData || {}, function(k, v) {
			cdata += '&'+k+'='+v;
		});

		base += base.indexOf('?') === -1 ? '?' : '&';

		for (i = 0; i < files.length; i++) {
			iframes += '<iframe class="downloader" id="downloader-' + files[i].hash+'" style="display:none" src="'+base + 'cmd=file&target=' + files[i].hash+'&download=1'+cdata+'"/>';
		}
		$(iframes)
			.appendTo('body')
			.ready(function() {

				// remove iframes after some time has passed
				// 20 sec + 10 sec for each file
				setTimeout(function() {
					$(iframes).each(function() {
						$('#' + $(this).attr('id')).remove();
					});
				}, (20000 + (10000 * i)) );
			});
		fm.trigger('download', {files : files});
		return dfrd.resolve(hashes);
	}

}