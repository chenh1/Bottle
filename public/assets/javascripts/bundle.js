
(function(){
    var app = angular.module("bottle", [], function($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * Fix for serialization: converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    });

    app.controller("MainContent", ['$http', function($http){
        var content = this;
        content.comments = [];

        setInterval(function() {
            $http.get('/comments').success(function (data) {
                content.comments = data;
            });
        }, 2000);

    }]);

    app.controller("CommentController", ['$http', function($http){
        this.comment = {};
        this.addComment = function(){
            console.log(this.comment);
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http({
                method: 'POST',
                url: '/comments',
                data: {'name':this.comment.name, 'comment':this.comment.comment}
            });
            this.comment = {}
        };
    }]);

})();

$(document).ready(function(){

    $.get('/restaurants', consoleToLog);

    function consoleToLog(restaurants){
        console.log(restaurants);
    }

    $("#btn1").click(function() {
        $.ajax({
            type: 'post',
            url: '/restaurants',
            data: {
                "name":"Houston's",
                "description":"#4"
            }
        }).done(function(restName){
            console.log(restName);
            $.get('/restaurants', consoleToLog);
        });
    });

    $("#btn2").click(function() {
        $.ajax({
            type: 'post',
            url: '/restaurants',
            data: {
                "name":"Fleming's",
                "description":"#5"
            }
        }).done(function(restName){
            console.log(restName);
            $.get('/restaurants', consoleToLog);
        });
    });

    $("#btn3").click(function() {
        $.ajax({
            type: 'post',
            url: '/restaurants',
            data: {
                "name":"Mastro's",
                "description":"#6"
            }
        }).done(function(restName){
            console.log(restName);
            $.get('/restaurants', consoleToLog);
        });
    });

    //    })
    //    MongoClient.connect(url, function(err, db) {
    //        assert.equal(null, err);
    //        insertDocument(db, "Houston's", function() {
    //            //db.close();
    //        });
    //    });
    //});
    //$("#btn2").click(function(){
    //    MongoClient.connect(url, function(err, db) {
    //        assert.equal(null, err);
    //        insertDocument(db, "Fleming's", function() {
    //            //db.close();
    //        });
    //    });
//
    //});
    //$("#btn3").click(function(){
    //    MongoClient.connect(url, function(err, db) {
    //        assert.equal(null, err);
    //        insertDocument(db, "Mastros's", function() {
    //            //db.close();
    //        });
    //    });
//
    //});
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1bmRsZS5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYm90dGxlXCIsIFtdLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7XG4gICAgICAgIC8vIFVzZSB4LXd3dy1mb3JtLXVybGVuY29kZWQgQ29udGVudC1UeXBlXG4gICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wb3N0WydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpeCBmb3Igc2VyaWFsaXphdGlvbjogY29udmVydHMgYW4gb2JqZWN0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBzZXJpYWxpemF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBwYXJhbSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9ICcnLCBuYW1lLCB2YWx1ZSwgZnVsbFN1Yk5hbWUsIHN1Yk5hbWUsIHN1YlZhbHVlLCBpbm5lck9iaiwgaTtcblxuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9iaikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJWYWx1ZSA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFN1Yk5hbWUgPSBuYW1lICsgJ1snICsgaSArICddJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck9ialtmdWxsU3ViTmFtZV0gPSBzdWJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IHBhcmFtKGlubmVyT2JqKSArICcmJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHN1Yk5hbWUgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlZhbHVlID0gdmFsdWVbc3ViTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsU3ViTmFtZSA9IG5hbWUgKyAnWycgKyBzdWJOYW1lICsgJ10nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJPYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqW2Z1bGxTdWJOYW1lXSA9IHN1YlZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gcGFyYW0oaW5uZXJPYmopICsgJyYnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgKyAnJic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxdWVyeS5sZW5ndGggPyBxdWVyeS5zdWJzdHIoMCwgcXVlcnkubGVuZ3RoIC0gMSkgOiBxdWVyeTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBPdmVycmlkZSAkaHR0cCBzZXJ2aWNlJ3MgZGVmYXVsdCB0cmFuc2Zvcm1SZXF1ZXN0XG4gICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMudHJhbnNmb3JtUmVxdWVzdCA9IFtmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNPYmplY3QoZGF0YSkgJiYgU3RyaW5nKGRhdGEpICE9PSAnW29iamVjdCBGaWxlXScgPyBwYXJhbShkYXRhKSA6IGRhdGE7XG4gICAgICAgIH1dO1xuICAgIH0pO1xuXG4gICAgYXBwLmNvbnRyb2xsZXIoXCJNYWluQ29udGVudFwiLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xuICAgICAgICB2YXIgY29udGVudCA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnQuY29tbWVudHMgPSBbXTtcblxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwLmdldCgnL2NvbW1lbnRzJykuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuY29tbWVudHMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgfV0pO1xuXG4gICAgYXBwLmNvbnRyb2xsZXIoXCJDb21tZW50Q29udHJvbGxlclwiLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xuICAgICAgICB0aGlzLmNvbW1lbnQgPSB7fTtcbiAgICAgICAgdGhpcy5hZGRDb21tZW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29tbWVudCk7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLnBvc3RbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiO1xuICAgICAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9jb21tZW50cycsXG4gICAgICAgICAgICAgICAgZGF0YTogeyduYW1lJzp0aGlzLmNvbW1lbnQubmFtZSwgJ2NvbW1lbnQnOnRoaXMuY29tbWVudC5jb21tZW50fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSB7fVxuICAgICAgICB9O1xuICAgIH1dKTtcblxufSkoKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgICQuZ2V0KCcvcmVzdGF1cmFudHMnLCBjb25zb2xlVG9Mb2cpO1xuXG4gICAgZnVuY3Rpb24gY29uc29sZVRvTG9nKHJlc3RhdXJhbnRzKXtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdGF1cmFudHMpO1xuICAgIH1cblxuICAgICQoXCIjYnRuMVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJy9yZXN0YXVyYW50cycsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJIb3VzdG9uJ3NcIixcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCIjNFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzdE5hbWUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdE5hbWUpO1xuICAgICAgICAgICAgJC5nZXQoJy9yZXN0YXVyYW50cycsIGNvbnNvbGVUb0xvZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChcIiNidG4yXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnL3Jlc3RhdXJhbnRzJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkZsZW1pbmcnc1wiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIiM1XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXN0TmFtZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN0TmFtZSk7XG4gICAgICAgICAgICAkLmdldCgnL3Jlc3RhdXJhbnRzJywgY29uc29sZVRvTG9nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKFwiI2J0bjNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICcvcmVzdGF1cmFudHMnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiTWFzdHJvJ3NcIixcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCIjNlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzdE5hbWUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdE5hbWUpO1xuICAgICAgICAgICAgJC5nZXQoJy9yZXN0YXVyYW50cycsIGNvbnNvbGVUb0xvZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gICAgfSlcbiAgICAvLyAgICBNb25nb0NsaWVudC5jb25uZWN0KHVybCwgZnVuY3Rpb24oZXJyLCBkYikge1xuICAgIC8vICAgICAgICBhc3NlcnQuZXF1YWwobnVsbCwgZXJyKTtcbiAgICAvLyAgICAgICAgaW5zZXJ0RG9jdW1lbnQoZGIsIFwiSG91c3RvbidzXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAgLy9kYi5jbG9zZSgpO1xuICAgIC8vICAgICAgICB9KTtcbiAgICAvLyAgICB9KTtcbiAgICAvL30pO1xuICAgIC8vJChcIiNidG4yXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgTW9uZ29DbGllbnQuY29ubmVjdCh1cmwsIGZ1bmN0aW9uKGVyciwgZGIpIHtcbiAgICAvLyAgICAgICAgYXNzZXJ0LmVxdWFsKG51bGwsIGVycik7XG4gICAgLy8gICAgICAgIGluc2VydERvY3VtZW50KGRiLCBcIkZsZW1pbmcnc1wiLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgIC8vZGIuY2xvc2UoKTtcbiAgICAvLyAgICAgICAgfSk7XG4gICAgLy8gICAgfSk7XG4vL1xuICAgIC8vfSk7XG4gICAgLy8kKFwiI2J0bjNcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAvLyAgICBNb25nb0NsaWVudC5jb25uZWN0KHVybCwgZnVuY3Rpb24oZXJyLCBkYikge1xuICAgIC8vICAgICAgICBhc3NlcnQuZXF1YWwobnVsbCwgZXJyKTtcbiAgICAvLyAgICAgICAgaW5zZXJ0RG9jdW1lbnQoZGIsIFwiTWFzdHJvcydzXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAgLy9kYi5jbG9zZSgpO1xuICAgIC8vICAgICAgICB9KTtcbiAgICAvLyAgICB9KTtcbi8vXG4gICAgLy99KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
