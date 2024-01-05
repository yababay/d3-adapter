import * as d3 from 'd3';
/**
 * Базовый класс-канва для остальных графиков. Позволяет настроить поля, создать основные объекты.
 * @class
 */
class D3Canvas {
    #margin = { top: 10, right: 10, bottom: 10, left: 10 };
    #figure;
    #svg = undefined;
    #graphics = undefined;
    #width = undefined;
    #height = undefined;
    /**
     * Конструктор для создания svg-пространства с полями. Обратите внимание, что высота указывается перед шириной, т.к. чаще может возникнуть потребность в ее изменении. Ширина по умолчанию 100% от родительского элемента, что приемлемо в большинстве случаев.
     * @param {HTMLElement} - html-контейнер, в который будет вписан график
     * @param {string} - высота контейнера в единицах css; по умолчанию 480px.
     * @param {string} - ширина контейнера в единицах css; по умолчанию 100%.
     */
    constructor(figure, height, width) {
        this.#figure = figure;
        figure.style.width = `${width}px` || '100%';
        figure.style.height = `${height}px` || '480px';
    }
    /**
     * Сеттер для отступа сверху.
     * @param {number} - в пикселях.
     */
    set marginTop(value) { this.#margin.top = value; }
    /**
     * Сеттер для отступа справа.
     * @param {number} - в пикселях.
     */
    set marginRight(value) { this.#margin.right = value; }
    /**
     * Сеттер для отступа снизу.
     * @param {number} - в пикселях.
     */
    set marginBottom(value) { this.#margin.bottom = value; }
    /**
     * Сеттер для отступа слева.
     * @param {number} - в пикселях.
     */
    set marginLeft(value) { this.#margin.left = value; }
    /**
     * Сеттер для подписи к графику.
     * @param {string} - подпись к графику, можно в формате html.
     */
    set caption(value) { d3.select(this.#figure).append("figcaption").html(value); }
    /**
     * Геттер для svg-пространства (без учета отступов).
     */
    get svg() {
        this.#svg = this.#svg ?? d3.select(this.#figure).append("svg")
            .attr("width", this.#figure.offsetWidth)
            .attr("height", this.#figure.offsetHeight);
        return this.#svg;
    }
    /**
     * Геттер для основного svg-объекта, внутри которого размещается график (svg за вычетом отступов).
     */
    get graphics() {
        const { top, left } = this.#margin;
        const { width, height } = this.dimensions;
        const svg = this.#svg ?? this.svg;
        this.#graphics = this.#graphics ?? svg.append("g")
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${left},${top})`);
        return this.#graphics;
    }
    /**
     * Геттер, возвращающий ширину и высоту в едином объекте: {width, height}.
     */
    get dimensions() {
        const svg = this.#svg || this.svg;
        const { top, right, bottom, left } = this.#margin;
        if (!this.#width || !this.#height) {
            this.#width = +svg.attr("width") - left - right;
            this.#height = +svg.attr("height") - top - bottom;
        }
        const width = this.#width;
        const height = this.#height;
        return { width, height };
    }
    /**
     * Геттер, возвращающий основные объекты графика: {d3, g, width, height}.
     */
    get space() {
        const g = this.graphics;
        const { width, height } = this.dimensions;
        return { d3: d3, g, width, height };
    }
    /**
     * Преобразование данных в требуемый формат. Лучше делать это вне данного класса, но если очень нужно - можно переопределить этот метод.
     * @param {string} - данные для отображения на графике.
     */
    setupData(data) {
        return data;
    }
    /**
     * Рисование графика. Метод не следует перезагружать, только вызывать после того, как выполнены все настройки.
     * @param {string} - данные для отображения на графике.
     */
    draw(data) {
        const { g, width, height } = this.space;
        data = this.setupData(data);
        this.setupDomains(data, width, height);
        this.setupAxes(data, width, height);
        this.adjust(g, width, height, data);
    }
}
export default D3Canvas;
