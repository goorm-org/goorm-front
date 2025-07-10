import AddTripDrawerFloatButton from "./_components/add-trip-drawer-float-button";
import SavedPlaceList from "./_components/saved-place-list";

export default function Save() {
  return (
    <div className="px-[24px] pt-[24px] pb-[50px]">
      <div className="font-bold text-[24px] px-[8px]">Saved Place List</div>
      <div className="mt-[24px]">
        <SavedPlaceList />
      </div>
      <AddTripDrawerFloatButton />
    </div>
  );
}
