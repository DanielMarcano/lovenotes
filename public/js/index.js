// const gifForm = document.getElementById('main__gifs__form');
// const gifName = document.getElementById('gif_name');
// const gifResults = document.getElementById('main__gifs__results');

// const prettyPrint = (gifs) => {
//   gifResults.innerHTML = '';
//   let img;
//   let li;
//   gifs.forEach((gif) => {
//     img = document.createElement('img');
//     img.setAttribute('src', gif.images.fixed_height.url);
//     img.setAttribute('title', gif.title);
//     img.setAttribute('alt', gif.title);
//     img.className = 'gif_img';
//
//     li = document.createElement('li');
//     li.appendChild(img);
//     gifResults.appendChild(li);
//   });
// };
//
// const searchGifs = (text) => {
//   const encodedText = encodeURIComponent(text);
//   const host = 'http://api.giphy.com';
//   const API_KEY = '6ByPYxb0YrpGYd8DBUMJVrhqvns7YFZQ';
//   const url = `${host}/v1/gifs/search?api_key=${API_KEY}&limit=10&q=${encodedText}`;
//
//   fetch(url)
//     .then(resp => resp.json())
//     .then((data) => {
//       const gifs = data.data;
//       prettyPrint(gifs);
//     })
//     .catch(e => console.log(e));
// };

// const initialize = () => {
//
// };

// window.onload = initialize;