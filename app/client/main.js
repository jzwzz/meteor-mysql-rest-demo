import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
Template.buttons.events({
  'click button'(event, instance) {

    var dataObject = {}

    Meteor.call("clientSideHello", dataObject, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log("result1:", result)
      }

      console.log("result2:", result)

    });
  },
});
