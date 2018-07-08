'use strict';

var setup = document.querySelector('.setup');
// setup.classList.remove('hidden');

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
var fireballColorArr = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] =
    {
      name: generateName(),
      coatColor: getRandomArrayElement(coatColorArr),
      eyesColor: getRandomArrayElement(eyesColorArr)
    };
}

var similarListElement = setup.querySelector('.setup-similar-list');
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

setup.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball');
var wizardCoatInput = setup.querySelector('input[name="coat-color"]');
var wizardEyesInput = setup.querySelector('input[name="eyes-color"]');
var wizardFireballInput = setup.querySelector('input[name="fireball-color"]');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var convertRGBtoHEX = function (rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb;
  } else {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    var hex = (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    return hex;
  }
};

var changeColor = function (arr, elem, input, bg) {
  var currentColor = elem.style.fill;
  var currentBackgroundColor = convertRGBtoHEX(elem.style.backgroundColor);
  var newColor = getRandomArrayElement(arr);
  if (bg === true) {
    if (newColor === currentBackgroundColor) {
      changeColor(arr, elem, input, bg);
    } else {
      elem.style.backgroundColor = newColor;
    }
  } else {
    if (newColor === currentColor) {
      changeColor(arr, elem, input, bg);
    } else {
      elem.style.fill = newColor;
    }
  }
  input.value = newColor;
};

wizardCoat.addEventListener('click', function () {
  changeColor(coatColorArr, wizardCoat, wizardCoatInput);
});

wizardEyes.addEventListener('click', function () {
  changeColor(eyesColorArr, wizardEyes, wizardEyesInput);
});

wizardFireball.addEventListener('click', function () {
  changeColor(fireballColorArr, wizardFireball, wizardFireballInput, true);
});
