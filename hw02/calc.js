(function(){
    const display_default = "\u00A0"; // &nbsp
    var first_op = true;
    var calc_done = false;
    var display_str = display_default;

    function calculate(problem) {
        return eval(problem);
    }

    function update() {
        document.getElementById("calc_display").textContent = display_str;
    }

    function number_press(num_ele) {
        if(calc_done) {
            clear();
        }
        if(display_str === display_default) {
            display_str = "";
        }
        display_str += num_ele.textContent;
        update();
    }

    function operator_press(op_ele) {
        if(display_str == display_default){
            return;
        }
        calc_done = false;
        if(op_ele.textContent.toString() === "+="){
            if(first_op) {
                display_str += "+";
                first_op = false;
            } else {
                display_str = calculate(display_str).toString();
                calc_done = true;
                first_op = true;
            }
        } else {
            display_str += op_ele.textContent;
            first_op = false;
        }
        update();
    }

    function clear() {
        display_str = display_default;
        first_op = true;
        calc_done = false;
        update();
    }

    // Second argument of Array.from is a map function, avoids an
    // extra call to forEach
    Array.from(document.getElementsByClassName("operator"), (op) => {
        op.addEventListener("click", () => { operator_press(op); });
    });
    Array.from(document.getElementsByClassName("number"), (num) => {
        num.addEventListener("click", () => { number_press(num); });
    });
    document.getElementById("clear").addEventListener("click", clear);
})()
