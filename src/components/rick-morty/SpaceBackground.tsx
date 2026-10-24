export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="rv-space pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="rv-nebula rv-nebula-one" />
      <div className="rv-nebula rv-nebula-two" />

      <div className="rv-stars rv-stars-one" />
      <div className="rv-stars rv-stars-two" />

      <div className="rv-portal rv-portal-top">
        <div className="rv-portal-core" />
        <div className="rv-portal-ring" />
        <div className="rv-portal-ring rv-ring-inner" />
      </div>

      <div className="rv-portal rv-portal-left">
        <div className="rv-portal-core" />
        <div className="rv-portal-ring" />
        <div className="rv-portal-ring rv-ring-inner" />
      </div>

      <div className="rv-planet">
        <div className="rv-planet-ring" />
      </div>
    </div>
  );
}
