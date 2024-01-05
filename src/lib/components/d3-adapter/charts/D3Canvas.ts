import * as d3 from 'd3'

/**
 * Базовый класс-канва для остальных графиков. Позволяет настроить поля, создать основные объекты.
 * @class
 */

class D3Canvas {

    static d3 = d3

    /**
     * Конструктор для создания svg-пространства с полями. Обратите внимание, что высота указывается перед шириной, т.к. чаще может возникнуть потребность в ее изменении. Ширина по умолчанию 100% от родительского элемента, что приемлемо в большинстве случаев.
     * @param {HTMLElement} - html-контейнер, в который будет вписан график
     * @param {string} - высота контейнера в единицах css; по умолчанию 480px.
     * @param {string} - ширина контейнера в единицах css; по умолчанию 100%.
     */

    constructor(figure, height, width) {
        this._margin = { top: 10, right: 10, bottom: 10, left: 10 };
        this._figure = figure
        figure.style.width = width || '100%'
        figure.style.height = height || '480px'
    }

    /**
     * Сеттер для отступа сверху.
     * @param {number} - в пикселях.
     */ 
    set marginTop(value)    { this._margin.top    = value }

    /**
     * Сеттер для отступа справа.
     * @param {number} - в пикселях.
     */ 
    set marginRight(value)  { this._margin.right  = value }

    /**
     * Сеттер для отступа снизу.
     * @param {number} - в пикселях.
     */ 
    set marginBottom(value) { this._margin.bottom = value }

    /**
     * Сеттер для отступа слева.
     * @param {number} - в пикселях.
     */ 
    set marginLeft(value)   { this._margin.left   = value }

    /**
     * Сеттер для подписи к графику.
     * @param {string} - подпись к графику, можно в формате html.
     */ 
    set caption(value)      { d3.select(this._figure).append("figcaption").html(value) }


    /**
     * Геттер для svg-пространства (без учета отступов).
     */ 
    get svg() {
        this._svg = this._svg || d3.select(this._figure).append("svg")
            .attr("width", this._figure.offsetWidth)
            .attr("height", this._figure.offsetHeight)
        return this._svg
    }

    /**
     * Геттер для основного svg-объекта, внутри которого размещается график (svg за вычетом отступов).
     */ 
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

    /**
     * Геттер, возвращающий ширину и высоту в едином объекте: {width, height}.
     */ 
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

    /**
     * Геттер, возвращающий основные объекты графика: {d3, g, width, height}.
     */ 
    get space(){
        const g = this.graphics
        const {width, height} = this.dimensions
        return {d3: d3, g, width, height}
    }

    /**
     * Здесь настраиваются домены по данным. Абстрактный метод, следует перезагружать в классах-наследниках.
     * @param {object} - данные для графика;
     * @param {number} - ширина (вычислена заранее)
     * @param {number} - высота (вычислена заранее)
     */ 
    setupDomains(data, width, height){ throw 'Это абстрактный метод (setupDomains).'}

    /**
     * Здесь настраиваются оси графика. Абстрактный метод, следует перезагружать в классах-наследниках.
     * @param {object} - данные для графика;
     * @param {number} - ширина (вычислена заранее)
     * @param {number} - высота (вычислена заранее)
     */ 
    setupAxes(data, width, height){throw 'Это абстрактный метод (setupAxes).'}

    /**
     * Рисование произвольных графиков. Абстрактный метод, следует перезагружать в классах-наследниках.
     * @param {object} - набор библиотек d3;
     * @param {object} - базовый svg-объект, внутри которого рисуется всё остальное;
     * @param {number} - вычисленная ширина;
     * @param {number} - вычисленная высота;
     * @param {object} - данные для построения графика.
     */ 
    adjust(d3, g, width, height, data){
        throw 'Это абстрактный метод (adjust).'
    }

    /**
     * Преобразование данных в требуемый формат. Лучше делать это вне данного класса, но если очень нужно - можно переопределить этот метод.
     * @param {string} - данные для отображения на графике.
     */ 

    setupData(data){
        return data
    }

    /**
     * Рисование графика. Метод не следует перезагружать, только вызывать после того, как выполнены все настройки.
     * @param {string} - данные для отображения на графике.
     */ 
    draw(data){
        const {d3, g, width, height} = this.space
        data = this.setupData(data)
        this.setupDomains(data, width, height)
        this.setupAxes(data, width, height)
        this.adjust(d3, g, width, height, data)
    }
}

export default D3Canvas
