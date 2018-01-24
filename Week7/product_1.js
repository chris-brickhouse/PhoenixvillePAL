/* 
    
TODO:
0) add logo to page. create test logo and add footer to make it official site.
1) introduce JSON
2) retrieve data from external file, http://www.stereokiller.com/test_json.cfm
-- this page will be able to take url "id", if not list all
-- {products: { product: { id: x, name: 'test' }}}
3) load tables with JSON
4) load product from JSON
5) load external site via CORS (below)

var req = new XMLHttpRequest();

// Feature detection for CORS
if ('withCredentials' in req) {
    req.open('GET', 'http://api.foo.com/products', true);
    // Just like regular ol' XHR
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status >= 200 && req.status < 400) {
                // JSON.parse(req.responseText) etc.
            } else {
                // Handle error case
            }
        }
    };
    req.send();
}
5) add prices
6) square at bottom of page with cart total, add prices together
7) complete checkout process with post to external processor that will return "true" and a confirm number
8) display confirm to customer, reset page
9) introduct jquery
10) introduce bootstrap
11) convert layouts to bootrap + raw js to jquery
*/

// data packets, this is loaded with products. this will eventually be loaded via ajax.
var products = [
    { id: 1, price: 10, name: 'Run The Jewels', album: '3', desc: 'Test Desc for Run The Jewels', img: 'Images/image1.png', video: 'https://www.youtube.com/embed/LZSKNmoRsw4' },
    { id: 2, price: 12, name: 'The Menzingers', album: 'After The Party', desc: 'Test description for the Menzingers', img: 'Images/image2.png', video: 'https://www.youtube.com/embed/n3SxjX--x3U' }
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
    cart = document.getElementById('cart');
    cart_total = document.getElementById('cart_total');

    // get body of table
    var product_table_tbody = document.getElementById('products_list').getElementsByTagName('tbody')[0];
    var product_string = '';

    console.log(products);

    // loop product data and add to string
    for (i = 0; i < products.length; i++) {
        console.log(products[i]);
        product_string += '<tr><td><img src="' + products[i].img + '"></td><td>' + products[i].name + '</td><td>' + products[i].desc + '</td><td>$' + products[i].price + '</td><td><button id="button_' + i + '" onclick="loadProduct(' + i + ')" class="my_btn" my_id="' + i + '">View</button></td></tr>';
    }

    // enter data into table
    product_table_tbody.innerHTML = product_string;
}

function loadProduct(id, back) {
    // toggles the product page 

    // sets the display of the list to the opposite of what it is
    album.style.display = (album.style.display == 'block' ? 'none' : 'block');

    // sets the display of the product page to the opposite of what it is
    product_list.style.display = (product_list.style.display == 'block' || product_list.style.display == undefined || product_list.style.display == '' ? 'none' : 'block');

    // this loads the product from the data.
    if (!back) {
        current_product_id = id;
        document.title = products[id].name + ' - ' + products[id].album + ' - $' + products[id].price.toFixed(2);
        document.getElementById('album_img').src = products[id].img;
        document.getElementById('album_name').innerText = products[id].name;
        document.getElementById('album').innerText = products[id].album;
        document.getElementById('album_desc').innerText = products[id].desc;
        document.getElementById('album_price').innerText = '$' + products[id].price;
        document.getElementById('album_video').innerHTML = '<iframe width="560" height="315" src="' + products[id].video + '" frameborder="0"></iframe>';
    } else {
        current_product_id = null;
    }

}

function addToCart(id) {

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
            cart.style.display = 'block';
            cart_total.innerText = parseInt(cart_total.innerText) + (products[current_product_id].price * qty);
            document.getElementById('qty').value = 0;
            alert('product added to cart');
        }

    } catch (e) {
        alert(e.message);
    }

}