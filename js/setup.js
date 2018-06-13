'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var getRandomArrayElement = function (arr) {
  if (typeof arr !== 'undefined' && arr.length > 0) {
    var k = Math.round(Math.random() * (arr.length - 1));
    var randomArrayElement = arr[k];
    return randomArrayElement;
  }

  return 0;
};

var mergeArrayItems = function (arr1, arr2) {
  if (typeof arr1 !== 'undefined' && arr1.length > 0 &&
      typeof arr2 !== 'undefined' && arr2.length > 0) {
    var arr = [arr1, arr2];
    var k = Math.round(Math.random());
    var firstArr = arr[k];
    var secondArr = arr[1 - k];
    var mergedArrayItems = getRandomArrayElement(firstArr) + ' ' + getRandomArrayElement(secondArr);
    return mergedArrayItems;
  }

  return 0;
};

// var mergeArrayItems = function(arr1, arr2) {
//   var newArr = [];

//   for(var i = 0, b = 0; i < arr1.length; i++) {
//     var arrItem = arr1[i];
//     for(var a = 0; a < arr2.length; a++, b++) {
//       newArr[b] = arrItem + ' ' + arr2[a];
//     }
//   }

//   return newArr;
// }

// var wizardNames = mergeArrayItems(names, lastnames);
// var wizardName = getRandomArrayElement(wizardNames);

var capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var generateName = function () {
  var generatedName = capitalizeFirstLetter(mergeArrayItems(names, lastnames));
  return generatedName;
};

var coatColorArr = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArr = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] =
    {
      name: generateName(),
      coatColor: getRandomArrayElement(coatColorArr),
      eyesColor: getRandomArrayElement(eyesColorArr)
    };
}

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var d = 0; d < wizards.length; d++) {
  fragment.appendChild(renderWizard(wizards[d]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
