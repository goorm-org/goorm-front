"use client";

import { Checkbox } from "@vapor-ui/core";
import useSavedPlaceList from "../_hooks/useSavedPlaceList";
import SavedPlaceListItem from "./saved-place-list-item";
import DeleteDialogButton from "./delete-dialog-button";

export interface SavedPlaceListProps {
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
}

export default function SavedPlaceList({
  selectedItems,
  setSelectedItems,
}: SavedPlaceListProps) {
  const { data, error, isLoading } = useSavedPlaceList();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700 mx-auto mb-2"></div>
          <p className="text-gray-600">저장된 장소를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-red-600 mb-2">
            저장된 장소를 불러오는데 실패했습니다.
          </p>
          <p className="text-gray-500 text-sm">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-gray-600">저장된 장소가 없습니다.</p>
        </div>
      </div>
    );
  }

  const handleSelectAll = () => {
    if (selectedItems.length === data?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.map((item) => item.id) || []);
    }
  };

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex items-center justify-between">
        <Checkbox.Root
          size="lg"
          onCheckedChange={handleSelectAll}
          checked={selectedItems.length === data?.length}
        >
          <Checkbox.Control />
          <Checkbox.Label>{`Select All (${1}/${1})`}</Checkbox.Label>
        </Checkbox.Root>
        <DeleteDialogButton selectedItems={selectedItems} />
      </div>
      <div className="flex flex-col">
        {data?.map((item) => (
          <SavedPlaceListItem
            key={item.id}
            item={item}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItems([...selectedItems, item.id]);
                return;
              }
              setSelectedItems(selectedItems.filter((id) => id !== item.id));
            }}
          />
        ))}
      </div>
    </div>
  );
}
