// This is a subset of the states.
// Use this to actually run the game
// (assume this is the full set of states.
// This will make it easier to test.
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];

// These are all the states. It maps the state name to the number which you'll
// want to use in your API call.
var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}

var remaining =[];
var statesleft = 6;
var flag = 0;
var start = 0;
var type = [[],[]];

function gameOver()
{
    alert("Time is Up!");
    var inputText = document.getElementById("input");
    document.getElementById("end").innerHTML = "You missed: "+" "+ states.toString();
    document.getElementById("score").innerHTML = "Your score: " + (6-statesleft) + " out of 6";
    inputText.disabled = true;
    window.clearTimeout();
}

function game()
{

    if (start == 0)
    {
        document.getElementById("remaining_states").innerHTML = "You haven't started the game!";
        return;
    }
    var inputText = document.getElementById("input");
    inputText = inputText.value.toLowerCase();
    i = 0;
    while(i < remaining.length)
    {
        if(remaining[i] == inputText){
            flag = 1;
        }
        i++;
    }

    if(flag==1)
    {
        var inputText = document.getElementById("input");
        inputText.value = ' ';
    }

    else
    {
        j = 0;
        while(j < states.length)
        {
            if(inputText == states[j].toLowerCase())
            {
                var check;
                var num = (abvMap[states[j]]);
                states.splice(j,1);
                statesleft--;
                remaining.push(" "+ inputText);
                
                if(remaining.length == 6)
                {
                    gameWon();
                }
                var ret =  ($.get("https://api.census.gov/data/2013/language?get=EST&for=state:" + num + "&LAN=625", function(response){
                 type = response[1][0]; 
                document.getElementById("remaining_states").innerHTML = statesleft +" "+" states remaining";
                var inputText=document.getElementById("input");
                inputText.value='';
                document.getElementById("win").innerHTML="You have entered: "+ remaining.toString() + " that specifically has " + type.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Spanish Speaking residents";
                }));
            }
            j++;
        }
    }
    flag = 0;
}

function gameWon()
{
    alert("You Win!")
    window.clearTimeout();
}

var seconds = 20;
function secondPassed()
{
    var secondsLeft = seconds;
    document.getElementById('strt').innerHTML = secondsLeft;
    if(seconds > 0 && statesleft > 0){
        seconds--;
    }
}

function startGame(){
    start = 1;
    var countdownTimer = setInterval('secondPassed()',920);
    display = document.querySelector('#time');
    window.setTimeout("gameOver()", 20000);
}