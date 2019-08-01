
describe('A suite for dynamic form directive', function() {
    beforeEach(module('bookApp'));

    var $rootScope, $compile, scope, element, $httpBackend;

    beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        $httpBackend
            .when('GET', '/partials/books.html')
            .respond();

        scope.property = {
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

        scope.stdFormData = {
            sys: {
                general: {
                    websockets: {
                        enabled: true
                    }
                }
            }
        };

        element = $compile('<div><dynamic-form template="property.value.attributes" ng-model="stdFormData"></dynamic-form></div>')(scope);
        scope.$digest();
        console.log('TEST element:', element);
        console.log('angular version: ', angular.version)
        console.log('jasmine version: ', jasmine.version);
    }));

    it('should print compiled element', function() {
        // console.log('compiled element: ', element);
    })
});