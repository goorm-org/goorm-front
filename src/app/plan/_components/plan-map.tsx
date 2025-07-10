/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useRef, useState, useId } from "react";
import { MapLocation } from "@/app/map/_types/tmap";

export default function PlanMap({
  width,
  height,
  zoom,
  locations,
}: {
  width: string;
  height: string;
  zoom: number;
  locations: MapLocation[];
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapId = useId();

  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindows, setInfoWindows] = useState<any[]>([]);
  // 경로선 상태
  const [polyline, setPolyline] = useState<any>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  // 여러 개의 polyline을 관리
  const [polylines, setPolylines] = useState<any[]>([]);

  // 임시 key (public)
  const APP_KEY = "2yslOxH45B2vlzRTsn7jc4XXChspjnwF2Rz5YThT";

  const markerIcons = [
    "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/ico-marker-one.svg",
    "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/ico-marker-two.svg",
    "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/ico-marker-three.svg",
  ];

  const CENTER_LAT = locations[1]?.lat || 33.450233;
  const CENTER_LNG = locations[1]?.lng || 126.918494;

  // 티맵 스크립트 로드
  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src*="tmapjs2.min.js"]`
    );

    if (existingScript) {
      const checkTmapLoaded = () => {
        if (window.Tmapv2 && typeof window.Tmapv2.Map === "function") {
          setIsLoaded(true);
        } else {
          setTimeout(checkTmapLoaded, 100);
        }
      };
      checkTmapLoaded();
      return;
    }

    if (!window.Tmapv2) {
      window.Tmapv2 = {
        _getScriptLocation: () =>
          "https://topopentile1.tmap.co.kr/scriptSDKV2/",
        VERSION_NUMBER: Math.random(),
      } as any;
    }

    const script = document.createElement("script");
    script.src = `https://topopentile1.tmap.co.kr/scriptSDKV2/tmapjs2.min.js?version=20231206&appKey=${APP_KEY}`;
    script.async = true;

    script.onload = () => {
      const checkTmapReady = () => {
        if (window.Tmapv2 && typeof window.Tmapv2.Map === "function") {
          setIsLoaded(true);
        } else {
          setTimeout(checkTmapReady, 100);
        }
      };
      checkTmapReady();
    };

    script.onerror = (error) => {
      console.error("티맵 스크립트 로드 실패:", error);
      console.error("API 키를 확인해주세요:", APP_KEY);
      const fallbackScript = document.createElement("script");
      fallbackScript.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${APP_KEY}`;
      fallbackScript.async = true;
      fallbackScript.onload = () => {
        setTimeout(() => {
          if (window.Tmapv2 && typeof window.Tmapv2.Map === "function") {
            setIsLoaded(true);
          }
        }, 2000);
      };
      document.head.appendChild(fallbackScript);
    };

    document.head.appendChild(script);

    return () => {
      const tmapScript = document.getElementById("tmap-script");
      if (tmapScript) {
        document.head.removeChild(tmapScript);
      }
    };
  }, [APP_KEY]);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    if (!window.Tmapv2 || typeof window.Tmapv2.Map !== "function") {
      console.error("Tmapv2.Map이 사용 가능하지 않습니다.");
      return;
    }
    try {
      const tmapInstance = new window.Tmapv2.Map(`tmap-${mapId}`, {
        center: new window.Tmapv2.LatLng(CENTER_LAT, CENTER_LNG),
        width,
        height,
        zoom,
        scrollwheel: true,
        zoomControl: false,
      });
      setMap(tmapInstance);
    } catch (error) {
      console.error("지도 초기화 실패:", error);
    }
  }, [isLoaded, width, height, zoom, CENTER_LAT, CENTER_LNG]);

  // 주소를 좌표로 변환하는 함수
  const geocodeAddress = async (
    address: string
  ): Promise<{ lat: number; lng: number } | null> => {
    try {
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&coordType=WGS84GEO&fullAddr=${encodeURIComponent(
          address
        )}`,
        {
          headers: {
            appKey: APP_KEY!,
          },
        }
      );
      const data = await response.json();
      const coordinateInfo = data.coordinateInfo;
      if (
        coordinateInfo &&
        coordinateInfo.coordinate &&
        coordinateInfo.coordinate.length > 0
      ) {
        const coord = coordinateInfo.coordinate[0];
        const lat = parseFloat(coord.lat || coord.newLat);
        const lng = parseFloat(coord.lon || coord.newLon);
        return { lat, lng };
      }
      return null;
    } catch (error) {
      console.error("지오코딩 실패:", error);
      return null;
    }
  };

  // 도보 경로 API 호출 및 Polyline 그리기 함수
  const drawRoute = async (
    start: { lat?: number; lng?: number },
    end: { lat?: number; lng?: number },
    mapInstance: any
  ) => {
    setRouteError(null); // 초기화
    // lat/lng 타입 가드
    if (
      typeof start.lat !== "number" ||
      typeof start.lng !== "number" ||
      typeof end.lat !== "number" ||
      typeof end.lng !== "number"
    ) {
      console.warn("경로 그리기: 좌표값이 올바르지 않습니다.");
      return;
    }
    try {
      const response = await fetch(
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            appKey: APP_KEY!,
          },
          body: JSON.stringify({
            startX: start.lng.toString(),
            startY: start.lat.toString(),
            endX: end.lng.toString(),
            endY: end.lat.toString(),
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            startName: "출발지",
            endName: "도착지",
          }),
        }
      );
      const data = await response.json();

      // features가 배열인지 체크
      const resultData = data.features;
      if (!Array.isArray(resultData)) {
        console.error("경로 API 응답 오류: features가 배열이 아님", data);
        if (polyline) {
          polyline.setMap(null); // 기존 경로선 제거
          setPolyline(null);
        }
        if (data.error?.message) {
          setRouteError(data.error.message);
        }
        return;
      }

      const linePoints: any[] = [];
      for (const feature of resultData) {
        if (feature.geometry.type === "LineString") {
          for (const coord of feature.geometry.coordinates) {
            // EPSG3857 → WGS84GEO 변환 (window.Tmapv2 as any)
            const point = new (window.Tmapv2 as any).Point(coord[0], coord[1]);
            const latlng = (
              window.Tmapv2 as any
            ).Projection.convertEPSG3857ToWGS84GEO(point);
            linePoints.push(
              new (window.Tmapv2 as any).LatLng(latlng._lat, latlng._lng)
            );
          }
        }
      }
      // 기존 polyline 제거
      if (polyline) {
        polyline.setMap(null);
      }
      // Polyline 생성 (window.Tmapv2 as any)
      const newPolyline = new (window.Tmapv2 as any).Polyline({
        path: linePoints,
        strokeColor: "#3890a8",
        strokeWeight: 6,
        map: mapInstance,
      });
      setPolyline(newPolyline);
    } catch (error) {
      setRouteError("경로 그리기 실패");
      console.error("경로 그리기 실패:", error);
    }
  };

  // 여러 개의 polyline을 관리
  const drawRoutes = async (locations: MapLocation[], mapInstance: any) => {
    // 기존 경로선 제거
    polylines.forEach((pl) => pl.setMap(null));
    setPolylines([]);

    const newPolylines: any[] = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const start = locations[i];
      const end = locations[i + 1];
      // 각 구간별로 경로 API 호출 및 polyline 생성
      try {
        // lat/lng 타입 가드 및 주소 변환
        let startLat = start.lat;
        let startLng = start.lng;
        let endLat = end.lat;
        let endLng = end.lng;
        if (!startLat || !startLng) {
          const coords = await geocodeAddress(start.address);
          if (coords) {
            startLat = coords.lat;
            startLng = coords.lng;
          } else {
            console.warn(`주소를 좌표로 변환할 수 없습니다: ${start.address}`);
            continue;
          }
        }
        if (!endLat || !endLng) {
          const coords = await geocodeAddress(end.address);
          if (coords) {
            endLat = coords.lat;
            endLng = coords.lng;
          } else {
            console.warn(`주소를 좌표로 변환할 수 없습니다: ${end.address}`);
            continue;
          }
        }
        // 경로 API 호출
        const response = await fetch(
          "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              appKey: APP_KEY!,
            },
            body: JSON.stringify({
              startX: startLng.toString(),
              startY: startLat.toString(),
              endX: endLng.toString(),
              endY: endLat.toString(),
              reqCoordType: "WGS84GEO",
              resCoordType: "EPSG3857",
              startName: start.description || "출발지",
              endName: end.description || "도착지",
            }),
          }
        );
        const data = await response.json();
        const resultData = data.features;
        if (!Array.isArray(resultData)) {
          console.error("경로 API 응답 오류: features가 배열이 아님", data);
          continue;
        }
        const linePoints: any[] = [];
        for (const feature of resultData) {
          if (feature.geometry.type === "LineString") {
            for (const coord of feature.geometry.coordinates) {
              const point = new (window.Tmapv2 as any).Point(
                coord[0],
                coord[1]
              );
              const latlng = (
                window.Tmapv2 as any
              ).Projection.convertEPSG3857ToWGS84GEO(point);
              linePoints.push(
                new (window.Tmapv2 as any).LatLng(latlng._lat, latlng._lng)
              );
            }
          }
        }
        if (linePoints.length > 0) {
          const newPolyline = new (window.Tmapv2 as any).Polyline({
            path: linePoints,
            strokeColor: "#3890a8",
            strokeWeight: 6,
            map: mapInstance,
          });
          newPolylines.push(newPolyline);
        }
      } catch (error) {
        console.error(
          `경로 그리기 실패 (${start.description} → ${end.description}):`,
          error
        );
      }
    }
    setPolylines(newPolylines);
  };

  // 마커와 인포윈도우 생성 및 경로선 그리기
  useEffect(() => {
    if (!map || !window.Tmapv2 || locations.length < 2) return;
    const requiredClasses = [
      "LatLngBounds",
      "LatLng",
      "Marker",
      "InfoWindow",
      "Size",
    ];
    for (const className of requiredClasses) {
      if (
        typeof window.Tmapv2[className as keyof typeof window.Tmapv2] !==
        "function"
      ) {
        console.error(`Tmapv2.${className}이 사용 가능하지 않습니다.`);
        return;
      }
    }
    const processlocations = async () => {
      // 기존 마커들 제거
      markers.forEach((marker) => {
        try {
          marker.setMap(null);
        } catch (error) {
          console.warn("마커 제거 중 오류:", error);
        }
      });
      // 기존 인포윈도우들 제거
      infoWindows.forEach((infoWindow) => {
        try {
          infoWindow.setMap(null);
        } catch (error) {
          console.warn("인포윈도우 제거 중 오류:", error);
        }
      });
      const newMarkers: any[] = [];
      const newInfoWindows: any[] = [];
      try {
        const bounds = new window.Tmapv2.LatLngBounds();
        for (let i = 0; i < locations.length; i++) {
          const location = locations[i];
          let lat = location.lat;
          let lng = location.lng;
          if (!lat || !lng) {
            const coords = await geocodeAddress(location.address);
            if (coords) {
              lat = coords.lat;
              lng = coords.lng;
            } else {
              console.warn(
                `주소를 좌표로 변환할 수 없습니다: ${location.address}`
              );
              continue;
            }
          }
          try {
            const position = new window.Tmapv2.LatLng(lat, lng);
            bounds.extend(position);
            const marker = new window.Tmapv2.Marker({
              position,
              map,
              icon: markerIcons[i],
              iconSize: new window.Tmapv2.Size(38, 31),
            });
            const infoWindow = new window.Tmapv2.InfoWindow({
              position,
              content: "",
              background: false,
              border: "0px solid #3890a8",
              type: 2,
              align: window.Tmapv2.InfoWindowOptions.ALIGN_CENTERTOP,
              map: map,
            });
            newMarkers.push(marker);
            newInfoWindows.push(infoWindow);
          } catch (error) {
            console.error(`마커 생성 실패 (${location.description}):`, error);
          }
        }
        setMarkers(newMarkers);
        setInfoWindows(newInfoWindows);
        if (newMarkers.length > 1) {
          try {
            map.fitBounds(bounds);
          } catch (error) {
            console.warn("지도 범위 조정 실패:", error);
          }
        } else if (newMarkers.length === 1) {
          try {
            map.setCenter(newMarkers[0].getPosition());
          } catch (error) {
            console.warn("지도 중심 설정 실패:", error);
          }
        }
        // 모든 지점 쌍에 대해 경로 그리기
        if (locations.length > 1) {
          await drawRoutes(locations, map);
        }
      } catch (error) {
        console.error("위치 처리 중 전체 오류:", error);
      }
    };
    processlocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  // 지도 클릭 시 모든 인포윈도우 닫기
  useEffect(() => {
    if (!map) return;
    const handleMapClick = () => {
      infoWindows.forEach((infoWindow) => infoWindow.setMap(null));
    };
    map.addListener("click", handleMapClick);
    return () => {
      if (map) {
        map.removeListener("click", handleMapClick);
      }
    };
  }, [map, infoWindows]);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600 mx-auto mb-4" />
        </div>
      )}
      {routeError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow">
          {routeError}
        </div>
      )}
      <div ref={mapRef} id={`tmap-${mapId}`} style={{ width, height }} />
      {locations.length === 0 && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
          <p className="text-gray-500">표시할 위치가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
