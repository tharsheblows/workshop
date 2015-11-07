/* *
 * Start by requiring in the http module,
 * and make your own server!
 */

"use strict";

// write two routes: one to post and one to get
// write your server

var http = require('http'); // because it's a core module, it doesn't require a path or .js extension -- this module creates the server
var fs = require('fs'); // the 'fs' core node module allows reading and writing to the file system.
var nodestatic = require('node-static');
var querystring = require('querystring');

var Errors = require( './errors.js' );


var fileServer = new nodestatic.Server('./public');

http.createServer(function (request, response) {

	var url = request.url;

	// this would be the route
	if(url === "/"){		
		fileServer.serve(request, response);
	}
	else if( url === "/posts"){
		fs.readFile( __dirname + '/blog.json', function(error, file){
  			if (error){
  			  	Errors.errorHandler( error );
  			  	response.end();
  			} else {
  			  	response.writeHead( 200 );
  			  	response.write( file.toString() );
  			  	response.end();
  			}
  		});
	}
	else if( url === "/create/post" ){
		if( request.method == 'POST' ){
  			request.on('data', function( chunk ) {
  				// here is the post
     		var blogPost = querystring.parse( chunk.toString() );
  				//find the time
  			var theTime = Date.now();


  				
  				// make blog json an object
  				console.log( blogPost['post'] );
  				console.log( theTime );
  				// append the time: post to it
  				// write it back to blog.json
  				// redirect back to the homepage
  			
  				fs.readFile( __dirname + '/blog.json', function(error, file){
  					if (error){
  					  	Errors.errorHandler( error );
  					  	response.end();
  					} else {
  						var existingPosts = JSON.parse( file.toString() );
  					  	existingPosts[theTime] = blogPost['post'];
		
  					  	fs.writeFile( __dirname + '/blog.json', JSON.stringify(existingPosts), function(error){
  					  		Errors.errorHandler( error );
  					  	});

  					  	response.writeHead(302, {'Location': '/'});
  					  	response.end();
  					}
  				});
   			});
  		}


 

	}
	else{
		fileServer.serve(request, response);
	}
    
}).listen(8000);
