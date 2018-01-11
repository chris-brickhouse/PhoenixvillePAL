// this runs when the page is completely loaded
/*window.onload = function() {
    writeBottle();
    addNumbers();
}*/

function addToCart() {

    var inventory = parseInt(document.getElementById('inventory').value);
    var qty = parseInt(document.getElementById('qty').value);
    var email = document.getElementById('email').value;
    var err_str = [];


    try {
        if (email == '') {
            err_str.push('Please fill out email.');
        }

        if (inventory < qty) {
            err_str.push("We don't have that many");
        }

        blarga();
        console.log(err_msg);

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