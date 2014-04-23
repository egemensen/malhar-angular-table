'use strict';

describe('Directive: apTableSelector', function () {

  var element, scope, rootScope, isoScope, compile, sandbox, selected, row, column;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    
    // define mock objects here
  });

  // load the directive's module
  beforeEach(module('andyperlitch.apTable', function($provide) {
    // Inject dependencies like this:
    // $provide.value('', mockThing);

  }));

  beforeEach(inject(function ($compile, $rootScope) {
    // Cache these for reuse    
    rootScope = $rootScope;
    compile = $compile;

    // Other setup, e.g. helper functions, etc.

    // Set up the outer scope
    scope = $rootScope.$new();
    scope.selected = selected = [];
    scope.row = row = { id: 1 };
    scope.column = column = { key: 'id' };

    // Define and compile the element
    element = angular.element('<div ap-table-selector></div>');
    element = compile(element)(scope);
    scope.$digest();
    isoScope = element.isolateScope();
  }));

  afterEach(function() {
    sandbox.restore();
  });

  describe('the click event', function() {
    var e;
    beforeEach(function() {
      e = $.Event('click');
    });

    it('should add row[column.key] to the selected array if it is not present already', function() {
      $(element).trigger(e);
      scope.$digest();
      expect(selected).to.contain(row[column.key]);
    });

    it('should remove row[column.key] from the selected array if it is present', function() {
      selected.push(row[column.key]);
      $(element).trigger(e);
      scope.$digest();
      expect(selected).not.to.contain(row[column.key]);
    });

  });

});