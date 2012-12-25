var io = require( 'socket.io-client' )

var socket = io.connect( ':1351' )

socket.emit( 'test:run' )

socket.on( 'test:done', function( states ){
    for( var agent in states ){
        if( states[ agent ] )
            continue

        console.error( 'FAULT: ' + agent )
    }

    socket.disconnect()
} )
