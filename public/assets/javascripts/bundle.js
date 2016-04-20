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
        var yay = "123";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYm90dGxlXCIsIFtdLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7XG5cbiAgICAgICAgLy8gVXNlIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBDb250ZW50LVR5cGU7IEFuZ3VsYXIgdHJhbnNtaXRzIGRhdGEgdXNpbmcgYXBwbGljYXRpb24vanNvblxuICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucG9zdFsnQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbmd1bGFyIGZpeCBmb3Igc2VyaWFsaXphdGlvbjogY29udmVydHMgYW4gb2JqZWN0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBzZXJpYWxpemF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBwYXJhbSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9ICcnLCBuYW1lLCB2YWx1ZSwgZnVsbFN1Yk5hbWUsIHN1Yk5hbWUsIHN1YlZhbHVlLCBpbm5lck9iaiwgaTtcblxuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9iaikgeyAgICAgLyoqIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHByb3BlcnR5IG9mIHRoZSBvYmplY3QgKi9cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqOiBcIiwgb2JqKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlOiBcIiwgdmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHsgICAgICAgICAgIC8qKiBEb2VzIHZhbHVlJ3MgcHJvdG90eXBlIGVxdWF0ZSB0byBBcnJheSdzIHByb3RvdHlwZT8gKi9cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJWYWx1ZSA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFN1Yk5hbWUgPSBuYW1lICsgJ1snICsgaSArICddJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck9ialtmdWxsU3ViTmFtZV0gPSBzdWJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IHBhcmFtKGlubmVyT2JqKSArICcmJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgeyAgICAgLyoqIERvZXMgdmFsdWUncyBwcm90b3R5cGUgZXF1YXRlIHRvIE9iamVjdCdzIHByb3RvdHlwZT8gKi9cbiAgICAgICAgICAgICAgICAgICAgZm9yIChzdWJOYW1lIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJWYWx1ZSA9IHZhbHVlW3N1Yk5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFN1Yk5hbWUgPSBuYW1lICsgJ1snICsgc3ViTmFtZSArICddJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck9ialtmdWxsU3ViTmFtZV0gPSBzdWJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IHBhcmFtKGlubmVyT2JqKSArICcmJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7ICAgLyoqIFRoaXMgd2lsbCBleGVjdXRlIGluIG91ciBhcHBsaWNhdGlvbiBzaW5jZSBpbnB1dHMgYXJlIHN0cmluZ3MgKi9cbiAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSArICcmJztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJxdWVyeTogXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxdWVyeS5sZW5ndGggPyBxdWVyeS5zdWJzdHIoMCwgcXVlcnkubGVuZ3RoIC0gMSkgOiBxdWVyeTsgICAgLyoqIFJldHVybnMgY29uY2F0ZW5hdGVkIHN0cmluZyAqL1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIE92ZXJyaWRlICRodHRwIHNlcnZpY2UncyBkZWZhdWx0IHRyYW5zZm9ybVJlcXVlc3RcbiAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy50cmFuc2Zvcm1SZXF1ZXN0ID0gW2Z1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc09iamVjdChkYXRhKSAmJiBTdHJpbmcoZGF0YSkgIT09ICdbb2JqZWN0IEZpbGVdJyA/IHBhcmFtKGRhdGEpIDogZGF0YTtcbiAgICAgICAgfV07XG4gICAgfSk7XG5cbiAgICBhcHAuY29udHJvbGxlcihcIk1haW5Db250ZW50XCIsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcztcbiAgICAgICAgY29udGVudC5jb21tZW50cyA9IFtdO1xuXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvY29tbWVudHMnKS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29udGVudC5jb21tZW50cyA9IGRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMjAwMCk7XG5cbiAgICB9XSk7XG5cbiAgICBhcHAuY29udHJvbGxlcihcIkNvbW1lbnRDb250cm9sbGVyXCIsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5jb21tZW50ID0ge307XG4gICAgICAgIHRoaXMuYWRkQ29tbWVudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbW1lbnQpO1xuICAgICAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9jb21tZW50cycsXG4gICAgICAgICAgICAgICAgZGF0YTogeyduYW1lJzp0aGlzLmNvbW1lbnQubmFtZSwgJ2NvbW1lbnQnOnRoaXMuY29tbWVudC5jb21tZW50LCAnbG9hZFR5cGUnOidhZGRDb21tZW50J31cbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICBjb250ZW50LmNvbW1lbnRzID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSB7fVxuICAgICAgICB9O1xuICAgIH1dKTtcblxufSkoKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgICQoXCIubGlzdENvbnRhaW5lclwiKS5vbihcImNsaWNrXCIsIFwiLmRlbEJ0blwiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY29tbWVudGlkID0gJCh0aGlzKS5hdHRyKFwiY29tbWVudGlkXCIpO1xuICAgICAgICB2YXIgeWF5ID0gXCIxMjNcIjtcbiAgICAgICAgY29uc29sZS5sb2coY29tbWVudGlkKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2NvbW1lbnRzJyxcbiAgICAgICAgICAgIGRhdGE6IHsnY29tbWVudGlkJzpjb21tZW50aWQsICdsb2FkVHlwZSc6J2RlbGV0ZUNvbW1lbnQnfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJIGRpZCBpdCFcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
