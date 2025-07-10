"use client";

export interface ShortsBookmarkProps {
  isBookmarked: boolean;
  onToggle: () => void;
}

export default function ShortsBookmark({
  isBookmarked,
  onToggle,
}: ShortsBookmarkProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      className="flex flex-col"
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
    >
      {isBookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <g clipPath="url(#clip0_50_18254)">
            <g filter="url(#filter0_d_50_18254)">
              <path
                d="M17.9999 29.2166L10.7642 32.3176C9.61568 32.8057 8.52459 32.7124 7.49093 32.0377C6.45726 31.3629 5.94043 30.4082 5.94043 29.1736V6.82055C5.94043 5.87302 6.27781 5.06188 6.95256 4.38713C7.62731 3.71238 8.43845 3.375 9.38598 3.375H26.6137C27.5613 3.375 28.3724 3.71238 29.0472 4.38713C29.7219 5.06188 30.0593 5.87302 30.0593 6.82055V29.1736C30.0593 30.4082 29.5424 31.3629 28.5088 32.0377C27.4751 32.7124 26.384 32.8057 25.2355 32.3176L17.9999 29.2166Z"
                fill="white"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_50_18254"
              x="2.94043"
              y="1.375"
              width="30.1191"
              height="35.25"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_50_18254"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_50_18254"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_50_18254">
              <rect width="36" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <g clipPath="url(#clip0_50_18247)">
            <g filter="url(#filter0_d_50_18247)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0003 26.0798L26.5109 29.6368C26.8074 29.7607 27.1345 29.5429 27.1345 29.2216V6.75C27.1345 6.50147 26.933 6.3 26.6845 6.3H9.31445C9.06593 6.3 8.86445 6.50147 8.86445 6.75V29.2218C8.86445 29.5431 9.19149 29.7609 9.48796 29.637L18.0003 26.0798ZM18.0002 29.25L25.383 32.3355C27.6065 33.2648 30.0595 31.6314 30.0595 29.2216V6.75C30.0595 4.88604 28.5484 3.375 26.6845 3.375H9.31445C7.45049 3.375 5.93945 4.88604 5.93945 6.75V29.2218C5.93945 31.6316 8.39227 33.265 10.6158 32.3359L18.0002 29.25Z"
                fill="white"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_50_18247"
              x="2.93945"
              y="1.375"
              width="30.1201"
              height="35.2253"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_50_18247"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_50_18247"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_50_18247">
              <rect width="36" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <div className="text-white text-[12px] leading-[18px]">SAVE</div>
    </button>
  );
}
