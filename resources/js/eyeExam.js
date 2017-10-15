angular.module('app', ['tabsNG','AnnYangNG'])
    .controller('EyeExam', ['$scope', 'AnnyangService', function($scope, AnnYang) {
        var levelFont=["200px","160px","125px","100px","80px","63px","50px","32px","25px","20px","16px","12.5px","10px"]
        var allLetter = ["C", "D", "E", "F", "L", "N", "O", "P", "T", "Z"];
        var lastLetterIndex;
        var testOn=true;

        $scope.level=-1;
        $scope.correctCounter=0;
        $scope.nextLetter=function(voiceLetter){
            if ($scope.letter==voiceLetter) {
                $scope.correctCounter++;
                console.log("correct");
            }
            var letterIndex=Math.floor(Math.random() * allLetter.length);
            if (letterIndex==lastLetterIndex) letterIndex=(letterIndex+1)%allLetter.length;
            $scope.letter = allLetter[letterIndex];
            lastLetterIndex=letterIndex;
            $scope.level++;

            if ($scope.level%5==0) {
                console.log('{"font-size":"'+levelFont[Math.floor($scope.level/5)]+'"}');
                $scope.variableSize={'font-size':getSize()};
            }
        };

        var getSize=function(){
            return levelFont[Math.floor($scope.level/5)];
        };

        $scope.toggleStart=function(){
            testOn=!testOn;
            if (testOn)
                AnnYang.start();
            else
                AnnYang.stop();
        }


        $scope.nextLetter('A');

        var vm = this;

        vm.init = function() {
            vm.clearResults();

            AnnYang.addCommand('*allSpeech', function(allSpeech) {
                console.log(allSpeech);
                if (allSpeech.length==1) {
                    console.log("one letter");
                    $scope.nextLetter(allSpeech.toUpperCase());
                }
                letterPhrase=/[lL]etter [A-Za-z]\b/;
                if (letterPhrase.test(allSpeech)) {
                    console.log("letter phrase");
                    $scope.nextLetter(allSpeech.substring(allSpeech.indexOf("letter"))[7].toUpperCase());
                }

            });
            AnnYang.start();
            //$scope.toggleStart();
        };

        vm.clearResults = function() {
            vm.results = [];
        };

        vm.init();

    }]);