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
*/

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

// runs when the page is completely loaded
window.onload = function() {

    // sets the global vars when the page loads.
    album = document.getElementById('album_container');
    product_list = document.getElementById('products_container');
}

function toggle() {
    // toggles the product page 
    
    /* this is all hidden. this was to display how to loop through classes. 
    var btns = document.getElementsByClassName('my_btn');
    for (var i = 0; i < btns.length; i++) {
        console.log(btns[i].id.getId());
        btns[i].innerHTML = 'BUY NOW';
    }
    */

    // sets the display of the list to the opposite of what it is
    album.style.display = (album.style.display == 'block' ? 'none' : 'block');

    // sets the display of the product page to the opposite of what it is
    product_list.style.display = (product_list.style.display == 'block' || product_list.style.display == undefined || product_list.style.display == '' ? 'none' : 'block');
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