import PropTypes from 'prop-types';
import { Text } from 'react-native';
import tw from '../tailwind';


const variants = {
  display: tw.style("text-display font-semibold leading-[92px]", {
    fontFamily: "semibold_sofia",
  }),
  header: tw.style("text-header font-semibold leading-[32px]", {
    fontFamily: "semibold_sofia",
  }),
  title: tw.style("text-title font-semibold leading-[28px]", {
    fontFamily: "semibold_sofia",
  }),
  body: tw.style("text-body leading-[20px] font-normal", {
    fontFamily: "regular_sofia",
  }),
  body2: tw.style("text-body2 leading-[22px] font-normal", {
    fontFamily: "regular_sofia",
  }),
  caption: tw.style("text-caption font-semibold leading-[16px]", {
    fontFamily: "semibold_sofia",
  }),
};

const colors = {
  black: tw`text-black`,
  white: tw`text-white`
};

/**
 * The `Typography` component is a React component that renders a `Text` component from the `react-native` library.
 * It allows for customizing the typography style, color, and additional styles through props.
 *
 * @param {Object} props - The component props.
 * @param {string} props.variant - The typography variant. Can be one of "display", "header", "title", "body", or "caption".
 * @param {string} props.color - The color of the text. Can be one of "white", "black", or a custom color value.
 * @param {Object} props.style - Additional custom styles to be applied to the text.
 * @param {ReactNode} props.children - The content of the `Text` component.
 * @returns {ReactElement} The rendered `Text` component.
 */
const Typography = ({ variant = "body", color = "black", style, children }) => {
  const colorStyles = Object.keys(colors).includes(color) ? colors[color] : tw`text-[${color}]`;
  const styles = [variants[variant], colorStyles, style];

  return <Text style={styles}>{children}</Text>;
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "display",
    "header",
    "title",
    "body",
    "body2",
    "caption",
  ]),
  color: PropTypes.oneOf(["white", "black", PropTypes.string]),
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};

Typography.defaultProps = {
  variant: "body",
  color: "black",
};

export default Typography;