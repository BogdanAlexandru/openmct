/*global define, WebSocket*/

define([], function () {
    "use strict";

    function FloorbotTelemetryServerAdapter($q, wsUrl) {
        var ws = new WebSocket(wsUrl),
            dictionary = $q.defer();

        // Handle an incoming message from the server
        ws.onmessage = function (event) {
            console.log(event.data);
            var message = JSON.parse(event.data);

            switch (message.type) {
                case "dictionary":
                    dictionary.resolve(message.value);
                    break;
            }
        };

        // Request dictionary once connection is established
        ws.onopen = function () {
            ws.send("dictionary");
        };

        return {
            dictionary: function () {
                return dictionary.promise;
            }
        };
    }

    return FloorbotTelemetryServerAdapter;
});