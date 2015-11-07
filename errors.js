function errorHandler( error ){
	if( error !== null ){
		console.log( 'this is the error ' + error );
	}
	else{
		console.log( 'no errors' );
	}
}

module.exports = {
  errorHandler: errorHandler
};
