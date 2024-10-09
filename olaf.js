let textComplet = "";
let lines;
let compteurMot = 0;

httpGetAsync("./olaf.txt", show);


function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.addEventListener("load", callback)

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

function show(event) {
    textComplet = event.currentTarget.responseText;

    lines = event.currentTarget.responseText.split(/\r\n|\n/);

    let html = "<ol>";
    lines.forEach(line => {
        if (line != '') {
            html += '<li>' + line + '</li>';
        }
    });

    html += '</ol>';

    document.querySelector("#container").innerHTML = html;
    search();
}
document.querySelector('input#search').addEventListener('keyup', function() {
    searchFx(this.value);
});

function search() {
    //sauvegarder le type input dans une var
    let searchTxt = document.querySelector('input#search').value;
    searchFx(searchTxt);
    //console.log(searchTxt);
}

function searchFx(searchTxt) {

    //parcourir tous les li pour trouver le mot 
    let html = "<ol>";
    lines.forEach(line => {
        if (line != '') {
            html += '<li>';

            /* 
            mot = 'à'
            line = "Toto va à la plage à pied";
            decoupe[0] = 'Toto va' 
            decoupe[1] = 'la plage' 
            decoupe[2] = 'pied' 

            decoupe.length= 3;
            numE    0     1             2
            ==> 'Toto va' 'à' 'la plage' 'à' 'pied' 'à'
                        
            */

            //chaque fois quand il trouve le mot il ajoute en trop a la fin.

            //verifer si notre element est le dernier dans notre decoupes.

            let numElement = 0;
            let decoupes = line.split(searchTxt);
            // la phrase est coupée en 2, si le mot est trouvé.
            if (decoupes.length > 1) {
                decoupes.forEach(element => {
                    html += element;
                    numElement++;
                    // si c'est le dernier élément je n'affiche pas searchTxt
                    if (numElement <= decoupes.length - 1) {
                        compteurMot++;
                        html += "<span class='surligne'>" + searchTxt + "</span>";
                    }
                });
            } else {
                html += line;
            }

            html += '</li>';
            //html += '<br>' + line + '</li>';
        }
    });

    html += '</ol>';

    // document.querySelector("#container").innerHTML = event.currentTarget.responseText;
    document.querySelector("#container").innerHTML = html;
    document.querySelector('#compteurMot').innerHTML = "On a trouvé : " + compteurMot + " fois";
    //si on trouve background color pour le mot trouvé

    //on affiche
}