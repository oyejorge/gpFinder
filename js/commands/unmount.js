
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
		return fm.request({
			data : {cmd : 'unmount', target : hashes[0] },
		});
	}



}