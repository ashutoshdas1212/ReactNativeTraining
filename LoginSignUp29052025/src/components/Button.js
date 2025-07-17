import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../Constants';
import {fontSize} from '../../constants/dimensions';

const Button = ({
  title,
  onPress,
  color = 'orange',
  size = 'medium',
  width = 'auto',
  disabled = false,
}) => {
  const bgColor = color === 'orange' ? colors.orange : colors.darkGreen;

  const padding = size === 'small' ? 10 : size === 'large' ? 16 : 12;
  const textSize =
    size === 'small'
      ? fontSize.sm
      : size === 'large'
      ? fontSize.lg
      : fontSize.md;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          padding: padding,
          width: width === 'full' ? '100%' : undefined,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.text, {fontSize: textSize}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Button;
