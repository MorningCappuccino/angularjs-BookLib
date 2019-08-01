app.directive('bookTooltip', bookTooltip);

function bookTooltip() {
    return {
        link: tooltipLinkFunc,
        restrict: 'EA',
        templateUrl: getTemplateUrl
    }
}

function getTemplateUrl(elem, attrs) {
    // console.log('REAL', elem, attrs);
    return 'partials/' + attrs.templatename + '.html';
}

function tooltipLinkFunc($scope, element, attrs) {
    // console.log('liiiiink');
    $scope.sum = 333;
}