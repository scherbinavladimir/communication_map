class GeoObjectDrawer{
    constructor(
        map,
        button,
        kmlUrl,
    ) {
        this.map = map
        this.button = button
        this.kmlUrl = kmlUrl
        this.geoObjects = null
        this.addButtonListener()
    }
    addButtonListener(){
        this.button.onclick = async (e)=>{
            const draw = !e.target.classList.contains('active')
            if (draw && !this.geoObjects){
                this.geoObjects = await ymaps.geoXml.load(this.kmlUrl)
            }
            this.onGeoXmlLoad(this.geoObjects, draw)
            e.target.classList.toggle('active');
        }
    }
    onGeoXmlLoad(res, draw=true) {
        this.setOptions(res.geoObjects)
        res.geoObjects
        if (draw){
            this.map.geoObjects.add(res.geoObjects);
            if (res.mapState) {
                res.mapState.applyToMap(this.map);
            }
            else {
                this.map.setBounds(res.geoObjects.getBounds());
            }
        } else {
            this.map.geoObjects.remove(res.geoObjects);
        }
    }
    setOptions(geoObjects){
        if (this.kmlUrl.includes('kadastr')){
             geoObjects.options.set({
                 iconLayout: 'default#image',
                 iconImageHref: 'static/placemark.png',
                 iconImageSize: [20, 20],
                 // icons: {href: 'static/placemark.png', size: [10, 10]}
             })
        } else {
            geoObjects.options.set({
                preset: 'islands#grayStretchyIcon',
                iconContentLayout: ymaps.templateLayoutFactory.createClass('<span>{{ properties.name }}</span>'),
                // iconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="font-size: 10px; background-color: #0a58ca; border-radius: 3px; display: flex; flex-wrap: nowrap">{{ properties.name }}</div>'),
                // iconLayout: 'default#imageWithContent',
            })
        }
    }
    geoObjectsHandler(){
        this.map.geoObjects.each(geoObject=>{
            console.log(geoObject)
        });
    }
}
