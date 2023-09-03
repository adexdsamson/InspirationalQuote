import tw from "../tailwind";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Typography from "./Typography";

/**
 * Renders a tag with a given name.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the tag to be displayed.
 * @returns {JSX.Element} The rendered tag UI.
 */
const Tag = ({ name }) => {
  return (
    <View
      style={tw`px-2 h-7 justify-center items-center bg-secondary rounded mr-2 shadow-md`}
    >
      <Typography variant="caption" style={tw`text-white `}>
        {name}
      </Typography>
    </View>
  );
};

Tag.defaultProps = {
  name: "hello"
}

Tag.propTypes = {
  name: PropTypes.string.isRequired
}

export default Tag;
