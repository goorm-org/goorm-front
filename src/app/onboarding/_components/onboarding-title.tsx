interface OnboardingTitleProps {
  title: string;
  description: string;
}

export default function OnboardingTitle({
  title,
  description,
}: OnboardingTitleProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="leading-[36px] text-[24px] tracking-[-0.3px] font-bold flex flex-col gap-[8px] whitespace-pre-line">
        {title}
      </div>
      <div className="text-[#9CA3AF] font-[16px] tracking-[-0.1px]">
        {description}
      </div>
    </div>
  );
}
