
module.exports.upcomingDate = ()=>{
    var date_1 = new Date();
    var date_2 = new Date();
    var date_3 = new Date();
    var date_4 = new Date();
    var date_5 = new Date();
    var date_6 = new Date();
    var date_7 = new Date();
date_2.setDate(date_2.getDate() + 1);
date_3.setDate(date_3.getDate() + 2);
date_4.setDate(date_4.getDate() + 3);
date_5.setDate(date_5.getDate() + 4);
date_6.setDate(date_6.getDate() + 5);
date_7.setDate(date_7.getDate() + 6);
const data = [     {     date_1,
    lunch: "Order",
    dinner : "Order",
},
{     date_2,
    lunch: "Order",
    dinner : "Order",},
{     date_3,
    lunch: "Order",
    dinner : "Order",},
{     date_4,
    lunch: "Order",
    dinner : "Order",},
{     date_5,
    lunch: "Order",
    dinner : "Order",},
{     date_6,
    lunch: "Order",
    dinner : "Order",},
{     date_7,
    lunch: "Order",
    dinner : "Order",}]
    return data
}



