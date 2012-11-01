
/**
 * Finder resources registry.
 * Store shared data
 *
 * @type Object
 * @author Dmitry (dio) Levashov
 **/
Finder.prototype.resources = {
	'class' : {
		hover       : 'ui-state-hover',
		active      : 'ui-state-active',
		disabled    : 'ui-state-disabled',
		draggable   : 'ui-draggable',
		droppable   : 'ui-droppable',
		adroppable  : 'finder-droppable-active',
		cwdfile     : 'finder-cwd-file',
		cwd         : 'finder-cwd',
		tree        : 'finder-tree',
		treeroot    : 'finder-navbar-root',
		navdir      : 'finder-navbar-dir',
		navdirwrap  : 'finder-navbar-dir-wrapper',
		navarrow    : 'finder-navbar-arrow',
		navsubtree  : 'finder-navbar-subtree',
		navcollapse : 'finder-navbar-collapsed',
		navexpand   : 'finder-navbar-expanded',
		treedir     : 'finder-tree-dir',
		placedir    : 'finder-place-dir',
		searchbtn   : 'finder-button-search'
	},
	tpl : {
		perms      : '<span class="finder-perms"/>',
		symlink    : '<span class="finder-symlink"/>',
		navicon    : '<span class="finder-nav-icon"/>',
		navspinner : '<span class="finder-navbar-spinner"/>',
		navdir     : '<div class="finder-navbar-wrapper"><span id="{id}" class="ui-corner-all finder-navbar-dir {cssclass}"><span class="finder-navbar-arrow"/><span class="finder-navbar-icon"/>{symlink}{permissions}{name}</span><div class="finder-navbar-subtree"/></div>'

	},

	mimes : {
		text : [
			'application/x-empty',
			'application/javascript',
			'application/xhtml+xml',
			'audio/x-mp3-playlist',
			'application/x-web-config',
			'application/docbook+xml',
			'application/x-php',
			'application/x-perl',
			'application/x-awk',
			'application/x-config',
			'application/x-csh',
			'application/xml'
		]
	},

	mixin : {
		make : function() {
			var fm   = this.fm,
				cmd  = this.name,
				cwd  = fm.getUI('cwd'),
				dfrd = $.Deferred()
					.fail(function(error) {
						cwd.trigger('unselectall');
						error && fm.error(error);
					})
					.always(function() {
						input.remove();
						node.remove();
						fm.enable();
					}),
				id    = 'tmp_'+parseInt(Math.random()*100000),
				phash = fm.cwd().hash,
				date = new Date(),
				file   = {
					hash  : id,
					name  : fm.uniqueName(this.prefix),
					mime  : this.mime,
					read  : true,
					write : true,
					date  : 'Today '+date.getHours()+':'+date.getMinutes()
				},
				node = cwd.trigger('create.'+fm.namespace, file).find('#'+id),
				input = $('<input type="text"/>')
					.keydown(function(e) {
						e.stopImmediatePropagation();

						if (e.keyCode == $.ui.keyCode.ESCAPE) {
							dfrd.reject();
						} else if (e.keyCode == $.ui.keyCode.ENTER) {
							input.blur();
						}
					})
					.mousedown(function(e) {
						e.stopPropagation();
					})
					.blur(function() {
						var name   = $.trim(input.val()),
							parent = input.parent();

						if (parent.length) {

							if (!name) {
								return dfrd.reject('errInvName');
							}
							if (fm.fileByName(name, phash)) {
								return dfrd.reject(['errExists', name]);
							}

							parent.html(fm.escape(name));

							fm.lockfiles({files : [id]});

							fm.request({
									data        : {cmd : cmd, name : name, target : phash},
									notify      : {type : cmd, cnt : 1},
									preventFail : true,
									syncOnFail  : true
								})
								.fail(function(error) {
									dfrd.reject(error);
								})
								.done(function(data) {
									dfrd.resolve(data);
								});
						}
					});


			if (this.disabled() || !node.length) {
				return dfrd.reject();
			}

			fm.disable();
			node.find('.finder-cwd-filename').empty('').append(input.val(file.name));
			input.select().focus();

			return dfrd;



		}

	}
}

