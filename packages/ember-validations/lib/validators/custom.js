Ember.Validations.validators.local.Custom = Ember.Validations.validators.Base.extend({
    init: function() {
        this._super();

        if (this.options.message === undefined) {
            this.set('options.message', Ember.Validations.messages.render('invalid', this.options));
        }
    },
    to: true,
    call: function() {
        var self = this;
        var throttleTime = self.options['throttleTime'] || 500;
        throttle = function(func, delay) {
            if (self.get('to')) {
                window.clearTimeout(self.get('to'));
            }
            self.set('to', window.setTimeout(func, delay));
        };

        var promiseValidator = self.options['promiseValidator'];
        if (typeof promiseValidator === 'function') {
            throttle(function() {
                promiseValidator(self.model).then(function(isValid) {
                    if (!isValid) {
                        self.errors.pushObject(self.options.message);
                    }
                });
            }, throttleTime);
            return;
        }
        var myValidator = this.options['myValidator'];
        if (typeof myValidator === 'function' && !myValidator(this.model)) {
            this.errors.pushObject(this.options.message);
        }
    }
});