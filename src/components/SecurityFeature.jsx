
// This reusable component displays a single security feature (icon + title + short description) on the authentication page it helps avoid repeating the same layout for each feature.

export default function SecurityFeature({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconBg}`}
      >
        <span className={`material-icons text-[22px] ${iconColor}`}>
          {icon}
        </span>
      </div>
      <div>
        <div className="text-[15px] font-semibold text-slate-900 mb-0.5">
          {title}
        </div>
        <div className="text-[13px] text-slate-600 max-w-sm">
          {description}
        </div>
      </div>
    </div>
  );
}
