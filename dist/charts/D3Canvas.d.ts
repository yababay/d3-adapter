import * as d3 from 'd3';
/**
 * Базовый класс-канва для остальных графиков. Позволяет настроить поля, создать основные объекты.
 * @class
 */
declare abstract class D3Canvas {
    #private;
    /**
     * Конструктор для создания svg-пространства с полями. Обратите внимание, что высота указывается перед шириной, т.к. чаще может возникнуть потребность в ее изменении. Ширина по умолчанию 100% от родительского элемента, что приемлемо в большинстве случаев.
     * @param {HTMLElement} - html-контейнер, в который будет вписан график
     * @param {string} - высота контейнера в единицах css; по умолчанию 480px.
     * @param {string} - ширина контейнера в единицах css; по умолчанию 100%.
     */
    constructor(figure: HTMLElement, height?: number, width?: number);
    /**
     * Сеттер для отступа сверху.
     * @param {number} - в пикселях.
     */
    set marginTop(value: number);
    /**
     * Сеттер для отступа справа.
     * @param {number} - в пикселях.
     */
    set marginRight(value: number);
    /**
     * Сеттер для отступа снизу.
     * @param {number} - в пикселях.
     */
    set marginBottom(value: number);
    /**
     * Сеттер для отступа слева.
     * @param {number} - в пикселях.
     */
    set marginLeft(value: number);
    /**
     * Сеттер для подписи к графику.
     * @param {string} - подпись к графику, можно в формате html.
     */
    set caption(value: string);
    /**
     * Геттер для svg-пространства (без учета отступов).
     */
    get svg(): d3.Selection<HTMLElement, unknown, null, undefined> | d3.Selection<SVGSVGElement, unknown, null, undefined>;
    /**
     * Геттер для основного svg-объекта, внутри которого размещается график (svg за вычетом отступов).
     */
    get graphics(): d3.Selection<SVGGElement, unknown, null, undefined>;
    /**
     * Геттер, возвращающий ширину и высоту в едином объекте: {width, height}.
     */
    get dimensions(): {
        width: number;
        height: number;
    };
    /**
     * Геттер, возвращающий основные объекты графика: {d3, g, width, height}.
     */
    get space(): {
        d3: typeof d3;
        g: d3.Selection<SVGGElement, unknown, null, undefined>;
        width: number;
        height: number;
    };
    /**
     * Здесь настраиваются домены по данным. Абстрактный метод, следует перезагружать в классах-наследниках.
     * @param {object} - данные для графика;
     * @param {number} - ширина (вычислена заранее)
     * @param {number} - высота (вычислена заранее)
     */
    abstract setupDomains(data: any[], width: number, height: number): void;
    /**
     * Здесь настраиваются оси графика. Абстрактный метод, следует перезагружать в классах-наследниках.
     * @param {object} - данные для графика;
     * @param {number} - ширина (вычислена заранее)
     * @param {number} - высота (вычислена заранее)
     */
    abstract setupAxes(data: any[], width: number, height: number): void;
    /**
     * Рисование произвольных графиков. Абстрактный метод, следует перезагружать в классах-наследниках.
     * @param {object} - набор библиотек d3;
     * @param {object} - базовый svg-объект, внутри которого рисуется всё остальное;
     * @param {number} - вычисленная ширина;
     * @param {number} - вычисленная высота;
     * @param {object} - данные для построения графика.
     */
    abstract adjust(g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number, data: any[]): void;
    /**
     * Преобразование данных в требуемый формат. Лучше делать это вне данного класса, но если очень нужно - можно переопределить этот метод.
     * @param {string} - данные для отображения на графике.
     */
    setupData(data: any[]): any[];
    /**
     * Рисование графика. Метод не следует перезагружать, только вызывать после того, как выполнены все настройки.
     * @param {string} - данные для отображения на графике.
     */
    draw(data: any[]): void;
}
export default D3Canvas;
