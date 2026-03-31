import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
      <DotLottieReact
        src="/Loading Lottie animation.lottie"
        loop
        autoplay
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
}
