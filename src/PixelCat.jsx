import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from './theme';
import robot from '../assets/robot.png';

// Mascotte pixel art : chaque caractère = un pixel.
// . = vide  P = rose  D = rose foncé  K = noir  W = blanc  C = joues
const SPRITE = [
  '.PP......PP.',
  '.PDP....PDP.',
  '.PPPPPPPPPP.',
  'PPPPPPPPPPPP',
  'PPKKPPPPKKPP',
  'PPKWPPPPKWPP',
  'PCPPPDDPPPCP',
  'PPPPPDDPPPPP',
  '.PPPPPPPPPP.',
  '..PP....PP..',
];
const PALETTE = { P: '#F7B6CF', D: '#E0679A', K: '#141018', W: '#FFFFFF', C: '#FF8FB8' };

export function CatSprite({ pixel = 6 }) {
  return (
    <View>
      {SPRITE.map((row, y) => (
        <View key={y} style={{ flexDirection: 'row' }}>
          {row.split('').map((c, x) => (
            <View key={x} style={{ width: pixel, height: pixel, backgroundColor: PALETTE[c] || 'transparent' }} />
          ))}
        </View>
      ))}
    </View>
  );
}

/**
 * Le chat descend le long du bord droit au rythme du scroll
 * et annonce la section courante dans une bulle.
 */
export default function ScrollCat({ scrollY, contentHeight, viewportHeight, label, onPress }) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: -6, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(bob, { toValue: 0, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ])
    ).start();
  }, [bob]);

  const maxScroll = Math.max(1, contentHeight - viewportHeight);
  const top = 90;
  const bottom = Math.max(top + 1, viewportHeight - 130);

  const translateY = scrollY.interpolate({
    inputRange: [0, maxScroll],
    outputRange: [top, bottom],
    extrapolate: 'clamp',
  });
  // petit balancement en fonction du scroll, comme s'il marchait
  const rotate = scrollY.interpolate({
    inputRange: [0, 40, 80],
    outputRange: ['-6deg', '6deg', '-6deg'],
    extrapolate: 'extend',
  });

  return (
    <Animated.View pointerEvents="box-none" style={[styles.wrap, { transform: [{ translateY }] }]}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{label}</Text>
      </View>
      <Pressable onPress={onPress} accessibilityLabel="Remonter en haut">
        <Animated.View style={{ transform: [{ translateY: bob }, { rotate }] }}>
          <Image source={{ uri: robot }} style={styles.robot} resizeMode="contain" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', right: 28, top: 0, alignItems: 'flex-end', zIndex: 50 },
  bubble: {
    backgroundColor: COLORS.panel,
    borderColor: COLORS.cyan,
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
    borderRadius: 6,
  },
  robot: { width: 120, height: 116 },
  bubbleText: { color: COLORS.cyan, fontFamily: FONTS.pixel, fontSize: 9 },
});
