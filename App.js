import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const EXAMPLE_FIGMA = `// Paste Figma exports, JSON, CSS, and notes here
Frame: Landing Hero
- Size: 1440x900
- Background: #0F172A
- Card element with blur and scale on enter
- CTA button pulses every 2 seconds
`;

const buildClaudePrompt = ({ projectName, fps, duration, figmaPayload, styleGoals }) => {
  return `You are an expert motion engineer using Remotion.

Project: ${projectName || 'Untitled animation'}
Target FPS: ${fps}
Target Duration: ${duration} seconds

Creative goals:
${styleGoals || '- Smooth modern transitions\n- Clean typography\n- Natural easing'}

Figma source payload:
${figmaPayload}

Tasks:
1) Parse the design structure into reusable React components.
2) Generate a Remotion composition with timeline choreography.
3) Use spring() and interpolate() for premium motion.
4) Return production-ready code for:
   - src/Root.tsx
   - src/AnimationScene.tsx
   - src/theme.ts
5) Include rendering command and optimization tips.
6) Explain any assumptions where Figma data is incomplete.`;
};

const buildRemotionStarter = ({ projectName, fps, duration }) => {
  const totalFrames = Math.max(30, Number(fps) * Number(duration));

  return `// Generated starter for ${projectName || 'Untitled animation'}
import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const AnimationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const cardY = interpolate(frame, [0, 40], [80, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(\${cardY}px) scale(\${0.95 + titleIn * 0.05})`,
          color: 'white',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -1.5,
        }}
      >
        ${projectName || 'Your Animation'}
      </div>
    </AbsoluteFill>
  );
};

// Suggested Composition:
// <Composition
//   id="FigmaToMotion"
//   component={AnimationScene}
//   durationInFrames={${totalFrames}}
//   fps={${fps}}
//   width={1920}
//   height={1080}
// />`;
};

export default function App() {
  const [projectName, setProjectName] = useState('Figma Motion Concept');
  const [fps, setFps] = useState('30');
  const [duration, setDuration] = useState('8');
  const [styleGoals, setStyleGoals] = useState(
    '- Cinematic reveals\n- Soft spring transitions\n- Layered depth and parallax'
  );
  const [figmaPayload, setFigmaPayload] = useState(EXAMPLE_FIGMA);

  const claudePrompt = useMemo(
    () =>
      buildClaudePrompt({
        projectName,
        fps,
        duration,
        figmaPayload,
        styleGoals,
      }),
    [projectName, fps, duration, figmaPayload, styleGoals]
  );

  const remotionStarter = useMemo(
    () => buildRemotionStarter({ projectName, fps, duration }),
    [projectName, fps, duration]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Figma ➜ Remotion Animator</Text>
        <Text style={styles.subheading}>
          Paste your Figma export files, then copy the generated Claude Code prompt to produce a high-quality Remotion animation.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Project name</Text>
          <TextInput value={projectName} onChangeText={setProjectName} style={styles.input} />

          <View style={styles.row}>
            <View style={styles.rowField}>
              <Text style={styles.label}>FPS</Text>
              <TextInput value={fps} onChangeText={setFps} keyboardType="number-pad" style={styles.input} />
            </View>
            <View style={styles.rowField}>
              <Text style={styles.label}>Duration (seconds)</Text>
              <TextInput value={duration} onChangeText={setDuration} keyboardType="number-pad" style={styles.input} />
            </View>
          </View>

          <Text style={styles.label}>Style goals</Text>
          <TextInput
            value={styleGoals}
            onChangeText={setStyleGoals}
            multiline
            style={[styles.input, styles.multiInput]}
          />

          <Text style={styles.label}>Figma files / JSON / CSS paste area</Text>
          <TextInput
            value={figmaPayload}
            onChangeText={setFigmaPayload}
            multiline
            style={[styles.input, styles.bigInput]}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1) Claude Code prompt</Text>
          <Text style={styles.code}>{claudePrompt}</Text>
          <Pressable onPress={() => setFigmaPayload(EXAMPLE_FIGMA)} style={styles.button}>
            <Text style={styles.buttonText}>Reset sample payload</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2) Remotion starter output</Text>
          <Text style={styles.code}>{remotionStarter}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subheading: {
    color: '#334155',
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#0F172A',
  },
  multiInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  bigInput: {
    minHeight: 190,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowField: {
    flex: 1,
    gap: 6,
  },
  code: {
    backgroundColor: '#0F172A',
    color: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
  button: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
