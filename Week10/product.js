// this object holds a list of products with images, videos, etc.

let products = [];

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

    loadProducts();

    // sets the global vars when the page loads.
    album = $('#album_container');
    product_list = $('#products_container');

    // set cart items to globals
    cart = $('#cart');
    cart_items = $('#cart_items');
    cart_total = $('#cart_total');

    // call reusable function
    refreshProducts();

    // add button
    $(document.body).on('click', '#add_btn', function() {

        // change to .load ajax 2/21
        $('#products_add').load('partial_product_add.html', function() {
            $('#products_add').fadeIn('slow');
            $('#products_container').fadeOut('slow');

            // make image first image. 2/21
            $('#image_preview').attr('src', $('#img option:first').val());
        });
    });

    // save button
    $(document.body).on('click', '#save_btn', function(e) {
        e.preventDefault();

        if ($('#name').val() == '') {
            alert('Please fill out name.');
            return false;
        }

        products.push({ id: products.length + 1, price: parseFloat($('#price').val()), name: $('#name').val(), album: $('#album').val(), desc: $('#desc').val(), img: $('#img').val(), video: $('#video').val() });
        refreshProducts();
        $('#products_add').addClass('hidden');
        $('#products_container').removeClass('hidden');
    });

    $(document.body).on('change', '#img', function(e) {
        e.preventDefault();
        console.log(e);

        // 2/21 class - show $this for cached objects.
        var $this = $(this);
        $('#image_preview').attr('src', $this.val()).fadeIn('slow');
    });

    $(document.body).on('click', '#load_div', function() {
        $('#new_div').load('product.html', function() { alert('loaded') });
    });
});

function loadProducts() {
    $.ajax({
        url: 'products.json',
        dataType: 'json',
        cache: false,
        async: false,
        success: function(in_data) {
            products = in_data;
        },
        error: function(xhr, status, err) {
            console.log(err);
        }
    });
}

function refreshProducts() {
    // make reference to the body of the table to fill with data
    var products_string = [];

    // loop through products data from line 2 and create html string to insert into product list table.
    for (var i = 0; i < products.length; i++) {
        // added delete, button group, modified buttons, centered stuff 2/14
        products_string.push('<tr><td align="center"><img src="' + products[i].img + '" /></td><td><strong>' + products[i].name + '</strong> - <em>' + products[i].album + '</em><hr>' + products[i].desc.replace(/\n/, '<br><br>') + '</td><td align="center">$' + products[i].price.toFixed(2) + '</td><td><div class="btn-group"><button id="button_' + i + '" onclick="loadProduct(' + i + ')" my_id="' + i + '"  class="my_btn btn btn-secondary"><i class="fas fa-pencil-alt"></i></button><button id="button_' + i + '" onclick="delProduct(' + i + ')" my_id="' + i + '"  class="my_btn btn btn-danger"><i class="fas fa-trash"></i></button></div></td></tr>');
    }

    //console.log(products_string.join(''));
    $('#products_list tbody').html(products_string.join(''));
    console.log(products);
}


// added delete 2/14
function delProduct(id) {
    if (confirm('Are you sure you want to delete this?')) {
        products.splice(id, 1);
        refreshProducts();
        console.log(products);
        return false;
    }
}

function loadProduct(id, back) {
    // toggles the product page 

    // sets the display of the list to the opposite of what it is
    album.toggleClass('hidden');

    // sets the display of the product page to the opposite of what it is
    product_list.toggle();

    // this loads the product from the data.
    if (!back) {
        current_product_id = id;
        document.title = products[id].name + ' - ' + products[id].album + ' - $' + products[id].price.toFixed(2);
        $('#album_img').attr('src', products[id].img);
        // got rid of album field under image
        $('#album_name').text(products[id].name + ' - ' + products[id].album);
        $('#album_title').text(products[id].album);
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