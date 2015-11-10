(function(){
    var app = angular.module("bottle", [], function($httpProvider) {

        // Use x-www-form-urlencoded Content-Type; Angular transmits data using application/json
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * Angular fix for serialization: converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {     /** Iterate through each property of the object */
                value = obj[name];

                console.log("obj: ", obj);
                console.log("value: ", value);

                if (value instanceof Array) {           /** Does value's prototype equate to Array's prototype? */
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {     /** Does value's prototype equate to Object's prototype? */
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {   /** This will execute in our application since inputs are strings */
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    console.log("query: ", query);
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;    /** Returns concatenated string */
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
        var content = this;
        this.comment = {};
        this.addComment = function(){
            console.log(this.comment);
            $http({
                method: 'POST',
                url: '/comments',
                data: {'name':this.comment.name, 'comment':this.comment.comment, 'loadType':'addComment'}
            }).then(function(res){
                content.comments = res;
            });
            this.comment = {}
        };
    }]);

})();

$(document).ready(function(){

    $(".listContainer").on("click", ".delBtn", function(){
        var commentid = $(this).attr("commentid");
        console.log(commentid);
        $.ajax({
            method: 'POST',
            url: '/comments',
            data: {'commentid':commentid, 'loadType':'deleteComment'},
            dataType: 'json',
            success: function(){
                console.log(this.data);
                console.log("I did it!");
            },
            error: function(){
                console.log("Failed");
            }
        })
    });

});
