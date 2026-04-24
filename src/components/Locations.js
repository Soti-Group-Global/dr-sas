"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const locations = [
  {
    city: "г. Москва",
    clinic: "Медиицнский центр «СОФОС»",
    address: "Аминьевское шоссе, д 6, этаж 4,5 \nБизнес-центр KVARTAL WEST",
    popupAddress:
      "Аминьевское шоссе, д 6, этаж 4,5 \nБизнес-центр KVARTAL WEST",
    phones: ["+7 (495) 324-11-11"],
    coords: [55.707354, 37.457279],
    hintContent: "Медиицнский центр «СОФОС»",
    color: "#f09856",
  },
  {
    city: "г. Щелково",
    clinic: "Национальный диагностический центр",
    address: "ул. Фабричная, д. 1 \nул. Комсомольская, д. 5Б",
    popupAddress: "ул. Комсомольская, д. 5Б",
    phones: [
      "+7 (499) 112-39-09",
      "+7 (496) 250-06-78",
      "+7 (495) 127-07-75",
      "+7 (926) 900-79-58 (WhatsApp)",
    ],
    coords: [55.929527, 37.993356],
    hintContent: "НДЦ Комсомольская",
    color: "#033b4a",
  },
  {
    city: "г. Щелково",
    clinic: "Национальный диагностический центр",
    address: "ул. Фабричная, д. 1",
    popupAddress: "ул. Фабричная, д. 1",
    phones: [
      "+7 (499) 112-39-09",
      "+7 (496) 250-06-78",
      "+7 (495) 127-07-75",
      "+7 (926) 900-79-58 (WhatsApp)",
    ],
    coords: [55.913856, 38.012759],
    hintContent: "НДЦ Фабричная",
    color: "#033b4a",
  },
];

export default function Locations() {
  return (
    <section id="contacts" className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-primary">
            Где принимает доктор САС
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {locations.slice(0, 2).map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8 bg-white">
                <p className="text-sm text-primary font-medium mb-2">
                  {location.city}
                </p>

                <h3 className="text-2xl font-semibold text-primary/90 mb-4">
                  {location.clinic}
                </h3>

                <div className="flex gap-2 text-primary/80 mb-4 whitespace-pre-line">
                  <MapPin size={18} className="mt-1 text-primary" />
                  <p>{location.address}</p>
                </div>

                <div className="space-y-2">
                  {location.phones.map((phone) => (
                    <div
                      key={phone}
                      className="flex items-center gap-2 text-primary/80"
                    >
                      {phone.includes("WhatsApp") ? (
                        <MessageCircle size={16} className="text-secondary" />
                      ) : (
                        <Phone size={16} className="text-primary" />
                      )}
                      <span>{phone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🗺️ Combined Map */}
        <div className="h-[450px] rounded-3xl overflow-hidden shadow">
          <YandexMap
            center={[55.8, 37.7]}
            zoom={9}
            placemarks={locations.map((loc) => ({
              coords: loc.coords,
              title: loc.clinic,
              address: loc.popupAddress,
              phone: loc.phones[0],
              hintContent: loc.hintContent,
            }))}
            language="ru_RU"
          />
        </div>
      </div>
    </section>
  );
}

const YandexMap = ({ center, zoom, placemarks, language }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (window.ymaps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?lang=${language}`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && window.ymaps) {
      initMap();
    }
  }, [language, center, zoom]);

  const initMap = () => {
    if (!window.ymaps || !mapRef.current) return;

    window.ymaps.ready(() => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        const map = new window.ymaps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          controls: ["zoomControl"],
        });

        if (!map || !map.geoObjects) {
          console.error("Map initialization failed");
          return;
        }

        // Apply grayscale to the map tiles
        const groundPane = map.panes.get("ground");
        if (groundPane && groundPane.getElement()) {
          groundPane.getElement().style.filter =
            "grayscale(1) sepia(0.01) brightness(0.98)";
        }

        placemarks.forEach((place) => {
          const placemark = new window.ymaps.Placemark(
            place.coords,
            {
              
              balloonContentHeader: `<strong>${place.title}</strong>`,
              balloonContentBody: `<span>${place.address}</span><br/><span>${place.phone}</span>`,
              hintContent: place.hintContent,
              
              iconCaption: place.hintContent,
            },
            {
              
              preset: "islands#orangeStretchyIcon",
              iconCaptionMaxWidth: "220",
            }
          );

          if (map.geoObjects) {
            map.geoObjects.add(placemark);
          }
        });

        // Fit map to show all placemarks
        const bounds = placemarks.map((p) => p.coords);
        map.setBounds(bounds, {
          checkZoomRange: true,
          zoomMargin: 60,
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error("Error initializing Yandex Map:", error);
      }
    });
  };

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};