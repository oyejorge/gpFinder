
/**
 * @class  Finder command "unmount"
 * un mount a network volume
 *
 */
Finder.prototype.commands.unmount = function() {
	var self = this,
		fm = this.fm;

	this.alwaysEnabled  = true;
	this.updateOnSelect = false;

	this.getstate = function(target){
		if( !target || target.length > 1 ) return -1;
		var file = fm.file(target[0]);
		if( file.net ){
			return 0;
		}
		return -1;
	}

	this.exec = function(hashes){
		var target	= hashes[0],
			dfrd	= $.Deferred();

		return fm.request({
			data : {cmd : 'unmount', target : target },
			notify : {type : 'unmount', cnt : 1}
		}).fail(function(error){
			dfrd.reject(error);
		}).done(function(error){
			dfrd.resolve();

			//remove the tree
			var span = $('#nav-'+target).closest('.finder-navbar-wrapper').detach();

			//select different tree
			var $first = $('.finder-navbar-wrapper:first span:first').click();

		});
	}


}