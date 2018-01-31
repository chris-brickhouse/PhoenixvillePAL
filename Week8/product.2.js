// this object holds a list of products with images, videos, etc.
var products = [
    { id: 1, price: 10, name: "Run The Jewels", album: "3", desc: "Test description for rtj3", img: "images/image1.png", video: "https://www.youtube.com/embed/saR7SYa6nAs" },
    { id: 2, price: 12, name: "The Menzingers", album: "After the party", desc: "Test description for atp", img: "images/image2.png", video: "https://www.youtube.com/embed/n3SxjX--x3U" }
];

// makes it so you can do mystring.left(3) and grab "btn" from strings with "btn_1"  or "btn_2" ids.
String.prototype.left = function(len) {
        return this.substring(0, len);
    }
    // will get the id from the buttons.
String.prototype.getId = function() {
    return this.replace('button_', '');
}

// global variables make it easy to change these objects.
album = null;
product_list = null;
cart = null;
cart_total = null;
cart_items = null;
current_product_id = null;

// changed to document.ready
$(document).ready(function() {

    // sets the global vars when the page loads.
    album = $('#album_container');
    product_list = $('#products_container');
    
    // set cart items to globals
    cart = $('#cart');
    cart_items = $('#cart_items');    
    cart_total = $('#cart_total');

    // make reference to the body of the table to fill with data
    var products_table_tbody = $('#products_list tbody');
    var products_string = [];

    // loop through products data from line 2 and create html string to insert into product list table.
    for (var i = 0; i < products.length; i++) {
        products_string.push('<tr><td><img src="' + products[i].img + '" /></td><td>' + products[i].name + '</td><td>' + products[i].desc + '</td><td>' + products[i].price + '</td><td><button id="button_' + i + '" onclick="loadProduct(' + i + ')" my_id="' + i + '" class="my_btn">View</button></td></tr>');
    }

    //console.log(products_string.join(''));
    products_table_tbody.html(products_string.join(''));

});

function loadProduct(id, back) {
    // toggles the product page 

    // sets the display of the list to the opposite of what it is
    album.toggle();

    // sets the display of the product page to the opposite of what it is
    product_list.toggle();

    // this loads the product from the data.
    if (!back) {
        current_product_id = id;
        document.title = products[id].name + ' - ' + products[id].album + ' - $' + products[id].price.toFixed(2);
        $('#album_img').attr('src', products[id].img);
        $('#album_name').text(products[id].name);
        $('#album').text(products[id].album);
        $('#album_desc').text(products[id].desc);
        $('#album_price').text('$' + products[id].price);
        $('#album_video').html('<iframe width="560" height="315" src="' + products[id].video + '" frameborder="0"></iframe>');
    } else {
        current_product_id = null;
    }

}

function addToCart(id) {

    // first, declare and set values to your variables from the form #product_form
    var inventory = parseInt($('#inventory').val());
    var qty = parseInt($('#qty').val());
    var email = $('#email').val();

    // this is an array, a structure that holds error message strings
    var err_str = [];

    // anything inside a try block is like throwing a ball to see what happens
    try {

        // email is blank, add error
        if (email == '') {
            err_str.push('Please fill out email.');
        }

        // incentory is less than qty requested, add error
        if (inventory < qty) {
            err_str.push("We don't have that many");
        }

        // check the qty
        if (qty == 0) {
            err_str.push("You Must enter a qty.");
        }

        console.log(err_str);

        // if the error above wasn't thrown, it would hit this, which checks to see if errors exist, if so throws error
        if (err_str.length > 0) {
            alert(err_str.join('\n'));
            return false;
        } else {
            // show cart box, which is fixed
            cart.show();
            cart_items.text(parseInt(cart_items.text()) + qty);
            cart_total.text(parseInt(cart_total.text()) + (products[current_product_id].price * qty));
            console.log(qty);
            
            $('#qty').val(0);            
            alert('product added to cart');
        }

    } catch (e) {
        alert(e.message);
    }

}