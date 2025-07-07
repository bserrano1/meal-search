/**
 * Button component
 * Renders a styled button or anchor element with theme-based variants.
 *
 * @author Brendon Serrano
 * @param {Object} props
 * @param {string} [props.variant] - Visual style variant (primary, accent, secondary)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.as] - Element type to render (e.g., 'a', 'button')
 * @param {string} [props.href] - Link URL if rendering as anchor
 * @param {Object} [props.otherProps] - Other props passed to the element
 */
const variantClasses = {
  primary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]",
  accent: "bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)]",
  secondary: "bg-[var(--color-secondary)] hover:bg-[var(--color-primary-dark)]",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  as,
  href,
  ...otherProps
}) {
  // Choose element type: 'a' for links, 'button' otherwise
  const Tag = as || (href ? "a" : "button");
  return (
    <Tag
      href={href}
      className={`px-3 py-1 rounded font-semibold text-sm text-white transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      {...otherProps}>
      {children}
    </Tag>
  );
}
