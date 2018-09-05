try {
    (function() {
        var tag = angular.module("tagEditor", []);

        tag.controller("addContainer", function($scope) {

            function editTag() {
                document.activeElement.previousSibling.previousSibling.previousElementSibling.style.display = 'block';
                document.activeElement.previousSibling.previousSibling.remove();
                document.activeElement.previousSibling.remove();
                document.activeElement.remove();
            }

            function removeTag() {
                var parentEleId = document.activeElement.parentNode.id;
                document.getElementById(parentEleId+'').remove();
            }

            document.addEventListener("keypress", function(e) {
                if (e.keyCode == 13) {
                    var idEnt = e.path[0].id+"";
                    document.getElementById(idEnt).style.display = 'none';

                    var parentEleId = document.getElementById(idEnt).parentNode.id;

                    var userVal = document.createElement('div');
                    userVal.innerHTML = e.path[0].value;
                    userVal.style.textAlign = 'center';

                    var editBtn = document.createElement('button');
                    editBtn.innerHTML = 'Edit';
                    editBtn.setAttribute('class', 'btnCenter');
                    editBtn.onclick = editTag;

                    var closeIcon = document.createElement('button');
                    closeIcon.setAttribute('class', 'glyphicon glyphicon-remove removeBtn');
                    closeIcon.onclick = removeTag;

                    document.getElementById(parentEleId).appendChild(closeIcon);
                    document.getElementById(parentEleId).appendChild(userVal);
                    document.getElementById(parentEleId).appendChild(editBtn);
                }
            })
        })

        tag.directive("addBtn", function() {
            return {
                restrict : "E",
                template : "<button class='glyphicon glyphicon-plus btnClr' add-event > </button>"
            }
        })

        tag.directive("addEvent", function($compile) {
            return  function(scope, element, attrs) {
                element.bind("click", function() {
                    scope.randomId = Math.random();
                    scope.inputId = 'textBox'+scope.randomId;
                    scope.boxId = scope.inputId+1;
                    var createdEle = angular.element(($compile("<span class='tagClr' id="+scope.boxId+"> <input id="+scope.inputId+" type='text' placeholder='Enter Tag Name'/> </span>"))(scope));
                    
                    element.parent().parent()[0].before(createdEle[0]);
                })
            }
        })
    })();
} catch(err) {
    console.error("module err:", err);
}
