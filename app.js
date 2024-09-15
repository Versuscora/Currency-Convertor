const Base_URL = "https://v6.exchangerate-api.com/v6/e7ba50027c5da2b33c296ea8/latest";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateRate = async () => {
    let amount = document.querySelector(".amount input");
    let val = amount.value;

    if (val === "" || val < 1) {
        val = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value.toUpperCase()];

    let finalAmount = amount.value * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

for (let select of dropdown) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name == "from" && currcode == "USD") {
            newOption.selected = "selected";
        } else if (select.name == "to" && currcode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load", updateRate);
