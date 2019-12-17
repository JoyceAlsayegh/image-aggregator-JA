const express = require('express');
const axios = require('axios');
const app = express();

const unsplashUrl = "https://api.unsplash.com/search/photos?";
const pixabayUrl ="https://pixabay.com/api/?key=";
const unsplashKey = "9abcad76022e73ff9fa3de29240345514d09fb367cb03a5b43e9b7bfea63ae9f";
const pixabayKey ="13155284-960faec7832ea0ef59abd8d2f";
let unsplashImages = [];
let pixabayImages =[];
const isLoaded = false;
const isEntered = false;



app.get('/:searchText/:page', (req, res) => {
    
    let images = [];
    axios.all([
        axios.get(`${unsplashUrl}per_page=10&page=${req.params.page}&query=${req.params.searchText}&client_id=${unsplashKey}`),
        axios.get(`${pixabayUrl}${pixabayKey}&q=${req.params.searchText}&image_type=photo&per_page=10&page=${req.params.page}`)
      ])
      .then(axios.spread((unsplashRes,pixabayRes) => {
          this.unsplashImages = unsplashImagesUpdate(unsplashRes.data.results);
          this.pixabayImages = pixabayImagesUpdate(pixabayRes.data.hits);
          images = combineAllImages(this.unsplashImages, this.pixabayImages)
          this.isLoaded =true;
          this.isEntered =false;
         res.send(images);
      }))
      .catch(err=>{
          res.send({err});
      })
});

const PORT = 5000;
 
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));


function unsplashImagesUpdate (unsplashImage){
    return unsplashImage.map(entry => {
      return{
        id: entry.id,
        source: `Unsplash`,
        imageUrl: entry.urls.thumb,
        downloadUrl: `${entry.links.download}?force=true`
      };
      
      })
  }
  function pixabayImagesUpdate (pixabayImage){
    return pixabayImage.map(entry => {
      return{
        id: entry.id,
        source: `Pixabay`,
        imageUrl: entry.previewURL,
        downloadUrl: entry.previewURL.replace(/.*\/(.*\/)/, `https://pixabay.com/images/download/`).replace('150.jpg',`1920.jpg?attachment`),
      };
      })
  }
  function combineAllImages(pixabayImagesN, unsplashImagesN){
    const list = pixabayImagesN.concat(unsplashImagesN);
    for(var i=list.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  }
  
  function onUpdateImage(){
    let pixaBay = pixabayImagesUpdate();
    let unsplash = unsplashImagesUpdate();
    let combinedImages = combineAllImages(pixaBay, unsplash);
    return combinedImages;
  }