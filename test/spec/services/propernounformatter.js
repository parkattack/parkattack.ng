'use strict';

describe('Service: ProperNounFormatter', function () {

  // load the service's module
  beforeEach(module('parkattackgithubioApp'));

  // instantiate service
  var ProperNounFormatter;
  beforeEach(inject(function (_ProperNounFormatter_) {
    ProperNounFormatter = _ProperNounFormatter_;
  }));

  it('should do something', function () {
    expect(!!ProperNounFormatter).toBe(true);
  });

});
