var should = require('should');

var $body, $iframe = $('<iframe/>').appendTo('body');
describe('Custom Widget', function() {
    beforeEach(function(done) {
        $iframe.attr('src', '/test/custom-widget.html')
            .one('load', function() {
                $body = $(this.contentDocument.body);
                done();
            });
    });

    it('should be ready', function() {
        $body.find('[data-gittip-username]').data('gittip-readystatus').should.equal('ready');
    });

    it('should have the usual values', function() {
        $body.find('.gittip-username').text().should.not.equal('');
        $body.find('.gittip-profile-link').attr('href').should.not.equal('');
        $body.find('.gittip-identity').text().should.not.equal('');
        $body.find('.gittip-giving').text().should.not.equal('');
        $body.find('.gittip-receiving').text().should.not.equal('');
        $body.find('.gittip-goal').text().should.not.equal('');
    });
});
