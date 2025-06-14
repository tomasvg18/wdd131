import { participantTemplate } from './Templates.js';

var count = 1;

function addButton() {
    count++;
    participantTemplate(count);
}


function submitForm(event) {
    event.preventDefault();
    var fee = totalFees();
    var name = document.getElementById("adult_name").value;
 
    var message = successTemplate({
        name: name,
        count: count,
        fee: fee
});

 document.getElementById("regForm").style.display = "none";
    document.getElementById("summaryLabel").innerHTML = message;
    document.getElementById("summary").style.display = "block";
}

export function successTemplate(info) {
    const s = info.count > 1 ? 's' : '';
    return `Thank you ${info.name} for registering. You have registered ${info.count} participant${s} and owe $${info.fee} in Fees.`;
}


window.onload = function() {
    var form = document.querySelector("form");
    form.onsubmit = submitForm.bind(form);
    document.getElementById("add").addEventListener("click", addButton);
}

function totalFees() {

    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);

    feeElements = [...feeElements];

    let total = feeElements.reduce((sum, input) => {
        return sum + Number(input.value);
    }, 0);

    return total;
}
