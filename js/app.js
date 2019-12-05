'use strict';


// getter
let main = $('main');
console.log(main);
function Picture(image_url, title, description, keyword, horns) {

  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Picture.prototype.renderWithJqueryClone = function (id) {
  let clone = $('#image-template').clone();

  //change the h2, p, and image
  // find looks in the targeted jquery object
  clone.find('img').attr('src', this.image_url);
  clone.find('h2').text(this.title);
  clone.find('#description').text(this.description);
  clone.find('#keyword').text(this.keyword);
  clone.find('#horns').text(this.horns);
  clone.removeAttr('id');
  // console.log(clone);

  $(id).append(clone);
};
var arrOfKeywords = [];
let uniqueKeyWords = [];


const handleData1 = (data) => {

  // console.log(data);
  data.forEach(pictureObjFromFile => {
    let picture = new Picture(pictureObjFromFile.image_url, pictureObjFromFile.title, pictureObjFromFile.description, pictureObjFromFile.keyword, pictureObjFromFile.horns);
    arrOfKeywords.push(pictureObjFromFile.keyword) //puts all keywords in an array
    picture.renderWithJqueryClone('#container1');
    renderUniqueImages22(pictureObjFromFile.keyword);
  });

  populate();


  /// Handling click

  $('select').on('click', function () {
    const keywordValue = $(this).val();
    $('div').hide();

    //have to show divs
    $('p').each(function (currentValue, index, array) {
      if ($(this).text() === keywordValue) {

        // if the p is right make the parent 
        $(this).parent().show();
      }
    });

  });

};

// $('#container1').empty();

const handleData2 = (data) => {

  // console.log(data);
  data.forEach(pictureObjFromFile => {
    let picture = new Picture(pictureObjFromFile.image_url, pictureObjFromFile.title, pictureObjFromFile.description, pictureObjFromFile.keyword, pictureObjFromFile.horns);
    arrOfKeywords.push(pictureObjFromFile.keyword) //puts all keywords in an array
    picture.renderWithJqueryClone('#container2');
    renderUniqueImages22(pictureObjFromFile.keyword);
  });

  populate();



  /// Handling click

  $('select').on('click', function () {
    const keywordValue = $(this).val();
    $('div').hide();

    //have to show divs
    $('p').each(function (currentValue, index, array) {
      if ($(this).text() === keywordValue) {

        // if the p is right make the parent 
        $(this).parent().show();
      }
    });
  });

};

document.getElementById('page1').addEventListener('click', renderPage1);
document.getElementById('page2').addEventListener('click', renderPage2);




function renderPage1() {
  // hide page2
  $('#container2').hide();
  $('#container1').show();
  // run 
  $.get('./data/page-1.json', 'json').then(handleData1);
  $('#container1').empty();

}


function renderPage2() {
  // attach event listener to the button page 2  
  //hide page1
  //
  $('#container1').hide();
  $('#container2').show();
  $.get('./data/page-2.json', 'json').then(handleData2);
  $('#container2').empty();
  // populate();
}


function renderUniqueImages22(keyword) {

  if (!uniqueKeyWords.includes(keyword)) {
    uniqueKeyWords.push(keyword);
  }
  console.log(uniqueKeyWords);
}

function populate() {
  uniqueKeyWords.forEach(function (value) {
    let selectdrop = $('select');
    let element = document.createElement('option');
    element.value = value;
    element.text = value;
    selectdrop.append(element);
  //  $('#image-template').empty();
  });
}