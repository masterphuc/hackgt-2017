angular.module('AnnYangNG', [])
    .factory('AnnyangService', function($rootScope){
        var service = {};

        // COMMANDS
        service.commands = {};

        service.addCommand = function(phrase, callback) {
            var command = {};

            // Wrap annyang command in scope apply
            command[phrase] = function(args) {
                $rootScope.$apply(callback(args));
            };

            // Extend our commands list
            angular.extend(service.commands, command);

            // Add the commands to annyang
            annyang.addCommands(service.commands);
            console.debug('added command "' + phrase + '"', service.commands);
        };

        service.start = function() {
            annyang.addCommands(service.commands);
            annyang.debug(true);
            annyang.start();
        };

        service.stop = function() {
            annyang.abort();
        };


        return service;

    });


