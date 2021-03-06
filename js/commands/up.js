"use strict";
/**
 * @class  Finder command "up"
 * Go into parent directory
 *
 * @author Dmitry (dio) Levashov
 **/
Finder.prototype.commands.up = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = false;

	this.shortcuts = [{
		pattern     : 'ctrl+up'
	}];

	this.getstate = function() {
		return this.fm.cwd().phash ? 0 : -1;
	}

	this.exec = function() {
		return this.fm.cwd().phash ? this.fm.exec('open', this.fm.cwd().phash) : $.Deferred().reject();
	}

}