describe('Suite for bookTooltip directive', function() {
    var $compile, $rootScope, $httpBackend, $templateCache, parentScope, element;

    beforeEach(module('bookApp'),
        // function() {
            // module('bookApp')
            module('partials/tooltiptemplate.html')
        // }
    );

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$templateCache_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $templateCache = _$templateCache_;
        parentScope = $rootScope.$new();

        $templateCache.put(
            'partials/tooltiptemplate.html',
            '<div>Here goes the template</div>'
        );

        $httpBackend
            .when('GET', '/partials/books.html')
            .respond(
                $templateCache.get('partials/tooltiptemplate.html')
            );

        parentScope.sumx = 1;

        element = $compile("<book-tooltip templatename='tooltiptemplate'></book-tooltip>")(parentScope);
        parentScope.$digest();
        // console.log(element);
        // console.log(parentScope.sumx);
    }));

    it('should SOMETHING', function() {
        expect(2+2).toBe(4);
    });
});