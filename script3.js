const Basket = Backbone.Model.extend({
    defaults: {
        item: '',
        color: '',
        price: '',
        quantity: 1
    }
});
const data = [{
    item: 'Varukorg',
    color: '',
    price: 0,
    quantity: 0
},
{
    item: 'Minirobot',
    color: 'svart',
    price: 1890,
    quantity: 2
}];
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
        let html = `${item}, ${color}, ${quantity} st, ${price} kr`
        this.$el.html(html);
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
        this.collection.forEach(function(item) {
			let basketItemView = new BasketItemView({ model: item });
			basketItemView.render();
			el.append(basketItemView.$el);
        });
    },
});

$(document).ready(function(){
    let basketAllView = new BasketAllView({
        collection: basketCollection,
        el: '#listOfItems'
    });
    basketAllView.render();


});