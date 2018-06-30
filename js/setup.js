'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var generateRandomNumber = function (rangeLength) {
  var randomNumber = Math.round(Math.random() * rangeLength);
  return randomNumber;
};

var getRandomArrayElement = function (arr) {
  if (typeof arr !== 'undefined' && arr.length > 0) {
    var k = generateRandomNumber(arr.length - 1);
    var randomArrayElement = arr[k];
    return randomArrayElement;
  }

  return 0;
};

var mergeItems = function (item1, item2) {
  var item = [item1, item2];
  var k = generateRandomNumber(1);
  var firstItem = item[k];
  var secondItem = item[1 - k];
  var mergedItems = firstItem + ' ' + secondItem;
  return mergedItems;
};

var capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var generateName = function () {
  var name = getRandomArrayElement(names);
  var lastname = getRandomArrayElement(lastnames);
  var generatedName = capitalizeFirstLetter(mergeItems(name, lastname));
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
