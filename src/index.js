import {
  subscribeToData,
  objectTransform
} from '@google/dscc'

function createItem(title) {
  const element = document.createElement("div");
  element.appendChild(document.createTextNode(title));
  return element;
}

function drawVis(data) {
  console.log('Data', data);
  const NAME = 'bigtext'; 

  if (document.querySelector("#bigtext")) {
    const oldtext = document.querySelector(`#${NAME}`)
    oldtext.parentNode.removeChild(oldtext);
  }  
  const rootElement = document.createElement("div");
  const title = data.tables.DEFAULT && data.tables.DEFAULT[0] ? data.tables.DEFAULT[0].barDimension : 'Not available';
  const newDiv = createItem(title); 

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

  rootElement.id = NAME;
  rootElement.appendChild(newDiv);  
  document.body.appendChild(rootElement);
}

subscribeToData(drawVis, {transform: objectTransform})