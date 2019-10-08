$( new class App{
    Body;
    constructor() {

        this.Body = $("body");
        this.CarPanelWrap = $("#ccqj-car-panel-wrap");
        this.CarPanel = $("#ccqj-car-panel");
        this.VehicleReportForm = $(document.forms.vehicleHistoryReport);

        this.Body.removeClass("loading");
        this.event();

        this.counterize();

    }

    event() {
        this.CarPanel.children().on("click", this.selectCar);
        this.CarPanelWrap.children(".ccqj-car-nav").on("click", this.panCarousel);

        this.VehicleReportForm.on("submit", e => {
            e.preventDefault();
        })
    }

    counterize() {
        const eles = document.querySelectorAll(".counterize");
        eles.forEach( el => {
            const to = Number($(el).data("to"));
            this.animateCounter( el, to );
        } )
    }

    animateCounter(el, to) {
        let counter = 0,
            speed = 10,
            increment = to / 300;
        let interval =  setInterval( function() {
            counter+=increment;
            el.innerText = counter.toFixed(0);
            if( counter >= to ) {
                clearInterval(interval)
                el.innerText = to;
            };
        }, speed);
    }

    selectCar = e => {
        this.CarPanel.children().removeClass("selected");
        $(e.currentTarget).addClass("selected");
    }

    panCarousel = e => {
        const isLeft = $(e.currentTarget).hasClass("pan-left");
        const currentLeft = this.CarPanel[0].scrollLeft;
        const scrollWidth = this.CarPanel[0].scrollWidth;
        const carpanelWidth = this.CarPanel[0].clientWidth
        const delta = isLeft ? -200 : 200;

        if( ((currentLeft+delta)+carpanelWidth)>=scrollWidth ) {
            this.CarPanelWrap.children(".pan-right").addClass("disabled");
        } else {
            this.CarPanelWrap.children(".pan-right").removeClass("disabled");
        }
        if( (currentLeft+delta)<=0 ) {
            this.CarPanelWrap.children(".pan-left").addClass("disabled");
        } else {
            this.CarPanelWrap.children(".pan-left").removeClass("disabled");
        }

        if(isLeft) {
            this.CarPanel.animate({ scrollLeft: '-=200' }, 500 );
        }else{
            this.CarPanel.animate({ scrollLeft: '+=200' }, 500);
        }
    }

} );