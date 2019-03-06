const tabModelList = ['firstTab', 'secondTab', 'thirdTab'];
const tabContent = [
    '<h2>Finrobot</h2><p>Vår finrobot passar för alla tillfällen. Finns i färgerna guld och silver. Höjd: 175 cm.',
    '<h2>Minirobot</h2><p>Vår minirobot passar i fickan och fungerar även som mobiltelefon. Finns i färgerna svart och vit. Höjd: 18 cm.',
    '<h2>Djurrobot</h2><p>Vår djurrobot passar i fickan och fungerar även som mobiltelefon. Finns i färgerna svart och vit. Höjd: 18 cm.'  
];
const firstPicture = [
    '<img src="pics/Daft-Punk-Large.jpg" id="finrobotPic1" alt="Finrobot helbild"/>',
    '<img src="pics/minirob.jpg" id="minirobotPic1" alt="Pocketrobot helbild"/>',
    '<img src="pics/minirob.jpg" id="minirobotPic1" alt="Pocketrobot helbild"/>'
];
const secondPicture = [
    '<img src="pics/daftpunk_3346867b.jpg" id="finrobotPic2" alt="Finrobot närbild"/>',
    '<img src="pics/minirob2.jpg" id="minirobotPic2" alt="Pocketrobot närbild"/>',
    '<img src="pics/minirob2.jpg" id="minirobotPic2" alt="Pocketrobot närbild"/>'
];

const TabModel = Backbone.Model.extend({
    defaults:{
        index: 0,
        pictureOne: true
    },
    nextButton: function(){
        let newIndex = this.get('index');
        if(newIndex === tabModelList.length -1){
            this.set({index: 0});
        } else {
            newIndex++;
            this.set({index: newIndex});
        }
    },
    backButton: function(){
        let newIndex = this.get('index');
        let tabLength = tabModelList.length -1;
        if(newIndex <= 0){
            this.set({index: tabLength});
        } else {
            newIndex--;
            this.set({index: newIndex});
        }
    },
    switchTab: function (event){
        let newTab = event.target.id;
        this.set({index: newTab});
    },
    switchPicture: function(){
        let value = this.get('pictureOne');
        if (value) {
            this.set({pictureOne: false});
        } else {
            this.set({pictureOne: true});
        }
    }
});
let tabModel = new TabModel({});

const TabView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.model, 'change', this.render)
    },
    render: function(){
        let html;
        let index = this.model.get('index');
        let pictureOne = this.model.get('pictureOne');
        let menu = `<ul id="TabsList"><li id="0"> Finrobot </li> <li id="1"> Minirobot </li> <li id="2"> Djurrobot </li></ul>`;
        let menuButtons = `<button id="backButton">Föregående</button> <button id="nextButton">Nästa</button>`
        let picButtons = `<button id="pastPic"><=</button> <button id="nextPic">=></button>`;
        if (pictureOne){
            html = `${menu}${menuButtons}${tabContent[index]}${firstPicture[index]}${picButtons}`;
        } else {
            html = `${menu}${menuButtons}${tabContent[index]}${secondPicture[index]}${picButtons}`;
        }
        this.$el.html(html);
    },
    events: {
        "click #TabsList": 'switchTab',
        "click #nextButton": 'nextButton',
        "click #backButton": 'backButton',
        "click #pastPic": 'switchPicture',
        "click #nextPic": 'switchPicture'
    },
    switchTab: function(event){
        this.model.switchTab(event);
    },
    nextButton: function(){
        this.model.nextButton();
    },
    backButton: function(){
        this.model.backButton();
    },
    switchPicture: function(){
        this.model.switchPicture();
    }    
});


$(document).ready(function(){

    let tabView = new TabView({
        model: tabModel,
        el: '.tabContainer'
    });
    tabView.render();

});