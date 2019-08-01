app.directive('dynamicForm', ['$q', '$parse', '$timeout', '$compile', '$interval', function($q, $parse, $timeout, $compile, $interval) {
    return {
        restrict: 'E',
        // compile: function(element) {
        //     element.replaceWith(angular.element('<span></span>'));
        // },
        link: function($scope, element, attrs) {
            var supported = {
                'checkbox': {
                    element: 'input',
                    type: 'checkbox',
                    editable: true,
                    textBased: false
                }
            }

            var newElement, model;

            $scope.property = {
                value: {
                    attributes: { //templates
                        template1: {
                            attributeType: 'checkbox',
                            type: 'checkbox',
                            isOn: true,
                            childPosition: 'inline',
                            model: 'sys.general.websockets.enabled',
                            value: 'someValue',
                            disabled: false
                        }
                    }
                }
            };

            $scope.stdFormData = {
                sys: {
                    general: {
                        websockets: {
                            enabled: true
                        }
                    }
                }
            };

            if (angular.isDefined(attrs.template)) {
                $q.when(
                    $parse(attrs.template)($scope)
                    )
                    .then(function(template){
                        // setTemplateData();
                        // $scope.setTemplateData();

                        $scope.setTemplateData = function() {
                            console.log('setTemplateData')
                            model = $parse(attrs.ngModel)($scope);
                            // console.log('model:', model);
                            var timerID = setInterval(function() {
                            // var timerID = $interval(function(){
                                console.log('interval')

                                clearInterval(timerID);
                                // $interval.cancel(timerID);
                                angular.forEach(template, function(field, id) {
                                    console.log('field-id: ', field, id);
                                    newElement = angular.element('<' + supported[field.attributeType].element + '></' + supported[field.attributeType].element + '>');

                                    if (angular.isDefined(supported[field.attributeType].type)) {
                                        newElement.attr('type', supported[field.attributeType].type);
                                    }

                                    if (angular.isDefined(supported[field.attributeType].editable) && supported[field.attributeType].editable) {
                                        newElement.attr('name', field.model);
                                        newElement.attr('class', 'required-dynamic');

                                        if (angular.isDefined(field.value)) {
                                            //Purshottam : to add dynamic model
                                            model[field.model] = angular.copy(field.value);
                                            newElement.attr('value', field.value);
                                        }
                                    }

                                    if (field.attributeType === 'BOOL' || field.attributeType === 'checkbox') {
                                        if (angular.isDefined(field.isOn)) {
                                            newElement.attr('ng-true-value', field.isOn);
                                        }
                                    }

                                    element.append(newElement);
                                    newElement = null;
                                });

                                (function() {
                                    newElement = angular.element('<ng-form name="dynaForm"></ng-form>');

                                    angular.forEach(attrs.$attr, function(attName, attIndex) {
                                        newElement.attr(attName, attrs[attIndex]);
                                    });
                                    newElement.attr('model', attrs.ngModel);
                                    newElement.removeAttr('ng-model');
                                    angular.forEach(element[0].classList, function(clsName) {
                                        newElement[0].classList.add(clsName);
                                    });
                                    newElement.addClass('dynamic-form');
                                    newElement.append(element.contents());
                                    newElement.data('$_cleanModel', angular.copy(model));
                                    newElement.bind('reset', function() {
                                        $timeout(function() {
                                            $scope.$broadcast('reset', arguments);
                                        }, 0);
                                    });
                                    if (angular.isDefined($scope.updatedModelData)) {
                                        $scope.updatedModelData.push(newElement.data('$_cleanModel'));
                                    }

                                    $scope.$on('reset', function(e, index) {
                                        $scope.$parent.isDiscarded = true;
                                        $scope.stdFormData[index] = {};
                                        $scope.stdFormData[index] = angular.copy($scope.updatedModelData[index]);
                                        console.log('formdata', $scope.stdFormData[index]);
                                        return false;
                                    });

                                    $compile(newElement)($scope);

                                    console.log('real newElement', newElement);
                                    // console.log('real COMPILE', element.replaceWith(newElement));
                                    var x = element.replaceWith(newElement);
                                    console.log('x', x);


                                }());

                            }, 100);

                        

                        }

                        $scope.setTemplateData();
                    
                }) ;
            }
        }
    };
}]);