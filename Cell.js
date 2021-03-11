class Cell {
    constructor(pos, value, bgColor) {
        this.pos = pos;
        this.id = `cell_${pos[0]}_${pos[1]}`;
        this.value = value;
        this.bgColor = bgColor;
        this.children = [];
    }

    setDOMNode() {
        const cell = document.createElement("div");
        cell.setAttribute("id", this.id);
        cell.classList.add('cell');
        if (this.value) {
            cell.classList.add('filled');
            cell.style.backgroundColor = this.bgColor;
            const numContainer = document.createElement("span");
            this.numContainer = numContainer;
            cell.appendChild(numContainer);
        }
        this.domNode = cell;
        return this;
    }
}