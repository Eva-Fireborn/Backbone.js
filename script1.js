const User = Backbone.Model.extend ({
    defaults: {
        userName: '',
        loggedIn: false
    }
});

let user = new User ({});

const UserView = Backbone.View.extend ({
    initialize: function(){
        this.listenTo(this.model, 'change', this.render)
    },
    render: function(){
        let userName = this.model.get('userName');
        let loggedIn = this.model.get('loggedIn');
        let loginForm = `<input type="text" id="loginForm" placeholder="Användarnamn">`;
        let loginButton = `<button id="loginButton">Logga in</button>`;
        let logOutButton = `<button id="logOffButton">Logga ut</button>`
        let content = `<h1 id="headerName">Robotar i frack och andra robotar.se</h1>`;
        if (loggedIn){
            content+= `<div class="logInRuta"><p>Välkommen ${userName}!</p>${logOutButton}</div>`;
        } else {
            content+=`<div class="logInRuta"><p>Logga in</p>${loginForm}${loginButton}</div>`;
        }
        this.$el.html(content);
    },
    events: {
        "click #loginButton": 'login',
        "click #logOffButton": 'logOff'
    },
    login: function(){
        let name = $('#loginForm').val();
        this.model.set({loggedIn: true});
        this.model.set({userName: name});
    },
    logOff: function(){
        this.model.set({loggedIn: false});
    }
});

$(document).ready(function(){
    let userview = new UserView({
        model: user,
        el: '.login'
    });
    userview.render();

});