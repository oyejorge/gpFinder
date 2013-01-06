<?php

set_time_limit(0); // just in case it too long, not recommended for production
error_reporting(E_ALL | E_STRICT); // Set E_ALL for debuging
// error_reporting(0);
@ini_set('display_errors',0);
ini_set('max_file_uploads', 50);   // allow uploading up to 50 files at once

// needed for case insensitive search to work, due to broken UTF-8 support in PHP
ini_set('mbstring.internal_encoding', 'UTF-8');
ini_set('mbstring.func_overload', 2);

if( function_exists('date_default_timezone_set') ){
	date_default_timezone_set('Europe/Moscow');
}

include_once( dirname(__FILE__).'/Finder.class.php' );

/**
 * Smart logger function
 * Demonstrate how to work with Finder event api
 *
 * @param  string   $cmd       command name
 * @param  array    $result    command result
 * @param  array    $args      command arguments from client
 * @param  object $finder  Finder instance
 * @return void|true
 * @author Troex Nevelin
 **/
function logger($cmd, $result, $args, $finder) {

	$log = sprintf("[%s] %s: %s \n", date('r'), strtoupper($cmd), var_export($result, true));
	$logfile = '../files/temp/log.txt';
	$dir = dirname($logfile);
	if (!is_dir($dir) && !mkdir($dir)) {
		return;
	}
	if (($fp = fopen($logfile, 'w'))) {
		fwrite($fp, $log);
		fclose($fp);
	}
}



function debug(){
	static $file = false;
	if( !$file ){
		$time = time();
		do{
			$file = dirname(dirname(__FILE__)).'/files/log_'.$time;
			$time++;
		}while( file_exists($file) );
	}


	$args = func_get_args();
	if( count($args) == 1 ){
		$args = array_shift($args);
	}
	//$content = print_r($args,true)."\n-----------------------------------------------------------------------------------\n\n";
	$content = print_r($args,true)."\n";
	$fp = fopen($file, 'a');
	if( $fp ){
		fwrite($fp, $content);
		fclose($fp);
	}
	return true;
}

function logger_before( $cmd, $args, $finder ){

	$logfile = '../files/temp/log-before.txt';
	$dir = dirname($logfile);
	if( !is_dir($dir) && !mkdir($dir) ){
		return $args;
	}

	$log = "[".date('r')."] ".strtoupper($cmd).": ".var_export($args,true)." \n";

	if( ($fp = fopen($logfile, 'w')) ){
		fwrite($fp, $log);
		fclose($fp);
	}
	return $args;
}


/**
 * Prevents any files with "php" in the name from being uploaded
 *
 */
function upload_check( $event, $args, $finder ){
	logger_before( $event, $args, $finder );

	$files =& $args['FILES']['upload'];
	if( is_array($files) ){
		return $args;
	}

	foreach( $files['name'] as $i => $name ){
		if( stripos($name,'.php') !== false ){
			return false;
		}
	}
	return $args;
}


/**
 * Simple function to demonstrate how to control file access using "accessControl" callback.
 * This method will disable accessing files/folders starting from  '.' (dot)
 *
 * @param  string  $attr  attribute name (read|write|locked|hidden)
 * @param  string  $path  file path relative to volume root directory started with directory separator
 * @return bool|null
 **/
function access($attr, $path, $data, $volume) {
	return strpos(basename($path), '.') === 0       // if file/folder begins with '.' (dot)
		? !($attr == 'read' || $attr == 'write')    // set read+write to false, other (locked+hidden) set to true
		:  null;                                    // else Finder decide it itself
}



$opts = array(
	'locale' => 'en_US.UTF-8',
	'bind' => array(
		'*' => 'logger',
		//'*-before' => 'logger_before'
		'upload-before' => 'upload_check'
		// 'mkdir mkfile rename duplicate upload rm paste' => 'logger'
	),
	//'debug' => true,
	'saveData' => 'SaveFinderData',
	'returnData' => 'ReturnFinderData',

	'roots' => array(
		array(
			'driver'		=> 'LocalFileSystem',

			'path'			=> dirname(dirname(__FILE__)).'/files',
			'separator'		=> '/',

			//'path'       => '../files/',
			//'startPath'  => '../files/test/',


			'URL'        => dirname($_SERVER['PHP_SELF']) . '/../files/',
			// 'treeDeep'   => 3,
			// 'alias'      => 'File system',
			'tmbPath'    => '.tmb',
			'utf8fix'    => true,
			'tmbCrop'    => false,
			'tmbBgColor' => 'transparent',
			'accessControl' => 'access',
			'acceptedName'    => '/^[^\.].*$/',
			// 'tmbSize' => 128,
			'attributes' => array(
				array(
					'pattern' => '/\.js$/',
					'read' => true,
					'write' => false
				),
				array(
					'pattern' => '/^\/icons$/',
					'read' => true,
					'write' => false
				)
			)
			// 'uploadDeny' => array('application', 'text/xml')
		),
		// array(
		// 	'driver'     => 'LocalFileSystem',
		// 	'path'       => '../files2/',
		// 	// 'URL'        => dirname($_SERVER['PHP_SELF']) . '/../files2/',
		// 	'alias'      => 'File system',
		// 	'tmbPath'    => '.tmb',
		// 	'utf8fix'    => true,
		// 	'tmbCrop'    => false,
		// 	'startPath'  => '../files/test',
		// 	// 'separator' => ':',
		// 	'attributes' => array(
		// 		array(
		// 			'pattern' => '~/\.~',
		// 			// 'pattern' => '/^\/\./',
		// 			'read' => false,
		// 			'write' => false,
		// 			'hidden' => true,
		// 			'locked' => false
		// 		),
		// 		array(
		// 			'pattern' => '~/replace/.+png$~',
		// 			// 'pattern' => '/^\/\./',
		// 			'read' => false,
		// 			'write' => false,
		// 			// 'hidden' => true,
		// 			'locked' => true
		// 		)
		// 	),
		// 	// 'defaults' => array('read' => false, 'write' => true)
		// ),

		// array(
		// 	'driver' => 'FTP',
		// 	'host' => '192.168.1.38',
		// 	'user' => 'dio',
		// 	'pass' => 'hane',
		// 	'path' => '/Users/dio/Documents',
		// 	'tmpPath' => '../files/ftp',
		// 	'utf8fix' => true,
		// 	'attributes' => array(
		// 		array(
		// 			'pattern' => '~/\.~',
		// 			'read' => false,
		// 			'write' => false,
		// 			'hidden' => true,
		// 			'locked' => false
		// 		),
		//
		// 	)
		// ),
		// array(
		// 	'driver' => 'FTP',
		// 	'host' => 'work.std42.ru',
		// 	'user' => 'dio',
		// 	'pass' => 'wallrus',
		// 	'path' => '/',
		// 	'tmpPath' => '../files/ftp',
		// ),
		// array(
		// 	'driver' => 'FTP',
		// 	'host' => '192.168.1.35',
		// 	'user' => 'frontrow',
		// 	'pass' => 'frontrow',
		// 	'path' => '/'
		// ),

		// array(
		// 	'driver'     => 'LocalFileSystem',
		// 	'path'       => '../files2/',
		// 	'URL'        => dirname($_SERVER['PHP_SELF']) . '/../files2/',
		// 	'alias'      => 'Files',
		// 	'tmbPath'    => '.tmb',
		// 	// 'copyOverwrite' => false,
		// 	'utf8fix'    => true,
		// 	'attributes' => array(
		// 		array(
		// 			'pattern' => '~/\.~',
		// 			// 'pattern' => '/^\/\./',
		// 			// 'read' => false,
		// 			// 'write' => false,
		// 			'hidden' => true,
		// 			'locked' => false
		// 		),
		// 	)
		// ),

		// array(
		// 	'driver' => 'MySQL',
		// 	'path' => 1,
		// 	// 'treeDeep' => 2,
		// 	// 'socket'          => '/opt/local/var/run/mysql5/mysqld.sock',
		// 	'user' => 'root',
		// 	'pass' => 'hane',
		// 	'db' => 'finder',
		// 	'user_id' => 1,
		// 	// 'accessControl' => 'access',
		// 	// 'separator' => ':',
		// 	'tmbCrop'         => true,
		// 	// thumbnails background color (hex #rrggbb or 'transparent')
		// 	'tmbBgColor'      => '#000000',
		// 	'files_table' => 'finder_file',
		// 	// 'imgLib' => 'imagick',
		// 	// 'uploadOverwrite' => false,
		// 	// 'copyTo' => false,
		// 	// 'URL'    => 'http://localhost/git/finder',
		// 	'tmpPath' => '../filesdb/tmp',
		// 	'tmbPath' => '../filesdb/tmb',
		// 	'tmbURL' => dirname($_SERVER['PHP_SELF']) . '/../filesdb/tmb/',
		// 	// 'attributes' => array(
		// 	// 	array(),
		// 	// 	array(
		// 	// 		'pattern' => '/\.jpg$/',
		// 	// 		'read' => false,
		// 	// 		'write' => false,
		// 	// 		'locked' => true,
		// 	// 		'hidden' => true
		// 	// 	)
		// 	// )
		//
		// )
	)

);


/**
 * Functions for saving and returning data used by the finder
 *
 */
session_start();
//$_SESSION = array();
function SaveFinderData($data){
	$_SESSION['finder_data'] = $data;
}
function ReturnFinderData(){
	if( isset($_SESSION['finder_data']) ){
		return $_SESSION['finder_data'];
	}
	return false;
}



header('Access-Control-Allow-Origin: *');
$finder = new Finder($opts);
$finder->run();

