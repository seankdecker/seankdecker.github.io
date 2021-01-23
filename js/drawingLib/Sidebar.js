// Sidebar class
// used to interact with a sidebar, sidebar will contain variables and buttons
export default class Sidebar {
  constructor(id) {
    this.sidebar = document.getElementById(id);
    this.elements = {};
  }

  addToggle(
    label, callback, 
    labelToggled=undefined, color=undefined, fontFamily=undefined
  ) {
    const elem = document.createElement('BUTTON');
    const toggleLabel = () => {
      if (elem.value === 'true') {
        elem.innerText = elem.textContent = labelToggled;
        elem.value = 'false';
      } else {
        elem.innerText = elem.textContent = label;
        elem.value = 'true';
      }
    };
    elem.onclick = (e) => {
      if (labelToggled != null) {
        toggleLabel();
      }
      callback();
    };
    elem.value = 'true';
    elem.style.fontFamily = fontFamily;
    elem.style.color = color;
    elem.innerText = elem.textContent = label;
    this.sidebar.appendChild(elem);
  }

  addSlider(label, setter, getter, minValue, maxValue) {
    const slider = document.createElement("INPUT");
    slider.type = 'range';
    slider.min = minValue;
    slider.max = maxValue;
    slider.value = getter();
    slider.oninput = function () {
      setter(this.value);
      valueText.innerText = valueText.textContent = this.value; 
    };  
    const text = document.createElement("P");
    text.appendChild(document.createTextNode(label));
    const valueText = document.createElement("SPAN");
    valueText.innerText = valueText.textContent = slider.value; 
    text.appendChild(valueText);
    const container = document.createElement("DIV");
    container.className = 'slider-container';
    container.appendChild(text);
    container.appendChild(slider);
    this.sidebar.appendChild(container);
  }

  addVariables(id, type, text, func, value) {
    let ref = document.createElement(type);
    ref.setAttribute("onclick", func);
    ref.setAttribute("id", "id");
    ref.setAttribute("value", value);
    ref.appendChild(document.createTextNode(text));
  }
}
