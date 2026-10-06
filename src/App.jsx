import React, { useRef, useState } from 'react';
import {
  Animated, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { PROFILE, LINKS, VIDEO, SKILLS, PROJECTS } from './data';
import { COLORS, FONTS, glow, textGlow, loadWebFonts } from './theme';
import ScrollCat from './PixelCat';
import VideoPlayer from './VideoPlayer';
import workstation from '../assets/workstation.png';

loadWebFonts();

const SECTIONS = [
  { key: 'hero', label: 'Coucou !' },
  { key: 'about', label: 'Présentation' },
  { key: 'skills', label: 'Compétences' },
  { key: 'video', label: 'Projet 3D' },
  { key: 'projects', label: 'Projets' },
  { key: 'contact', label: 'Contact' },
];

export default function App() {
  const { width, height } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const sectionY = useRef({});
  const [contentH, setContentH] = useState(1);
  const [viewportH, setViewportH] = useState(height);
  const [current, setCurrent] = useState(SECTIONS[0].label);

  const narrow = width < 640;
  const pad = narrow ? 16 : 32;

  // Détermine la section visible pour la bulle du chat
  const onScrollJS = (e) => {
    const value = e.nativeEvent.contentOffset.y;
    let label = SECTIONS[0].label;
    for (const s of SECTIONS) {
      const y = sectionY.current[s.key];
      if (y !== undefined && value + viewportH * 0.4 >= y) label = s.label;
    }
    setCurrent((prev) => (prev === label ? prev : label));
  };

  const goTo = (key) => {
    const y = sectionY.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
  };
  const track = (key) => (e) => { sectionY.current[key] = e.nativeEvent.layout.y; };

  return (
    <SafeAreaView style={styles.root}>
      <View style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]} pointerEvents="none">
        <GridBackground />
      </View>

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false, listener: onScrollJS })}
        onContentSizeChange={(_, h) => setContentH(h)}
        onLayout={(e) => setViewportH(e.nativeEvent.layout.height)}
        contentContainerStyle={[styles.content, { paddingHorizontal: pad, paddingRight: pad + (narrow ? 44 : 56) }]}
      >
        {/* ───── HERO ───── */}
        <View onLayout={track('hero')} style={[styles.hero, narrow && { flexDirection: 'column', alignItems: 'flex-start' }]}>
          <Image source={{ uri: workstation }} style={[styles.avatar, narrow && m.avatar]} resizeMode="contain" />
          <View style={[styles.statusBox, glow(COLORS.pink), { flex: narrow ? undefined : 1, alignSelf: narrow ? 'stretch' : 'center' }]}>
            <View style={styles.statusInner}>
              <View style={styles.statusRow}>
                <View style={styles.dot} />
                <Text style={styles.statusTitle}>STATUS</Text>
              </View>
              <Text style={styles.statusText}>{PROFILE.status}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.titleBlock, narrow && { marginTop: 40 }]}>
          <Text style={[styles.firstName, textGlow(COLORS.cyan), narrow && m.firstName]}>{PROFILE.firstName.toUpperCase()}</Text>
          <Text style={[styles.lastName, textGlow(COLORS.pink), narrow && m.lastName]}>{PROFILE.lastName.toUpperCase()}</Text>
          <Text style={[styles.role, narrow && m.role]}>{PROFILE.role}</Text>
          <NeonButton label="VOIR LES PROJETS ↓" onPress={() => goTo('projects')} small={narrow} />
        </View>

        {/* ───── NAV « écrans » ───── */}
        <View style={[styles.monitors, narrow && m.monitors]}>
          {[['about', 'À PROPOS'], ['skills', 'COMPÉTENCES'], ['contact', 'CONTACT']].map(([k, l]) => (
            <Monitor key={k} label={l} onPress={() => goTo(k)} narrow={narrow} />
          ))}
        </View>

        {/* ───── PRÉSENTATION ───── */}
        <Section narrow={narrow} onLayout={track('about')} kicker="01" title="Présentation">
          <Panel>
            <Text style={[styles.body, narrow && m.body]}>{PROFILE.about}</Text>
          </Panel>
        </Section>

        {/* ───── COMPÉTENCES ───── */}
        <Section narrow={narrow} onLayout={track('skills')} kicker="02" title="Compétences">
          <View style={[styles.cols, narrow && { flexDirection: 'column' }]}>
            {SKILLS.map((g) => (
              <Panel key={g.group} style={{ flex: 1 }}>
                <Text style={styles.groupTitle}>{g.group}</Text>
                {g.items.map(([name, lvl]) => (
                  <View key={name} style={{ marginBottom: 12 }}>
                    <View style={styles.skillRow}>
                      <Text style={styles.skillName}>{name}</Text>
                      <Text style={styles.skillLvl}>{lvl}%</Text>
                    </View>
                    <View style={styles.barBg}>
                      <View style={[styles.barFill, { width: `${lvl}%` }]} />
                    </View>
                  </View>
                ))}
              </Panel>
            ))}
          </View>
        </Section>

        {/* ───── VIDÉO 3D ───── */}
        <Section narrow={narrow} onLayout={track('video')} kicker="03" title={VIDEO.title}>
          <View style={[styles.chatFrame, glow(COLORS.pink)]}>
            <View style={[styles.chatHeader, narrow && { padding: 14 }]}>
              <Text style={[styles.chatTitle, narrow && { fontSize: 15 }]}>CHAÎNE YOUTUBE</Text>
              <Text style={styles.online}>● EN LIGNE</Text>
            </View>
            <View style={styles.video}>
              <VideoPlayer youtubeId={VIDEO.youtubeId} />
            </View>
            <View style={{ padding: narrow ? 14 : 16 }}>
              <Text style={[styles.body, narrow && m.body]}>{VIDEO.description}</Text>
              <View style={styles.tags}>
                {VIDEO.tools.map((t) => <Tag key={t} label={t} />)}
              </View>
              <NeonButton label="VOIR LA CHAÎNE →" onPress={() => Linking.openURL(LINKS.youtube)} small />
            </View>
          </View>
        </Section>

        {/* ───── PROJETS ───── */}
        <Section narrow={narrow} onLayout={track('projects')} kicker="04" title="Projets">
          <View style={[styles.cols, narrow && { flexDirection: 'column' }]}>
            {PROJECTS.map((p) => (
              <Panel key={p.title} style={{ flex: 1 }}>
                <Tag label={p.tag} />
                <Text style={[styles.groupTitle, { marginTop: 10 }]}>{p.title}</Text>
                <Text style={[styles.body, narrow && m.body]}>{p.text}</Text>
              </Panel>
            ))}
          </View>
        </Section>

        {/* ───── CONTACT ───── */}
        <Section narrow={narrow} onLayout={track('contact')} kicker="05" title="Me retrouver">
          <View style={[styles.cols, narrow && { flexDirection: 'column' }]}>
            <LinkCard narrow={narrow} label="GITHUB" sub="Mon code" url={LINKS.github} color={COLORS.cyan} />
            <LinkCard narrow={narrow} label="LINKEDIN" sub="Mon parcours" url={LINKS.linkedin} color={COLORS.pink} />
            <LinkCard narrow={narrow} label="YOUTUBE" sub="Mes projets 3D" url={LINKS.youtube} color={COLORS.pinkSoft} />
          </View>
        </Section>

        <Text style={styles.footer}>© {new Date().getFullYear()} {PROFILE.firstName} {PROFILE.lastName} · fait avec React Native</Text>
      </Animated.ScrollView>

      <ScrollCat
        scrollY={scrollY}
        contentHeight={contentH}
        viewportHeight={viewportH}
        label={current}
        compact={narrow}
        onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
      />
    </SafeAreaView>
  );
}

/* ───────── Composants ───────── */

function GridBackground() {
  const lines = Array.from({ length: 40 });
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {lines.map((_, i) => (
        <View key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: i * 48, height: 1, backgroundColor: COLORS.grid }} />
      ))}
      {lines.map((_, i) => (
        <View key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: i * 48, width: 1, backgroundColor: COLORS.grid }} />
      ))}
    </View>
  );
}

function Section({ kicker, title, children, onLayout, narrow }) {
  return (
    <View onLayout={onLayout} style={{ marginTop: narrow ? 48 : 72 }}>
      <Text style={styles.kicker}>// {kicker}</Text>
      <Text style={[styles.sectionTitle, textGlow(COLORS.pink), narrow && m.sectionTitle]}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
}

function Panel({ children, style }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

function Tag({ label }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

function NeonButton({ label, onPress, small }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed, hovered }) => [
        styles.btn, glow(COLORS.pink), small && { marginTop: 16, paddingVertical: 12 },
        (pressed || hovered) && { backgroundColor: 'rgba(240,107,174,0.18)' },
      ]}
    >
      <Text style={[styles.btnText, small && { fontSize: 14 }]}>{label}</Text>
    </Pressable>
  );
}

function Monitor({ label, onPress, narrow }) {
  return (
    <Pressable onPress={onPress} style={{ alignItems: 'center', flex: narrow ? undefined : 1 }}>
      {({ pressed, hovered }) => (
        <>
          <View style={[styles.screen, glow(COLORS.pink), narrow && m.screen, (pressed || hovered) && { backgroundColor: '#2A1424' }]}>
            {Array.from({ length: 14 }).map((_, i) => (
              <View key={i} style={[styles.scanline, { top: i * 7 }]} />
            ))}
            <Text style={[styles.screenText, textGlow(COLORS.pink)]}>{label}</Text>
          </View>
          <View style={styles.neck} />
          <View style={styles.foot} />
        </>
      )}
    </Pressable>
  );
}

function LinkCard({ label, sub, url, color, narrow }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={({ hovered, pressed }) => [
        styles.panel, { flex: 1, borderColor: color }, glow(color),
        (hovered || pressed) && { transform: [{ translateY: -3 }] },
      ]}
    >
      <Text style={[styles.linkLabel, { color }, textGlow(color), narrow && { fontSize: 16 }]}>{label} ↗</Text>
      <Text style={styles.muted}>{sub}</Text>
    </Pressable>
  );
}

/* ───────── Styles ───────── */

const styles = StyleSheet.create({
  root: { flex: 1, width: '100%', backgroundColor: COLORS.bg, overflow: 'hidden' },
  content: { paddingTop: 32, paddingBottom: 80, maxWidth: 1100, width: '100%', alignSelf: 'center' },

  hero: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  avatar: { width: 300, maxWidth: '100%', aspectRatio: 754 / 331 },

  statusBox: { justifyContent: 'center', borderWidth: 2.5, borderColor: COLORS.pink, padding: 10, backgroundColor: COLORS.bg2 },
  statusInner: { borderWidth: 1.5, borderColor: '#3A4458', backgroundColor: COLORS.panel, padding: 14 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  dot: { width: 10, height: 10, backgroundColor: '#5BE36B' },
  statusTitle: { fontFamily: FONTS.pixel, color: COLORS.text, fontSize: 11 },
  statusText: { fontFamily: FONTS.pixel, color: COLORS.pinkSoft, fontSize: 11, lineHeight: 20 },

  titleBlock: { marginTop: 56, alignItems: 'center' },
  firstName: { fontFamily: FONTS.display, fontWeight: '800', fontSize: 44, color: COLORS.cyan, letterSpacing: 6 },
  lastName: { fontFamily: FONTS.display, fontWeight: '800', fontSize: 64, color: COLORS.pink, letterSpacing: 2, textAlign: 'center' },
  role: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 16, marginTop: 8, marginBottom: 28 },

  btn: { borderWidth: 2.5, borderColor: COLORS.pink, paddingVertical: 18, paddingHorizontal: 28, backgroundColor: 'rgba(30,21,40,0.85)', alignSelf: 'center' },
  btnText: { fontFamily: FONTS.display, color: COLORS.pink, fontSize: 18, letterSpacing: 4 },

  monitors: { flexDirection: 'row', gap: 28, marginTop: 72 },
  screen: {
    width: '100%', maxWidth: 300, height: 100, borderRadius: 14, borderWidth: 3, borderColor: COLORS.pink,
    backgroundColor: '#0D0A10', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  scanline: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.04)' },
  screenText: { fontFamily: FONTS.display, color: COLORS.pink, fontSize: 16, letterSpacing: 4 },
  neck: { width: 60, height: 14, backgroundColor: COLORS.pink, transform: [{ skewX: '-20deg' }] },
  foot: { width: 120, height: 6, backgroundColor: '#D9559A', borderRadius: 2 },

  kicker: { fontFamily: FONTS.pixel, color: COLORS.cyan, fontSize: 10, marginBottom: 10 },
  sectionTitle: { fontFamily: FONTS.display, fontWeight: '800', color: COLORS.pink, fontSize: 30, letterSpacing: 3, marginBottom: 22 },

  panel: { borderWidth: 1.5, borderColor: 'rgba(240,107,174,0.45)', backgroundColor: 'rgba(28,34,48,0.85)', borderRadius: 14, padding: 20 },
  body: { fontFamily: FONTS.body, color: COLORS.text, fontSize: 16, lineHeight: 25 },
  muted: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 14, marginTop: 6 },

  cols: { flexDirection: 'row', gap: 18 },
  groupTitle: { fontFamily: FONTS.display, color: COLORS.cyan, fontSize: 15, letterSpacing: 2, marginBottom: 16 },
  skillRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  skillName: { fontFamily: FONTS.body, color: COLORS.text, fontSize: 14 },
  skillLvl: { fontFamily: FONTS.pixel, color: COLORS.pinkSoft, fontSize: 9 },
  barBg: { height: 8, backgroundColor: '#2A2236', borderRadius: 2, overflow: 'hidden' },
  barFill: { height: 8, backgroundColor: COLORS.pink },

  chatFrame: { borderWidth: 3, borderColor: COLORS.pink, borderRadius: 22, backgroundColor: COLORS.panel, overflow: 'hidden' },
  chatHeader: { padding: 18, borderBottomWidth: 2, borderBottomColor: COLORS.pink },
  chatTitle: { fontFamily: FONTS.display, color: COLORS.cyan, fontSize: 20, letterSpacing: 3 },
  online: { fontFamily: FONTS.display, color: '#3FA3AE', fontSize: 13, marginTop: 4, letterSpacing: 2 },
  video: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  tag: { alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.cyan, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontFamily: FONTS.body, color: COLORS.cyan, fontSize: 12 },

  linkLabel: { fontFamily: FONTS.display, fontSize: 20, letterSpacing: 3 },
  footer: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 12, textAlign: 'center', marginTop: 72 },
});

// Ajustements mobile (largeur < 640) : appliqués par-dessus les styles PC, qui restent inchangés.
const m = StyleSheet.create({
  avatar: { width: '100%', maxWidth: 340, alignSelf: 'center' },
  firstName: { fontSize: 26, letterSpacing: 3, textAlign: 'center' },
  lastName: { fontSize: 32, letterSpacing: 1 },
  role: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  monitors: { flexDirection: 'column', gap: 18, marginTop: 48 },
  screen: { width: '100%', height: 80 },
  sectionTitle: { fontSize: 22, letterSpacing: 2, marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 23 },
});
