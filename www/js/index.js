var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');       
        
        
        function displayLocation(latitude,longitude){
            var request = new XMLHttpRequest();

            var method = 'GET';
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&language=fa';
            var async = true;

            request.open(method, url, async);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    var currentdate = new Date(); 
                    var loc = currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + " - "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds() + " @ "
                            + address.formatted_address;
                    alert(loc);
                                                        
                    window.requestFileSystem(window.PERSISTENT, 5*1024*1024, successCreateCallback, errorCallback)

                    function successCreateCallback(fs) {
                        fs.root.getFile('locD32.txt', {create: true}, function(fileEntry) {
                            alert(fileEntry.toURL());
                            fileEntry.createWriter(function(fileWriter) {
                                fileWriter.write(loc);
                            }, errorCallback);
                        }, errorCallback);
                    }

                    function errorCallback(error) {
                        alert("ERROR: " + error.code)
                    }
                }
            };
            request.send();
        };
      
        function onSuccess(position) {
            var x = position.coords.latitude;
            var y = position.coords.longitude;
            displayLocation(x,y);     
        };
        
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }
        
        var options = {
            enableHighAccuracy: true,
            timeout: 9000,
            maximumAge: 0
        };
        getMyLocation();
        setInterval(getMyLocation, 600000);
        
        function getMyLocation(){          
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        }

        
/*
        console.log(navigator.contacts);
        function onSuccess(contacts) {
            alert('Found ' + contacts.length + ' contacts...');
            var phones = [];
            for(var i = 0; i < contacts[0].phoneNumbers.length; i++){
                phones.push(contacts[0].phoneNumbers[i].value);
            }
            alert(phones.join(" - "));            
        };

        function onError(contactError) {
            alert('onError!');
        };

        var options      = new ContactFindOptions();
        options.filter   = "m0m";
        options.multiple = true;
        options.hasPhoneNumber = true;
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccess, onError, options);
        */
    },
    
};
