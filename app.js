const searchParam = new URLSearchParams(location.search)
const key = searchParam.get(`key`) || localStorage.getItem(`key`)
// doc 
// https://api-docs.iqair.com/?version=latest

// http://api.airvisual.com/v2/states?country=Thailand&key=${key}
// 


let states = [
  "",
  "Amnat Charoen",
  "Ang Thong",
  "Bangkok",
  "Buriram",
  "Chachoengsao",
  "Chai Nat",
  "Chaiyaphum",
  "Changwat Bueng Kan",
  "Changwat Ubon Ratchathani",
  "Changwat Udon Thani",
  "Chanthaburi",
  "Chiang Mai",
  "Chiang Rai",
  "Chon Buri",
  "Chumphon",
  "Kalasin",
  "Kamphaeng Phet",
  "Kanchanaburi",
  "Khon Kaen",
  "Krabi",
  "Lampang",
  "Lamphun",
  "Loei",
  "Lop Buri",
  "Mae Hong Son",
  "Maha Sarakham",
  "Mukdahan",
  "Nakhon Nayok",
  "Nakhon Pathom",
  "Nakhon Phanom",
  "Nakhon Ratchasima",
  "Nakhon Sawan",
  "Nakhon Si Thammarat",
  "Nan",
  "Narathiwat",
  "Nong Bua Lamphu",
  "Nong Khai",
  "Nonthaburi",
  "Pathum Thani",
  "Pattani",
  "Phangnga",
  "Phatthalung",
  "Phayao",
  "Phetchabun",
  "Phetchaburi",
  "Phichit",
  "Phitsanulok",
  "Phra Nakhon Si Ayutthaya",
  "Phrae",
  "Phuket",
  "Prachin Buri",
  "Prachuap Khiri Khan",
  "Ranong",
  "Ratchaburi",
  "Rayong",
  "Roi Et",
  "Sa Kaeo",
  "Sakon Nakhon",
  "Samut Prakan",
  "Samut Sakhon",
  "Samut Songkhram",
  "Sara Buri",
  "Satun",
  "Sing Buri",
  "Sisaket",
  "Songkhla",
  "Sukhothai",
  "Suphan Buri",
  "Surat Thani",
  "Surin",
  "Tak",
  "Trang",
  "Trat",
  "Uthai Thani",
  "Uttaradit",
  "Yala",
  "Yasothon",
];
var x = document.getElementById(`states`);
for (var state of states) {
  var option = document.createElement("option");
  option.text = `${state}`;
  option.value = `${state}`;
  x.add(option);
}

function setState(state) {
    console.log(state)
    fetch(`https://api.airvisual.com/v2/cities?state=${state}&country=Thailand&key=${key}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data['data'])
        var cities = []
        var x = document.getElementById(`cities`)
        x.innerHTML = ``
        for (var city of data['data']) {
            var option = document.createElement("option");
            var b = [...Object.values(city)]
            cities.push(...Object.values(city))
            option.text = `${b}`;
            option.value = `${b}`;
            x.add(option);
        }
        // console.log(cities)
        // queryData(cities[Math.floor(Math.random() * cities.length)])
    })
}

function queryData(city) {
    fetch(`https://api.airvisual.com/v2/city?city=${city}&state=Bangkok&country=Thailand&key=${key}`)
    // fetch(`http://api.airvisual.com/v2/nearest_city?key=${key}`)
    // fetch(`http://api.airvisual.com/v2/nearest_city?country=THA&key=${key}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch((e) => {
        console.log("Error",e);
    })
}
function showData(data) {
    const query = data['data']
    console.log(query)
    document.getElementById("city").innerHTML = query['city'];
    document.getElementById("state").innerHTML = query['state'];
    document.getElementById("country").innerHTML = query['country'];
    
    document.getElementById("coor").innerHTML = `${query['location']['coordinates'][1]},${query['location']['coordinates'][0]}`;
    // console.log(query['current']['weather'])
    document.getElementById("Timestamp").innerHTML = new Date(query['current']['weather']['ts']).toLocaleString();
    // weather
    document.getElementById("hu").innerHTML = query['current']['weather']['hu'];
    const ic = query['current']['weather']['ic']
    document.getElementById("ic").innerHTML = ic;
    if (ic == "01d") {document.getElementById("ic").innerHTML = "clear sky (day)";}
    else if (ic == "01n") {document.getElementById("ic").innerHTML = "clear sky (night)";}
    else if (ic == "02d") {document.getElementById("ic").innerHTML = "few clouds (day)";}
    else if (ic == "02n") { document.getElementById("ic").innerHTML = "few clouds (night)";}
    else if (ic == "03d") {document.getElementById("ic").innerHTML = "scattered clouds";}
    else if (ic == "04d") {document.getElementById("ic").innerHTML = "broken clouds";}
    else if (ic == "09d") {document.getElementById("ic").innerHTML = "shower rain";}
    else if (ic == "10d") {document.getElementById("ic").innerHTML = "rain (day time)";}
    else if (ic == "10n") {document.getElementById("ic").innerHTML = "rain (night time)";}
    else if (ic == "11d") {document.getElementById("ic").innerHTML = "thunderstorm";}
    else if (ic == "50d") {document.getElementById("ic").innerHTML = "mist";}
    else {document.getElementById("ic").innerHTML = "Error";}
    document.getElementById("pr").innerHTML = query['current']['weather']['pr'];
    document.getElementById("tp").innerHTML = query['current']['weather']['tp'];
    // document.getElementById("wd").innerHTML = query['current']['weather']['wd'];
    document.getElementById("ws").innerHTML = query['current']['weather']['ws'];
    document.getElementById("ws2").innerHTML = Math.round((query['current']['weather']['ws']*3.6) * 10) / 10;
    // pollution
    // console.log(query['current']['pollution'])
    const cn = query['current']['pollution']['aqicn'];
    document.getElementById("aqicn").innerHTML = cn;
    if (cn > 80) {
        document.getElementById("aqicn").style.color="red";
    }
    const us = query['current']['pollution']['aqius'];

    document.getElementById("aqius").innerHTML = us;
    if (us <= 50) {
        const color = "green"
        document.getElementById("aqius").style.color= color;
        document.getElementById("city").style.color = color;
        document.getElementById("state").style.color = color;
        document.getElementById("country").style.color = color;
    }
    else if (us <= 100) {
        const color = "yellow"
        document.getElementById("aqius").style.color= color;
        document.getElementById("city").style.color = color;
        document.getElementById("state").style.color = color;
        document.getElementById("country").style.color = color;
    }
    else if (us <= 150) {
        const color = "orange"
        document.getElementById("aqius").style.color= color;
        document.getElementById("city").style.color = color;
        document.getElementById("state").style.color = color;
        document.getElementById("country").style.color = color;
    }
    else if (us <= 200) {
        const color = "red"
        document.getElementById("aqius").style.color= color;
        document.getElementById("city").style.color = color;
        document.getElementById("state").style.color = color;
        document.getElementById("country").style.color = color;
    }
    else if (us <= 300) {
        const color = "purple"
        document.getElementById("aqius").style.color= color;
        document.getElementById("city").style.color = color;
        document.getElementById("state").style.color = color;
        document.getElementById("country").style.color = color;
    }
    else {
        document.getElementById("aqius").style.color="purple";
        document.getElementById("aqius").innerHTML = "What The Fuck";
    }
    // document.getElementById("maincn").innerHTML = query['current']['pollution']['maincn'];
    // document.getElementById("mainus").innerHTML = query['current']['pollution']['mainus'];
}