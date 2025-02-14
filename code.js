
let baseURL="https://v6.exchangerate-api.com/v6/47dd3476cc3cb95b23544365/pair";
let currencyFrom=document.querySelector(".from select");
let currencyTo=document.querySelector("#to");
const selects=document.querySelectorAll(".select-container select");
const btn=document.querySelector(".form button");
let msg=document.querySelector(".result");

console.log(currencyFrom);
console.log(currencyTo);
for(select of selects){
    for(curCode in countryList){
        let newOption=document.createElement("option");
        newOption.value=curCode;
        newOption.innerText=curCode;
        select.append(newOption);
        
        if(select.id=="from"&&curCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.id=="to"&&curCode=="PKR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(option)=>{
    let currCode=option.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=option.parentElement.querySelector("img");
    img.src=newSrc;

}
async function convertCurrency(){
    //let URL=baseURL+"/"+currencyFrom.value+"/"+currencyTo.value;
    let amount=document.querySelector(".amount");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    let URL=`${baseURL}/${currencyFrom.value}/${currencyTo.value}`;
    let response =await fetch (URL);
    let data= await response.json();
    let rate=data.conversion_rate;
    let exchange=rate*amtVal;
    msg.innerHTML=`${amtVal} ${currencyFrom.value} = ${exchange.toFixed(2)} ${currencyTo.value}`;
    console.log(exchange);
}


btn.addEventListener("click",(evt)=>{
evt.preventDefault();
    convertCurrency();
    
})
let amount=document.querySelector(".amount");
amount.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        event.preventDefault();
    convertCurrency();
    amount.value="";
    }
})