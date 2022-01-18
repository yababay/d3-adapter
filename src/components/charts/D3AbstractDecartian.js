import D3Canvas from './D3Canvas.js'

class D3AbstractDecartian extends D3Canvas {
    constructor(figure, height, width) {
        super(figure, height, width)
    }

    set scaleX(value) { this._scaleX = value }
    set scaleY(value) { this._scaleY = value }

    set rangeX(value) {
        if(!this._scaleX) throw 'Не установлен масштаб для оси X.'
        this._rangeX = this._scaleX().range(value)
    }

    set rangeY(value) {
        if(!this._scaleY) throw 'Не установлен масштаб для оси Y.'
        this._rangeY = this._scaleY().range(value)
    }

    set domainX(value) {
        if(!this._rangeX) throw 'Не установлен диапазон для оси X.'
        this._domainX = this._rangeX().domain(value)
    }

    set domainY(value) {
        if(!this._rangeY) throw 'Не установлен диапазон для оси Y.'
        this._domainY = this._rangeY().domain(value)
    }

    setupDomains(data){
        throw 'Это абстрактный класс. Нужно реализовать домены данных.'
    }

    draw(data){
        setupDomains(data)
        const x = this.domainX
        const y = this.domainY
        if(!x) throw 'Не определен домен для оси X.'
        if(!y) throw 'Не определен домен для оси Y.'
        const {d3, g, width, height} = this.space()
        this.adjust(d3, g, width, height, data, x, y)
    }

    adjust(d3, g, width, height, data, x, y){ // quasi abstract method
        return d3 || g || x || y || width || height || data // just a stub
    }
}

export default D3AbstractDecartian

