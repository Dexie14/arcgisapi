import React from 'react';
import { useRef, useEffect } from 'react';
import { loadModules } from "esri-loader";


function Map() {
    const MapEl = useRef(null);

    useEffect(
        () => {
            let view;
            loadModules(["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer"],{
                css: true
            }).then(([MapView,WebMap,GeoJSONLayer])=>{
                    const webmap= new WebMap({
                        basemap:'topo-vector'
                    })
                    view= new MapView({
                        map:webmap,
                        // center:[-83,42],
                        center:[3.406448, 6.465422],
                        zoom:10,
                        // use ref as container
                        container:MapEl.current
                    })
                    const geojsonLayer= new GeoJSONLayer({
                        url:"ghttps://raw.githubusercontent.com/Dexie14/arcgisapi/master/arcGIS.geojson",
                    });
                    webmap.add(geojsonLayer);
                })

            return()=>{
                //close the view
                if(!!view){
                    view.destroy()
                    view=null
                }
            }
            })

  return (
    <div style={{height:800}} ref={MapEl}>

    </div>
  )
}

export default Map;
