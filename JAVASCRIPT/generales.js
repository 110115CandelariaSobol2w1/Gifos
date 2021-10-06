// /* --------Muestro los titulos trending traidos de la API--------*/

// var apikey = "apqm2sZx8lShM1fBlnFdqKEb30l05tAE";
// let trending = document.getElementById("textosTrending");
// let gifs = document.getElementById("GifsPrincipales");


// fetch(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.data)
//         var topics = data.data;
//         trending.innerHTML = `<span "class=trending-links">${topics[0]}</span>, <span "class=trending-links">${topics[1]}</span>,<span "class=trending-links">${topics[2]}</span>,<span "class=trending-links">${topics[3]}</span>,<span "class=trending-links">${topics[4]}</span>`

//         let topicBtn = document.getElementsByClassName('trending-link');
//         for (let x = 0; x < topicBtn.length; x++) {
//             topicBtn[x].addEventListener('click', function (e) {
//                 inputBuscador.value = topics[x];
//                 busquedaGifos();
//             })
//         }

//     })
//     .catch(err => console.log(err))


/*----------TRENDING GIFOS----------*/



