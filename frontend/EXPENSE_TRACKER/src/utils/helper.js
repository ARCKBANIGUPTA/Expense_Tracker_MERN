import moment from "moment";
export const validateEmail=(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
//regex is for regular expression
// 1. Local Part (before @):
// [^\s@]+: The local part (e.g., john.doe in john.doe@example.com) must:
// Contain at least 1 character.
// Not include spaces (\s) or @ symbols.
// 2. Domain Part (after @):
// [^\s@]+: The domain name (e.g., example in example.com) must:
// Contain at least 1 character.
// Not include spaces or @ symbols.
// \.: A literal dot (.), separating the domain name and top-level domain (e.g., .com).
// [^\s@]+$: The top-level domain (e.g., com) must:
// Contain at least 1 character.
// Not include spaces or @ symbols.

export const getInitials = (name) =>{
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";

    for(let i=0; i<Math.min(words.length,2);i++){
        initials += words[i][0];
    }
    return initials.toUpperCase();

};

export const addThousandsSeparator =(num)=>{
    if(num==null || isNaN(num)) return "";
    const [IntegerPart,FractionalPart] = num.toString().split(".");
    const formattedNumber = IntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return FractionalPart
    ?`${formattedNumber}.${FractionalPart}`: formattedNumber

};

export const prepareExpenseBarChartData = (data=[]) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    // console.log(chartData);
    return chartData;
};
export const prepareIncomeBarChartData = (data=[]) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date)-new Date(b.date));
    const chartData = sortedData.map((item) => ({
        source: item?.source,
        amount: item?.amount,
        month:moment(item?.date).format("Do MMM"),
    }));

    return chartData;
};