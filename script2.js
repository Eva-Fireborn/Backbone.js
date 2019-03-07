const tabModelList = ['Finrobot', 'Minirobot', 'Djurrobot'];
const tabContent = [
    '<h2>Finrobot</h2><p class="tabParagraph">Vår finrobot passar för alla tillfällen. Finns i färgerna guld och silver. Höjd: 175 cm.</p>',
    '<h2>Minirobot</h2><p class="tabParagraph">Vår minirobot passar i fickan och fungerar även som mobiltelefon. Finns i färgerna svart och vit. Höjd: 18 cm.</p>',
    '<h2>Djurrobot</h2><p class="tabParagraph">Vår hundrobot G-dog kan klara allt och lite till. Den behöver till och med matas med olja för att smörja lederna. Finns i färgerna svart, gul och brun. Höjd: 30 cm.</p>'  
];
const firstPicture = [
    '<img src="pics/Daft-Punk-Large.jpg" id="finrobotPic1" alt="Finrobot helbild"/>',
    '<img src="pics/minirob.jpg" id="minirobotPic1" alt="Pocketrobot helbild"/>',
    '<img src="pics/robothund1.jpg" id="hundrobotPic1" alt="hundrobot höger profil"/>'
];
const secondPicture = [
    '<img src="pics/daftpunk_3346867b.jpg" id="finrobotPic2" alt="Finrobot närbild"/>',
    '<img src="pics/minirob2.jpg" id="minirobotPic2" alt="Pocketrobot närbild"/>',
    '<img src="pics/robothund2.jpg" id="hundrobotPic2" alt="hundrobot vänster profil"/>'
];


const TabMenu = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.model, 'change', this.render)
    },
    render: function(){
        let html = '<ul id="TabsList">';
        let index = this.model.get('index');
        for (let i=0; i < tabModelList.length; i++){
            if (index === i){
                html += `<li id="${i}" class="displayedTab">`
            } else {
                html += `<li id="${i}">`
            }
            html += `${tabModelList[i]}</li>`
        }
        html += `</ul><button id="backButton">Föregående flik</button> <button id="nextButton">Nästa flik</button>`
        this.$el.html(html);
    },
    events:{
        "click #TabsList": 'switchTab',
        "click #nextButton": 'nextButton',
        "click #backButton": 'backButton'
    },
    switchTab: function(event){
        this.model.switchTab(event);
    },
    nextButton: function(){
        this.model.nextButton();
    },
    backButton: function(){
        this.model.backButton();
    }
})
const TabView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.model, 'change', this.render)
    },
    render: function(){
        let html;
        let index = this.model.get('index');
        let pictureOne = this.model.get('pictureOne');
        let picButtons = `<button id="pastPic"><=</button> <button id="nextPic">=></button>`;
        if (pictureOne){
            html = `${firstPicture[index]}${tabContent[index]}${picButtons}`;
        } else {
            html = `${secondPicture[index]}${tabContent[index]}${picButtons}`;
        }
        this.$el.html(html);
    },
    events: {
        "click #pastPic": 'switchPicture',
        "click #nextPic": 'switchPicture'
    },
    switchPicture: function(){
        this.model.switchPicture();
    }    
});

const TabModel = Backbone.Model.extend({
    defaults:{
        index: 0,
        pictureOne: true
    },
    nextButton: function(){
        let newIndex = this.get('index');
        if(newIndex >= tabModelList.length -1){
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


$(document).ready(function(){

    let tabView = new TabView({
        model: tabModel,
        el: '.tabContainer'
    });
    tabView.render();

    let tabMenu = new TabMenu({
        model: tabModel,
        el: '.tabMenu'
    });
    tabMenu.render();

});