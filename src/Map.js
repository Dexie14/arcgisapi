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

                    const renderer = {
                        type: "simple",
                        field: "PU CODE",
                        symbol: {
                          type: "simple-marker",
                          color: "orange",
                          outline: {
                            color: "white"
                          }
                        },
                        visualVariables: [
                          {
                            type: "color",
                            field: "PU CODE",
                            stops: [
                              {
                                value: "13/01/13/019",
                                color: "red"
                              },
                              {
                                value: "13/01/13/025",
                                color: "green"
                              }
                            ]
                          }
                        ]
                      };

                    const template = {
                        title: "Ado_Ekiti Location Features",
                        content: "Area Name: {PU NAME}",
                    }

                    view= new MapView({
                        map:webmap,
                        // center:[-83,42],
                        center:[3.406448, 6.465422],
                        zoom:8,
                        // use ref as container
                        container:MapEl.current
                    })
                    const geojsonLayer= new GeoJSONLayer({
                        url:"https://raw.githubusercontent.com/Dexie14/arcgisapi/master/arcGIS2.geojson",
                        renderer: renderer,
                        popupTemplate: template,
                        orderBy: {
                            field: "PU CODE"
                          }
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
