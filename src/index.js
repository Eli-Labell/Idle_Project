function component() {
    const element = document.createElement('h1');
    element.innerHTML = "Welcome to Corona Clicker"

    return element;
}

document.body.appendChild(component());