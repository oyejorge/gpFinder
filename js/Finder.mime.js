
/**
 * File mimetype to kind mapping
 *
 * @type  Object
 */
Finder.prototype.kinds = {

		'unknown'                       : 'Unknown',
		'directory'                     : 'Folder',
		'symlink'                       : 'Alias',
		'symlink-broken'                : 'AliasBroken',
		'application/x-empty'           : 'TextPlain',
		'application/postscript'        : 'Postscript',
		'application/vnd.ms-office'     : 'MsOffice',
		'application/vnd.ms-word'       : 'MsWord',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'MsWord',
		'application/vnd.ms-word.document.macroEnabled.12'                        : 'MsWord',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template' : 'MsWord',
		'application/vnd.ms-word.template.macroEnabled.12'                        : 'MsWord',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'       : 'MsWord',
		'application/vnd.ms-excel'      : 'MsExcel',
		'application/vnd.ms-excel.sheet.macroEnabled.12'                          : 'MsExcel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template'    : 'MsExcel',
		'application/vnd.ms-excel.template.macroEnabled.12'                       : 'MsExcel',
		'application/vnd.ms-excel.sheet.binary.macroEnabled.12'                   : 'MsExcel',
		'application/vnd.ms-excel.addin.macroEnabled.12'                          : 'MsExcel',
		'application/vnd.ms-powerpoint' : 'MsPP',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation' : 'MsPP',
		'application/vnd.ms-powerpoint.presentation.macroEnabled.12'              : 'MsPP',
		'application/vnd.openxmlformats-officedocument.presentationml.slideshow'  : 'MsPP',
		'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'                 : 'MsPP',
		'application/vnd.openxmlformats-officedocument.presentationml.template'   : 'MsPP',
		'application/vnd.ms-powerpoint.template.macroEnabled.12'                  : 'MsPP',
		'application/vnd.ms-powerpoint.addin.macroEnabled.12'                     : 'MsPP',
		'application/vnd.openxmlformats-officedocument.presentationml.slide'      : 'MsPP',
		'application/vnd.ms-powerpoint.slide.macroEnabled.12'                     : 'MsPP',
		'application/pdf'               : 'PDF',
		'application/xml'               : 'XML',
		'application/vnd.oasis.opendocument.text' : 'OO',
		'application/vnd.oasis.opendocument.text-template'         : 'OO',
		'application/vnd.oasis.opendocument.text-web'              : 'OO',
		'application/vnd.oasis.opendocument.text-master'           : 'OO',
		'application/vnd.oasis.opendocument.graphics'              : 'OO',
		'application/vnd.oasis.opendocument.graphics-template'     : 'OO',
		'application/vnd.oasis.opendocument.presentation'          : 'OO',
		'application/vnd.oasis.opendocument.presentation-template' : 'OO',
		'application/vnd.oasis.opendocument.spreadsheet'           : 'OO',
		'application/vnd.oasis.opendocument.spreadsheet-template'  : 'OO',
		'application/vnd.oasis.opendocument.chart'                 : 'OO',
		'application/vnd.oasis.opendocument.formula'               : 'OO',
		'application/vnd.oasis.opendocument.database'              : 'OO',
		'application/vnd.oasis.opendocument.image'                 : 'OO',
		'application/vnd.openofficeorg.extension'                  : 'OO',
		'application/x-shockwave-flash' : 'AppFlash',
		'application/flash-video'       : 'Flash video',
		'application/x-bittorrent'      : 'Torrent',
		'application/javascript'        : 'JS',
		'application/rtf'               : 'RTF',
		'application/rtfd'              : 'RTF',
		'application/x-font-ttf'        : 'TTF',
		'application/x-font-otf'        : 'OTF',
		'application/x-rpm'             : 'RPM',
		'application/x-web-config'      : 'TextPlain',
		'application/xhtml+xml'         : 'HTML',
		'application/docbook+xml'       : 'DOCBOOK',
		'application/x-awk'             : 'AWK',
		'application/x-gzip'            : 'GZIP',
		'application/x-bzip2'           : 'BZIP',
		'application/zip'               : 'ZIP',
		'application/x-zip'               : 'ZIP',
		'application/x-rar'             : 'RAR',
		'application/x-tar'             : 'TAR',
		'application/x-7z-compressed'   : '7z',
		'application/x-jar'             : 'JAR',
		'text/plain'                    : 'TextPlain',
		'text/x-php'                    : 'PHP',
		'text/html'                     : 'HTML',
		'text/javascript'               : 'JS',
		'text/css'                      : 'CSS',
		'text/rtf'                      : 'RTF',
		'text/rtfd'                     : 'RTF',
		'text/x-c'                      : 'C',
		'text/x-csrc'                   : 'C',
		'text/x-chdr'                   : 'CHeader',
		'text/x-c++'                    : 'CPP',
		'text/x-c++src'                 : 'CPP',
		'text/x-c++hdr'                 : 'CPPHeader',
		'text/x-shellscript'            : 'Shell',
		'application/x-csh'             : 'Shell',
		'text/x-python'                 : 'Python',
		'text/x-java'                   : 'Java',
		'text/x-java-source'            : 'Java',
		'text/x-ruby'                   : 'Ruby',
		'text/x-perl'                   : 'Perl',
		'text/x-sql'                    : 'SQL',
		'text/xml'                      : 'XML',
		'text/x-comma-separated-values' : 'CSV',
		'image/x-ms-bmp'                : 'BMP',
		'image/jpeg'                    : 'JPEG',
		'image/gif'                     : 'GIF',
		'image/png'                     : 'PNG',
		'image/tiff'                    : 'TIFF',
		'image/x-targa'                 : 'TGA',
		'image/vnd.adobe.photoshop'     : 'PSD',
		'image/xbm'                     : 'XBITMAP',
		'image/pxm'                     : 'PXM',
		'audio/mpeg'                    : 'AudioMPEG',
		'audio/midi'                    : 'AudioMIDI',
		'audio/ogg'                     : 'AudioOGG',
		'audio/mp4'                     : 'AudioMPEG4',
		'audio/x-m4a'                   : 'AudioMPEG4',
		'audio/wav'                     : 'AudioWAV',
		'audio/x-mp3-playlist'          : 'AudioPlaylist',
		'video/x-dv'                    : 'VideoDV',
		'video/mp4'                     : 'VideoMPEG4',
		'video/mpeg'                    : 'VideoMPEG',
		'video/x-msvideo'               : 'VideoAVI',
		'video/quicktime'               : 'VideoMOV',
		'video/x-ms-wmv'                : 'VideoWM',
		'video/x-flv'                   : 'VideoFlash',
		'video/x-matroska'              : 'VideoMKV',
		'video/ogg'                     : 'VideoOGG'
};


/**
 * Return localized kind of file
 *
 * @param  Object|String  file or file mimetype
 * @return String
 */
Finder.prototype.mime2kind = function(f) {
	var mime = typeof(f) == 'object' ? f.mime : f, kind;

	if (f.alias) {
		kind = 'Alias';
	} else if (this.kinds[mime]) {
		kind = this.kinds[mime];
	} else {
		if (mime.indexOf('text') === 0) {
			kind = 'Text';
		} else if (mime.indexOf('image') === 0) {
			kind = 'Image';
		} else if (mime.indexOf('audio') === 0) {
			kind = 'Audio';
		} else if (mime.indexOf('video') === 0) {
			kind = 'Video';
		} else if (mime.indexOf('application') === 0) {
			kind = 'App';
		} else {
			kind = mime;
		}
	}

	return this.messages['kind'+kind] ? this.i18n('kind'+kind) : mime;
};


/**
 * Convert mimetype into css classes
 *
 * @param  String  file mimetype
 * @return String
 */
Finder.prototype.mime2class = function(mime) {
	var prefix = 'finder-cwd-icon-';

	mime = mime.split('/');

	return prefix+mime[0]+(mime[0] != 'image' && mime[1] ? ' '+prefix+mime[1].replace(/(\.|\+)/g, '-') : '');
};
