'use strict';

function Network() {
	this.peer = null;
	this.peerId= null
	this.coPeerId = null;
	this.curKey = null;
	this.keyList = {};
	this.peerKey = null;
	this.online = null;
	this.onlinePeers = [];
    this.peerAddress=[];
    this.apiKey ='v6f44wlb4nqgds4i';
    this.coPeerInfo={};
    this.connections={};
    this.maxPeers=20;
    this.peer.stoplistening();
    this.peer.close();

}
Network.prototype.getOnlinePeers = function() {
    return this.onlinePeers;
};
Network.prototype.getPeer = function() {
    return this.peer;
};
Network.prototype.online = function() {
     this.online=true;
};
Network.prototype.offline = function() {
    this.online=false;
};

Network.prototype.findpeers = function(){
     var self = this;
     var conn = this.peer;

     conn.on('open', function() {
         self.onlinePeers.push(self.peerId);
         self.coPeerInfo[self.peerId]= self.peerId;
         return openCallback();
     });

     conn.on('error', function(err) {
        console.log(err);
     });

     conn.on('connection', function(data) {
         data.on('open', function() {
         data.close();
      });
  });

}

Network.prototype.connectToPeer = function(peerId){
    var self = this;
    var peerId = this.keyfromCoPeer(_peerId);
    var dataConn = this.peer.connect(peerId, {
        serialization: 'none',
        reliable: true,
    });
}
Network.prototype.keyfromCoPeer = function(peerId) {
    var key = this.coPeerInfo[peerId];
    return key;
};

Network.prototype.connect = function(){
    if (self.connectedPeers.length > 0) return; // Already connected!
    if (self.peer) 
    {
        self.peer.destroy();
        self.peer.removeAllListeners();
    }
    self.peer = new Peer(self.peerId, self.apiKey);
    return;
    self.emit('serverError', self.criticalError);
    self.cleanUp();
  }


Network.prototype.handshake = function(peerKey){
  this.send(peerKey, {
    type: 'hello',
    peerId: this.peerKey,
  });
}

Network.prototype.stoplistening = function(){

}

Network.prototype.close = function(){
	this.peerId= null;
	this.peer = null;
	this.key = null;
	this.onlineParticipants = [];
    this.peerAddress=[];
    this.connections={};
    this.peer.stoplistening();
    this.peer.close();

}

Network.prototype.disconnect = function(callback) {
    var self = this;
    self.send('close', function(dataConn){
    dataConn.close();
    if (typeof cb === 'function')
    {
    	callback();	
    } 
  });
};

Network.prototype.send = function(copeerId, payload, callback) {
    var peerId = this.keyfromCoPeer(copeerId);
    if (peerId !== this.peerId)
    {
        var dataConn = this.connections[peerId];
        
        if (dataConn) 
        {
            dataConn.send(payload);
        }

    }
    if (typeof cb === 'function')
    {
    	callback();
    }
};

Network.prototype.broadcast = function(onlineParticipants, payload, callback) {
    var self=this;
    //get all connected peers and broadcast try to encrypt the payload.
};



