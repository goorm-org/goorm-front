"use client";

import { useEffect, useRef, useState, useId } from "react";
import { MapLocation } from "./_types/tmap";

export default function TmapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapId = useId();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [infoWindows, setInfoWindows] = useState<any[]>([]);

  const APP_KEY = process.env.NEXT_PUBLIC_T_MAP_KEY;
  const LOCATIONS: MapLocation[] = [
    {
      lat: 33.505512,
      lng: 126.954048,
      address: "제주시 우도면",
      description: "우도",
    },
    {
      lat: 33.440708,
      lng: 126.898767,
      address: "서귀포시 성산읍 서성일로 1168번길",
      description: "빛의 벙커",
    },
  ];
  const WIDTH = "100%";
  const HEIGHT = "100dvh";
  const ZOOM = 15;
  const CENTER_LAT = 33.450206;
  const CENTER_LNG = 126.918408;

  // 티맵 스크립트 로드
  useEffect(() => {
    // 이미 로드된 스크립트가 있는지 확인
    const existingScript = document.querySelector(
      `script[src*="tmapjs2.min.js"]`
    );

    if (existingScript) {
      // 스크립트는 있지만 Tmapv2가 로드되지 않은 경우 대기
      const checkTmapLoaded = () => {
        if (window.Tmapv2 && typeof window.Tmapv2.Map === "function") {
          console.log("기존 티맵 라이브러리 확인됨");
          setIsLoaded(true);
        } else {
          setTimeout(checkTmapLoaded, 100);
        }
      };
      checkTmapLoaded();
      return;
    }

    // window.Tmapv2 초기화 (티맵 API가 필요로 하는 구조)
    if (!window.Tmapv2) {
      window.Tmapv2 = {
        _getScriptLocation: () =>
          "https://topopentile1.tmap.co.kr/scriptSDKV2/",
        VERSION_NUMBER: Math.random(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    }

    // 실제 티맵 라이브러리 직접 로드
    const script = document.createElement("script");
    script.src = `https://topopentile1.tmap.co.kr/scriptSDKV2/tmapjs2.min.js?version=20231206&appKey=${APP_KEY}`;
    script.async = true;

    script.onload = () => {
      // 스크립트 로드 후 Tmapv2 객체가 사용 가능한지 확인
      const checkTmapReady = () => {
        if (window.Tmapv2 && typeof window.Tmapv2.Map === "function") {
          console.log("티맵 라이브러리가 성공적으로 로드되었습니다.");
          setIsLoaded(true);
        } else {
          console.log("티맵 라이브러리 로딩 대기 중...");
          setTimeout(checkTmapReady, 100);
        }
      };
      checkTmapReady();
    };

    script.onerror = (error) => {
      console.error("티맵 스크립트 로드 실패:", error);
      console.error("API 키를 확인해주세요:", APP_KEY);

      // fallback: 원래 방식으로 시도
      const fallbackScript = document.createElement("script");
      fallbackScript.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${APP_KEY}`;
      fallbackScript.async = true;
      fallbackScript.onload = () => {
        setTimeout(() => {
          if (window.Tmapv2 && typeof window.Tmapv2.Map === "function") {
            console.log("Fallback 스크립트로 로드 성공");
            setIsLoaded(true);
          }
        }, 2000); // 더 긴 대기 시간
      };
      document.head.appendChild(fallbackScript);
    };

    document.head.appendChild(script);

    return () => {
      // 언마운트 시 스크립트 제거
      const tmapScript = document.getElementById("tmap-script");
      if (tmapScript) {
        document.head.removeChild(tmapScript);
      }
    };
  }, [APP_KEY]);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // Tmapv2 객체와 Map 클래스 존재 확인
    if (!window.Tmapv2 || typeof window.Tmapv2.Map !== "function") {
      console.error("Tmapv2.Map이 사용 가능하지 않습니다.");
      return;
    }

    try {
      const tmapInstance = new window.Tmapv2.Map(`tmap-${mapId}`, {
        center: new window.Tmapv2.LatLng(CENTER_LAT, CENTER_LNG),
        width: WIDTH,
        height: HEIGHT,
        zoom: ZOOM,
        zoomControl: true,
        scrollwheel: true,
      });

      setMap(tmapInstance);
      console.log("지도가 성공적으로 초기화되었습니다.");
    } catch (error) {
      console.error("지도 초기화 실패:", error);
    }
  }, [isLoaded, WIDTH, HEIGHT, ZOOM, CENTER_LAT, CENTER_LNG]); // mapId 제거

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

  // 마커와 인포윈도우 생성
  useEffect(() => {
    if (!map || !window.Tmapv2 || LOCATIONS.length === 0) return;

    // Tmapv2 클래스들이 모두 사용 가능한지 확인
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

    // 기존 마커와 인포윈도우 제거 (함수 스코프에서 참조)
    const processLocations = async () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newMarkers: any[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newInfoWindows: any[] = [];

      try {
        const bounds = new window.Tmapv2.LatLngBounds();

        for (const location of LOCATIONS) {
          let lat = location.lat;
          let lng = location.lng;

          // 좌표가 없으면 주소로 지오코딩
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

            // 마커 생성
            const marker = new window.Tmapv2.Marker({
              position,
              map,
              //   icon: '/upload/tmap/marker/pin_b_m_a.png',
              iconSize: new window.Tmapv2.Size(24, 38),
            });

            // 인포윈도우 컨텐츠 생성
            const content = `
                <div style="
                  padding: 0;
                  margin: 0;
                  position: relative;
                  width: fit-content;
                  min-width: 120px;
                  max-width: 200px;
                  height: fit-content;
                  border-radius: 12px;
                  overflow: hidden;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">
                  <!-- 헤더 섹션 -->
                  <div style="
                    padding: 4px 8px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                  ">
                    <div style="
                      margin-bottom: 4px;
                      font-size: 13px;
                      font-weight: 500;
                      text-align: center;
                      line-height: 1.4;
                      color: #1f2937;
                      white-space: nowrap;
                    ">
                      ${location.address}
                    </div>
                  </div>
                </div>
              `;

            // 인포윈도우 생성 (초기에는 숨김)
            const infoWindow = new window.Tmapv2.InfoWindow({
              position,
              content,
              background: false,
              border: "0px solid #FF0000",
              type: 2,
              align: window.Tmapv2.InfoWindowOptions.ALIGN_CENTERTOP,
              map: map, // 초기에는 표시하지 않음
            });

            // // 마커 클릭 이벤트
            // marker.addListener('click', () => {
            //   try {
            //     // 다른 인포윈도우 닫기
            //     newInfoWindows.forEach(iw => iw.setMap(null));
            //     // 클릭한 마커의 인포윈도우 표시
            //     infoWindow.setMap(map);
            //   } catch (error) {
            //     console.error('인포윈도우 표시 중 오류:', error);
            //   }
            // });

            newMarkers.push(marker);
            newInfoWindows.push(infoWindow);
          } catch (error) {
            console.error(`마커 생성 실패 (${location.title}):`, error);
          }
        }

        setMarkers(newMarkers);
        setInfoWindows(newInfoWindows);

        // 모든 마커가 보이도록 지도 범위 조정
        if (newMarkers.length > 1) {
          try {
            map.fitBounds(bounds);
            console.log(
              `${newMarkers.length}개의 마커로 지도 범위를 조정했습니다.`
            );
          } catch (error) {
            console.warn("지도 범위 조정 실패:", error);
          }
        } else if (newMarkers.length === 1) {
          try {
            map.setCenter(newMarkers[0].getPosition());
            console.log("단일 마커를 중심으로 지도를 설정했습니다.");
          } catch (error) {
            console.warn("지도 중심 설정 실패:", error);
          }
        }
      } catch (error) {
        console.error("위치 처리 중 전체 오류:", error);
      }
    };

    processLocations();
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">지도를 로딩 중입니다...</p>
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        id={`tmap-${mapId}`}
        style={{ width: WIDTH, height: HEIGHT }}
        className="rounded-lg shadow-lg"
      />
      {LOCATIONS.length === 0 && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
          <p className="text-gray-500">표시할 위치가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
