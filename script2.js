const Tabs = Backbone.Model.extend({
    defaults:{
        tab1: true,
        tab2: false,
        tab3: false,
        switchPic: false
    },
    tab1: function(){
        this.set({tab1: true});
        this.set({tab2: false});
        this.set({tab3: false});
    },
    tab2: function(){
        this.set({tab1: false});
        this.set({tab2: true});
        this.set({tab3: false});
    },
    tab3: function(){
        this.set({tab1: false});
        this.set({tab2: false});
        this.set({tab3: true});
    },
    nextButton: function(){
        let tab1 = this.get('tab1');
        let tab2 = this.get('tab2');
        if (tab1){
            this.tab2();
        } else if(tab2) {
            this.tab3();
        } else {
            this.tab1();
        }    
    },
    backButton: function(){
        let tab1 = this.get('tab1');
        let tab2 = this.get('tab2');
        if (tab1){
            this.tab3();
        } else if(tab2) {
            this.tab1();
        } else {
            this.tab2();
        }
    },
    switch: function(){
        let pic = this.get('switchPic');
        if (pic){
            this.set({switchPic: false});
        } else {
            this.set({switchPic: true});
        }
    }
});

let tabs = new Tabs({});

const HomeView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.model, 'change', this.render)
    },
    render: function(){
        let tab1 = this.model.get('tab1');
        let tab2 = this.model.get('tab2');
        let menu = `<ul id="TabsList"><li id="homeTab"> Finrobot </li> <li id="miniRobotTab"> Minirobot </li> <li id="blueTab"> Blå </li></ul>`;
        let menuButtons = `<button id="backButton">Föregående</button> <button id="nextButton">Nästa</button>`
        
        let html;
        if (tab1){
            let finrobotPic1 = `<img src="pics/Daft-Punk-Large.jpg" id="finrobotPic1" alt="Finrobot helbild"/>`;
            let finrobotPic2 = `<img src="pics/daftpunk_3346867b.jpg" id="finrobotPic2" alt="Finrobot närbild"/>`;
            let picButtons = `<button id="pastPic"><=</button> <button id="nextPic">=></button>`;
            let pic = this.model.get('switchPic');
            if (pic){
                html = `<div class="home">${menu}${menuButtons}<h2>Finrobot</h2>${finrobotPic1}${picButtons}<p>Vår finrobot passar för alla tillfällen.
                Finns i färgerna guld och silver. Höjd: 175 cm.</div>`;
            } else {
                html = `<div class="home">${menu}${menuButtons}<h2>Finrobot</h2>${finrobotPic2}${picButtons}<p>Vår finrobot passar för alla tillfällen.
                Finns i färgerna guld och silver. Höjd: 175 cm.</div>`;
            }
            
            this.$el.html(html);
        }
        else if(tab2){
            let minirobotPic1 = `<img src="pics/minirob.jpg" id="minirobotPic1" alt="Pocketrobot helbild"/>`;
            let minirobotPic2 = `<img src="pics/minirob2.jpg" id="minirobotPic2" alt="Pocketrobot närbild"/>`;
            let picButtons = `<button id="pastPic"><=</button> <button id="nextPic">=></button>`;
            let pic = this.model.get('switchPic');
            if (pic) {
                html = `<div class="minirobot">${menu}${menuButtons}<h2>Minirobot</h2>${minirobotPic1}${picButtons}<p>Vår minirobot passar i fickan och
                fungerar även som mobiltelefon. Finns i färgerna svart och vit. Höjd: 18 cm.</div>`;
            } else {
                html = `<div class="minirobot">${menu}${menuButtons}<h2>Minirobot</h2>${minirobotPic2}${picButtons}<p>Vår minirobot passar i fickan och
                fungerar även som mobiltelefon. Finns i färgerna svart och vit. Höjd: 18 cm.</div>`;
            }
            
            this.$el.html(html);
        } else {
            html = `<div class="blue">${menu}${menuButtons}<h2>Blå</h2></div>`;
            this.$el.html(html);
        }
    },
    events:{
        "click #homeTab": 'tab1',
        "click #miniRobotTab": 'tab2',
        "click #blueTab": 'tab3',
        "click #nextButton": 'nextButton',
        "click #backButton": 'backButton',
        "click #pastPic": 'switch',
        "click #nextPic": 'switch'
    },
    tab1: function(){
        this.model.tab1();
    },
    tab2: function(){
        this.model.tab2();
    },
    tab3: function(){
        this.model.tab3();
    },
    nextButton: function(){
        this.model.nextButton();
    },
    backButton: function(){
        this.model.backButton();
    },
    switch: function(){
        this.model.switch();
    }
});


$(document).ready(function(){
    let homeView = new HomeView({
        model: tabs,
        el: '.content'
    });
    homeView.render();

});