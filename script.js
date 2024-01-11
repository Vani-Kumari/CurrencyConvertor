const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const container = document.querySelector('.container');

const countries= [
    {code:"USD", name:"United states Dollar"},
    {code:"INR", name:"Indian Rupee"},
    {code:"EUR", name: "Euro"},
    {code:"GBP", name: "British Pound Sterling"},
    {code:"CAD", name: "Canadian Dollar"},
    {code:"JPY", name: "Japanese Yen"},
    {code:"AUD", name: "Australian Dollar"},
    {code:"DZD", name: "Algerian Dinar"},
    {code:"BDT", name: "Bangladeshi Taka"},
    {code:"BTC", name: "Bitcoin"},
    {code:"CAD", name: "Canadian Dollar"},
    {code:"EGP", name: "Egyptian Pound"},
    {code:"IDR", name: "Indonesian Rupiah"},
    {code:"ILS", name: "Israeli New Sheqel"},
    {code:"IQD", name: "Iraqi Dinar"},
    {code:"MVR", name: "Maldivian Rufiyaa"},
    {code:"KPW" , name:"North Korean Won"},
    {code:"NPR" , name:"Nepalese Rupee"},
    {code:"NZD" , name:"New Zealand Dollar"},
    {code:"PKR" , name:"Pakistani Rupee"},,
    {code:"KRW" , name:"South Korean Won"},
    {code:"LKR" , name:"Sri Lankan Rupee"},
    {code:"SEK" , name:"Swedish Krona"},
    {code:"SGD" , name:"Singapore Dollar"},
    {code: "VND", name: "Vietnamese Dong"},
    {code: "ZWL", name: "Zimbabwean Dollar"}

];

countries.forEach(country =>{
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = country.code;
    option1.textContent =option2.textContent = `${country.code}(${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value="USD";
    toCurrencyElement.value="INR";

});


const getExchangeRate =async() =>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent ="Fetching Exchange Rates..."
    
    try {
        
   
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const conversionRate= data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    if(typeof conversionRate === 'undefined'){
        resultElement.textContent ="Data is not available!!!!";
    }

    convertedAmountElement.value = convertedAmount;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
} 
catch (error) {
    container.innerHTML = `<h2>Error While Fetching Exchange rate</h2>`;
        
}
}

fromAmountElement.addEventListener('input',getExchangeRate);
fromCurrencyElement.addEventListener('change',getExchangeRate);
toCurrencyElement.addEventListener('change',getExchangeRate);
window.addEventListener('load',getExchangeRate);

getExchangeRate();