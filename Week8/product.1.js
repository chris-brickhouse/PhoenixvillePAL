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
current_product_id = null;

// runs when the page is completely loaded
window.onload = function() {

    // sets the global vars when the page loads.
    album = document.getElementById('album_container');
    product_list = document.getElementById('products_container');

    // make reference to the body of the table to fill with data
    var products_table_tbody = document.getElementById('products_list').getElementsByTagName('tbody')[0];
    var products_string = [];

    // loop through products data from line 2 and create html string to insert into product list table.
    for (var i = 0; i < products.length; i++) {
        products_string.push('<tr><td><img src="' + products[i].img + '" /></td><td>' + products[i].name + '</td><td>' + products[i].price + '</td><td><button id="button_' + i + '" onclick="loadProduct(' + i + ')" my_id="' + i + '" class="my_btn">View</button></td></tr>');
    }

    //console.log(products_string.join(''));
    products_table_tbody.innerHTML = products_string.join('');

}

function loadProduct(id, back) {
    // toggles the product page 

    // sets the display of the list to the opposite of what it is
    album.style.display = (album.style.display == 'block' ? 'none' : 'block');

    // sets the display of the product page to the opposite of what it is
    product_list.style.display = (product_list.style.display == 'block' || product_list.style.display == undefined || product_list.style.display == '' ? 'none' : 'block');
    
    if (!back) {
        // if not back button, fill html template with data from line 2 based on ID passed from the buttons we created in line 35
        document.title = products[id].name + ' - ' + products[id].album + ' - ' + products[id].price;
        document.getElementById('album_img').src = products[id].img;
        document.getElementById('album').innerText = products[id].album;
        document.getElementById('album_name').innerText = products[id].name;
        document.getElementById('album_desc').innerHTML = products[id].desc;
        document.getElementById('album_price').innerText = '$' + products[id].price.toFixed(2);
        document.getElementById('album_video').innerHTML = '<iframe width="550" height="350" src="' + products[id].video + '"></iframe>';
    }
}

function addToCart() {

    // first, declare and set values to your variables from the form #product_form
    var inventory = parseInt(document.getElementById('inventory').value);
    var qty = parseInt(document.getElementById('qty').value);
    var email = document.getElementById('email').value;

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

        // this will throw an error
        blarga();
        console.log(err_msg);

        // if the error above wasn't thrown, it would hit this, which checks to see if errors exist, if so throws error
        if (err_str.length > 0) {
            alert(err_str.join(''));
            return false;
        } else {

        }



    } catch (e) {
        alert(e.message);
    }

}