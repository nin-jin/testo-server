var connect = require('connect')

var server= connect.createServer( connect.static( __dirname ) ).listen( 1351 )
var io= require( 'socket.io' ).listen( server )
var fs= require('fs')

var config= {
    uri: 'http://hyoo.local/jin/-mix/dev.doc.xhtml?testo_session=',
    timeout: 5000,
}

var agents= {}
var states= {}

io.sockets.on( 'connection', function( socket ){

    socket.on( 'agent:ready', function( param ){
        console.log( 'agent:', param.id )
        agents[ param.id ]= socket
    } )
    
    socket.on( 'test:run', function( param ){
        states= {}
        socket.broadcast.emit( 'agent:run', { uri: config.uri })
    } )
    
    socket.on( 'agent:done', function( param ){
        states[ param.id ]= param.state
        console.log( states )
        for( var id in agents ){
            if(!( id in states )) return
        }
        
        socket.broadcast.emit( 'test:done', states )
    } )
  
} )

var programFiles= process.env['ProgramFiles(x86)'] || process.env.ProgramFiles

persistBrowser( programFiles + '/Mozilla Firefox/firefox.exe' )
persistBrowser( programFiles + '/Opera/opera.exe' )
persistBrowser( programFiles + '/Internet Explorer/iexplore.exe' )
persistBrowser( programFiles + '/Google/Chrome/Application/chrome.exe' )

function persistBrowser( path ){
    require( 'child_process' ).execFile
    (   path
    ,   [ 'http://localhost:1351' ]
    ,   {}
    ,   function( error, stdout, stderr ){
            onExit()
        }
    )
    
    var onExit= function( ){ }
    
    setTimeout( function( ){
        onExit= function( ){
            persistBrowser( path )
        }
    }, 1000 )
}

