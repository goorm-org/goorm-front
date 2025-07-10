"use client";

import { useEffect, useRef, useState, useId } from "react";
import { MapLocation } from "@/app/map/_types/tmap";
import { Drawer } from "vaul";
import useSWR from "swr";
import { getShortsList } from "./_api/map";
import PlaceBottomSheets from "@/app/_components/place-bottom-sheets";

export default function Map() {
  // const { data } = useSWR("getShortsList", getShortsList);
  // if (data) console.log("data", data);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapId = useId();

  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindows, setInfoWindows] = useState<any[]>([]);
  const [snap, setSnap] = useState<number | string | null>("320px");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    console.log("snapsnapsnap", snap);
  }, [snap]);

  // 임시 key (public)
  const APP_KEY = "2yslOxH45B2vlzRTsn7jc4XXChspjnwF2Rz5YThT";

  const width = "100%";
  const height = "calc(100dvh - 80px)";
  const zoom = 10;
  const locations = [
    {
      lat: 33.452651,
      lng: 126.92461,
      address: "서귀포시 성산읍 고성리 224-33",
      description: "광치기해변",
      category: "forest",
    },
    {
      lat: 33.450206,
      lng: 126.918408,
      address: "서귀포시 성산읍 동류암로 20",
      description: "플레이스 캠프 제주",
      category: "sunset",
    },
  ];

  const markerIconsMap = {
    forest:
      "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/forest.svg",
    local:
      "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/local.svg",
    quiet:
      "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/quiet.svg",
    sunset:
      "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/sunset.svg",
    beach:
      "https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/hansol/volcano.svg",
  };

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

  // 마커와 인포윈도우 생성
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

            // 마커 생성
            const marker = new window.Tmapv2.Marker({
              position,
              map,
              // TODO: api 나오면 맞춰서 수정
              icon: markerIconsMap[
                locations[i]?.category as keyof typeof markerIconsMap
              ],
              iconSize: new window.Tmapv2.Size(38, 31),
            });

            // 마커 클릭 이벤트
            marker.addListener("click", () => {
              setSnap("320px");
              setDrawerOpen(true);
            });
            newMarkers.push(marker);
          } catch (error) {
            console.error(`마커 생성 실패 (${location.description}):`, error);
          }
        }

        setMarkers(newMarkers);
        setInfoWindows(newInfoWindows);

        // 모든 마커가 보이도록 지도 범위 조정
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
    <div className="relative h-[calc(100dvh-80px)]">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600 mx-auto mb-4" />
        </div>
      )}
      <div ref={mapRef} id={`tmap-${mapId}`} style={{ width, height }} />
      {locations.length === 0 && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
          <p className="text-gray-500">표시할 위치가 없습니다.</p>
        </div>
      )}
      {/* place info bottom sheets */}
      <Drawer.Root
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        snapPoints={["320px", 1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <Drawer.Portal>
          <PlaceBottomSheets snap={snap} />
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
