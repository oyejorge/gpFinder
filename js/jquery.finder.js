$.fn.finder = function(o) {

	if (o == 'instance') {
		return this.getFinder();
	}

	return this.each(function() {

		var cmd = typeof(o) == 'string' ? o : '';
		if (!this.finder) {
			new Finder(this, typeof(o) == 'object' ? o : {})
		}

		switch(cmd) {
			case 'close':
			case 'hide':
				this.finder.hide();
				break;

			case 'open':
			case 'show':
				this.finder.show();
				break;

			case 'destroy':
				this.finder.destroy();
				break;
		}

	})
}

$.fn.getFinder = function() {
	var instance;

	this.each(function() {
		if (this.finder) {
			instance = this.finder;
			return false;
		}
	});

	return instance;
}
