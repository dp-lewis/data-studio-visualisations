import {
  subscribeToData,
  objectTransform
} from '@google/dscc'

function createItem(title, marginBottom) {
  marginBottom = marginBottom || 10;
  const element = document.createElement("div");
  element.appendChild(document.createTextNode(title));
  element.style.marginBottom = marginBottom + 'px';
  return element;
}

function cleanUpOldVis(name) {
  const oldVis = document.querySelector(`#${name}`);
  if (oldVis) {
    oldVis.parentNode.removeChild(oldVis);
  }  
}

function drawVis(data) {
  console.log('Data', data);
  const NAME = 'bigtext'; 
  const rootElement = document.createElement("div");
  rootElement.id = NAME;

  cleanUpOldVis(NAME);

  const marginBottom =  data.style.marginBottom.value
  ? data.style.marginBottom.value
  : data.style.marginBottom.defaultValue;

  data.tables.DEFAULT.forEach((row) => {
    rootElement.appendChild(createItem(row.barDimension, marginBottom)); 
  });

  // prep the colour etc. on the root element
  const fontColor =  data.style.fontColor.value
  ? data.style.fontColor.value.color
  : data.style.fontColor.defaultValue;  
  
  const fontFam =  data.style.fontFam.value
  ? data.style.fontFam.value
  : data.style.fontFam.defaultValue;

  const size =  data.style.fontSize.value
  ? data.style.fontSize.value + 'px'
  : data.style.fontSize.defaultValue;

  const lineHeight =  data.style.lineHeight.value
  ? data.style.lineHeight.value
  : data.style.lineHeight.defaultValue;

  rootElement.style.color = fontColor;
  rootElement.style.fontFamily = fontFam;
  rootElement.style.fontSize = size;
  rootElement.style.lineHeight = lineHeight;
  
  document.body.appendChild(rootElement);
}

subscribeToData(drawVis, {transform: objectTransform})