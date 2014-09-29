Ember.Validations.validators.local.Custom = Ember.Validations.validators.Base.extend({
  init: function() {
    this._super();

    if (this.options.message === undefined) {
      this.set('options.message',  Ember.Validations.messages.render('invalid', this.options));
    }
  },
  call: function() {
    var self = this;
    var myValidator = this.options['myValidator'];
    if (typeof myValidator.then === 'function' ) {
      myValidator(this.model).then(function(isValid){
        if (!isValid) {
          self.errors.pushObject(self.options.message);
        }
      });
      return;
    }
    if (typeof myValidator === 'function' && !myValidator(this.model)) {
      this.errors.pushObject(this.options.message);
    }
  }
});

