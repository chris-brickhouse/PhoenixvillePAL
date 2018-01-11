// this runs when the page is completely loaded
/*window.onload = function() {
    writeBottle();
    addNumbers();
}*/

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
            alert('success');
        }



    } catch (e) {
        alert(e.message);
    }

}