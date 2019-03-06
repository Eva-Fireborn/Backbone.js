const Basket = Backbone.Model.extend({
    defaults: {
        item: '',
        color: '',
        price: '',
        quantity: 1,
        editMode: false
    }
});
const data = [];

const BasketCollection = Backbone.Collection.extend({
    model: Basket
});
let basketCollection = new BasketCollection(data);

const BasketItemView = Backbone.View.extend ({
    tag: 'li',
    initialize: function(){
        this.listenTo(this.model, 'change', this.render)
    },
    render: function(){
        let item = this.model.get('item');
        let color = this.model.get('color');
        let price = this.model.get('price');
        let quantity = this.model.get('quantity');
        let editMode = this.model.get('editMode');
        let removeButton = `<button id="removeItem">Ta bort</button>`;
        let editButton = `<button id="editItem">Ändra</button>`;
        let okButton = `<button id="okItem">Ok</button>`
        let colorSelectFinrobot = `<select id="selectColor">
        <option value="guld">guld</option>
        <option value="silver">silver</option>
        </select>`;
        let colorSelectMinirobot = `<select id="selectColor">
        <option value="svart">svart</option>
        <option value="vit">vit</option>
        </select>`;
        let html;
        if (editMode){
            if (item === 'Finrobot'){
                html = `${item}, ${colorSelectFinrobot}, ${quantity} st, ${price} kr ${okButton}${removeButton}`
            } else {
                html = `${item}, ${colorSelectMinirobot}, ${quantity} st, ${price} kr ${okButton}${removeButton}`
            }
            
        } else{
            html = `${item}, ${color}, ${quantity} st, ${price} kr ${editButton}${removeButton}`
        } 
        this.$el.html(html);
    },
    events:{
        "click #removeItem": 'remove',
        "click #editItem": 'editItem',
        "click #okItem": 'okButton'
    },
    remove: function(){
        basketCollection.remove(this.model);
    },
    editItem: function(){
        this.model.set({editMode: true});
    },
    okButton: function(){
        let newColor = $('#selectColor').val();
        this.model.set({color: newColor, editMode: false});
    }
});

const BasketAllView = Backbone.View.extend({
    initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
		this.listenTo(this.collection, 'change', this.render);
    },
    render: function() {
        let el = this.$el;
        el.html('');
        let robots = `<ul>
        <li>Finrobot, guld <button id="finrobotGuld">Lägg i varukorgen</button></li>
        <li>Finrobot, silver <button id="finrobotSilver">Lägg i varukorgen</button></li>
        <li>Minirobot, svart <button id="minirobotSvart">Lägg i varukorgen</button></li>
        <li>Minirobot, vit <button id="minirobotVit">Lägg i varukorgen</button></li>
        </ul>
        <h3>Varukorg</h3>`;
        el.append(robots);
        this.collection.forEach(function(item) {
			let basketItemView = new BasketItemView({ model: item });
			basketItemView.render();
			el.append(basketItemView.$el);
        });
    },
    events: {
        "click #finrobotSilver": 'finrobotSilver',
        "click #finrobotGuld": 'finrobotGuld',
        "click #minirobotSvart": 'minirobotSvart',
        "click #minirobotVit": 'minirobotVit'
    },
    finrobotSilver: function(event){
        let quantity = 1;
        let price = 15000;
        let listItem = '';
        this.collection.forEach(function(item){
            let name = item.attributes.item;
            let color = item.attributes.color;
            if ( name === 'Finrobot' && color === 'silver'){
                quantity = item.attributes.quantity;
                quantity++;
                price = quantity * price;
                listItem = item;  
            }    
        });
        if (listItem !== ''){
            basketCollection.remove(listItem)
        }
        basketCollection.add({item: 'Finrobot', color: 'silver', price: price, quantity: quantity});
    },
    finrobotGuld: function(event){
        let quantity = 1;
        let price = 18000;
        let listItem = '';
        this.collection.forEach(function(item){
            let name = item.attributes.item;
            let color = item.attributes.color;
            if ( name === 'Finrobot' && color === 'guld'){
                quantity = item.attributes.quantity;
                quantity++;
                price = quantity * price;
                listItem = item;  
            }    
        });
        if (listItem !== ''){
            basketCollection.remove(listItem)
        }
        basketCollection.add({item: 'Finrobot', color: 'guld', price: price, quantity: quantity});
    },
    minirobotSvart: function(event){
        let quantity = 1;
        let price = 8000;
        let listItem = '';
        this.collection.forEach(function(item){
            let name = item.attributes.item;
            let color = item.attributes.color;
            if ( name === 'Minirobot' && color === 'svart'){
                quantity = item.attributes.quantity;
                quantity++;
                price = quantity * price;
                listItem = item;  
            }    
        });
        if (listItem !== ''){
            basketCollection.remove(listItem)
        }
        basketCollection.add({item: 'Minirobot', color: 'svart', price: price, quantity: quantity});
    },
    minirobotVit:function(event){
        let quantity = 1;
        let price = 8500;
        let listItem = '';
        this.collection.forEach(function(item){
            let name = item.attributes.item;
            let color = item.attributes.color;
            if ( name === 'Minirobot' && color === 'vit'){
                quantity = item.attributes.quantity;
                quantity++;
                price = quantity * price;
                listItem = item;  
            }    
        });
        if (listItem !== ''){
            basketCollection.remove(listItem)
        }
        basketCollection.add({item: 'Minirobot', color: 'vit', price: price, quantity: quantity});
    }
});

$(document).ready(function(){
    let basketAllView = new BasketAllView({
        collection: basketCollection,
        el: '#listOfItems'
    });
    basketAllView.render();


});