const Base_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateRate =async()=>{
  let amount = document.querySelector(".amount input");
   let val = amount.value;
   
   if (val = "" || val < 1){
     val = 1;
     amount.value = "1";
     
   }
  //  console.log(fromCurr.value, toCurr.value);
   const URL =`${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json()
   let rate = data[toCurr.value.toLowerCase()];
   console.log(rate);
   let finalAmount = amount.value*rate;
  //  console.log(finalAmount);
   msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

for (let select of dropdown){
   for(currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name=="from"&& currcode == "USD"){
      newOption.selected ="selected";
    }else if (select.name=="to"&& currcode == "INR"){
      newOption.selected ="selected";

    }
    select.append (newOption);
   }

   select.addEventListener("click",(evt)=>{
           updateflag(evt.target)
   })
}


const updateflag = (element)=>{
         let currcode = element.value;
         let countrycode = countryList[currcode];
         let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
         let img = element.parentElement.querySelector("img");
         img.src = newsrc;


}

btn.addEventListener("click",async  (evt)=>{
   evt.preventDefault();
   updateRate();
}
)
window.addEventListener("load",updateRate());
