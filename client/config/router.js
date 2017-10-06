
FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/pageOne');
    }
});

FlowRouter.route('/pageOne', {
    action: function() {
        BlazeLayout.render("adminLayout", {content: "pageOne"});
    }
});

FlowRouter.route('/pageTwo', {
    action: function() {
        BlazeLayout.render("adminLayout", {content: "pageTwo"});
    }
});