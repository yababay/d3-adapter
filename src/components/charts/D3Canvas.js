import * as d3 from 'd3'

/**
 * Базовый класс-канва для остальных графиков. Позволяет настроить поля, создать основные объекты.
 * @class
 */

class D3Canvas {

    static d3 = d3

    /**
     * Конструктор для создания svg-пространства с полями.
     * @param {HTMLElement} - html-контейнер, в который будет вписан график
     * @param {string} - высота контейнера в единицах css; по умолчанию 480px.
     * @param {string} - ширина контейнера; по умолчанию 100%.
     */

    constructor(figure, height, width) {
        this._margin = { top: 10, right: 10, bottom: 20, left: 20 };
        this._figure = figure
        figure.style.width = width || '100%'
        figure.style.height = height || '480px'
    }

    set marginTop(value)    { this._margin.top    = value }
    set marginRight(value)  { this._margin.right  = value }
    set marginBottom(value) { this._margin.bottom = value }
    set marginLeft(value)   { this._margin.left   = value }

    /**
     * Сеттер для подписи к графику.
     * @param {string} - подпись к графику в формате html.
     */ 
    set caption(value)      { d3.select(this._figure).append("figcaption").html(value) }

    get svg() {
        this._svg = this._svg || d3.select(this._figure).append("svg")
            .attr("width", this._figure.offsetWidth)
            .attr("height", this._figure.offsetHeight)
        return this._svg
    }

    get graphics() {
        const { top, left } = this._margin;
        const { width, height } = this.dimensions
        const svg = this._svg || this.svg
        this._graphics = this._graphics || svg.append("g")
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${left},${top})`) 
        return this._graphics
    }

    get dimensions() {
        const svg = this._svg || this.svg
        const { top, right, bottom, left } = this._margin;
        if(!this._width){
            this._width = +svg.attr("width") - left - right
            this._height = +svg.attr("height") - top - bottom 
        }
        const width = this._width
        const height = this._height
        return {width, height}
    }

    get space(){
        const g = this.graphics
        const {width, height} = this.dimensions
        return {d3: d3, g, width, height}
    }

    /**
     * Здесь настраиваются домены по данным. Метод следует перезагружать вкаждом классе-наследнике.
     * @param {object} - данные для графика;
     * @param {number} - ширина (вычислена заранее)
     * @param {number} - высота (вычислена заранее)
     */ 
    setupDomains(data, width, height){if(!data || !width || !height) return}


    /**
     * Здесь настраиваются оси графика. Метод следует перезагружать вкаждом классе-наследнике.
     * @param {object} - данные для графика;
     * @param {number} - ширина (вычислена заранее)
     * @param {number} - высота (вычислена заранее)
     */ 
    setupAxes(data, width, height){if(!data || !width || !height) return}


    /**
     * Рисование графика. Метод не следует перезагружать, только вызывать после того, как выполнены все настройки.
     * @param {string} - подпись к графику в формате html.
     */ 
    draw(data){
        const {d3, g, width, height} = this.space
        this.setupAxes(data, width, height)
        this.setupDomains(data, width, height)
        this.adjust(d3, g, width, height, data)
    }


    /**
     * Рисование произвольных графиков. Метод следует перезагружать в классах-наследниках.
     * @param {object} - набор библиотек d3;
     * @param {object} - базовый svg-объект, внутри которого рисуется всё остальное;
     * @param {number} - вычисленная ширина;
     * @param {number} - вычисленная высота;
     * @param {object} - данные для построения графика.
     */ 
    adjust(d3, g, width, height, data){
        return d3 || g || width || height || data // just a stub
    }
}

export default D3Canvas
