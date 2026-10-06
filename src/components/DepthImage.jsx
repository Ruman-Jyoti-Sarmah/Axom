/**
 * Static image frame — renders the same markup the layouts expect
 * (wrapper + img) without parallax or pointer drift.
 */
export default function DepthImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  ...rest
}) {
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...rest}
      />
    </div>
  );
}
