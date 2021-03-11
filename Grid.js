class Grid {

    constructor(arr, container, bgColor = "#E2251E", hoverColor = "#b5100a") {
        this.array = arr;
        this.container = container;
        this.bgColor = bgColor;
        this.hoverColor = hoverColor;
        this.currentConnectedCells = [];
    }

    setWidth() {
        const w = this.array[0].length;
        this.domNode.style.width = `${w * 50 + w * 2}px`;

    }

    generateGrid() {

        const objMap = {};
        const grid = this.array;

        this.domNode = document.createElement("div");
        this.domNode.classList.add('grid');

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                const id = `cell_${i}_${j}`;
                const value = grid[i][j];

                if (!objMap[id]) {
                    objMap[id] = new Cell([i, j], value, this.bgColor, this.hoverColor).setDOMNode();
                    this.domNode.appendChild(objMap[id].domNode);
                }

                const topValue = grid[i - 1] && grid[i - 1][j];
                const top_id = `cell_${i - 1}_${j}`;


                const leftValue = grid[i][j - 1];
                const left_id = `cell_${i}_${j - 1}`;

                if (value) {
                    if (topValue) {
                        objMap[id].children.push(objMap[top_id]);
                        objMap[top_id].children.push(objMap[id]);

                    }

                    if (leftValue) {
                        objMap[left_id].children.push(objMap[id]);
                        objMap[id].children.push(objMap[left_id]);

                    }
                }

            }
        }

        this.container.appendChild(this.domNode);

        this.objMap = objMap;

        return objMap;
    }

    showCount = (cell, count) => {
        this.container.querySelectorAll('span').forEach(s => s.style.display = 'none');
        const span = cell.querySelector('span');
        span.innerHTML = count;
        span.style.display = "inline";
    }


    onMouseOver = e => {
        if (e.target.classList.contains("filled")) {
            const id = e.target.id;
            this.currentConnectedCells = this.objMap[id].connectedCells;
            if (!this.currentConnectedCells) {
                this.setConnectedCells(id);
            }
            this.currentConnectedCells = this.objMap[id].connectedCells;
            this.currentConnectedCells.map(c => {
                c.domNode.classList.add("hover");
                c.domNode.style.backgroundColor = this.hoverColor;
            });
        }
    }

    onMouseOut = e => {
        if (this.currentConnectedCells.length) {
            this.currentConnectedCells.map(c => {
                c.domNode.classList.remove("hover");
                c.domNode.style.backgroundColor = this.bgColor;
            });
        }
    }

    onClick = e => {
        if (e.target.classList.contains("filled") && this.currentConnectedCells.length) {
            this.showCount(e.target, this.currentConnectedCells.length);
        }
    }

    attachEvents() {
        this.container.addEventListener("mouseover", this.onMouseOver);
        this.container.addEventListener("mouseout", this.onMouseOut);
        this.container.addEventListener("click", this.onClick);


    }

    setConnectedCells(id) {

        const getNeighbours = (obj, map) => {
            if (!map[obj.id]) {
                map[obj.id] = obj;
                if (obj.children && obj.children.length) {
                    obj.children.map(c => getNeighbours(c, map));
                }
            }
        }

        const o = {};
        getNeighbours(this.objMap[id], o);
        this.objMap[id].connectedCells = Object.values(o);

    }



    render() {
        this.generateGrid();
        this.setWidth();
        this.attachEvents();

        return this;
    }

    destroy() {

        this.container.removeEventListener("mouseover", this.onMouseOver);
        this.container.removeEventListener("mouseout", this.onMouseOut);
        this.container.removeEventListener("click", this.onClick);

        this.domNode.remove();


    }


}