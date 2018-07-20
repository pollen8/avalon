
import { ThemedStyledProps } from 'styled-components';

export interface IThemeColors {
  background: string;
  danger: string;
  default: string;
  field: {
    background: string;
    disabledBackground: string;
    focus: string;
    focusBackground: string;
    onBackground: string;
    placeholder: string;
    onDisabledBackground: string;
    onFocusBackground: string;
    underBackground: string;
    underBackground100: string;
  };
  info: string;
  name: string;
  onBackground: string;
  onPanelBackground100?: string;
  onPanelBackground200?: string;
  onPanelBackground300?: string;
  panelBackground100?: string;
  panelBackground200?: string;
  panelBackground300?: string;
  primary: string;
  primary100: string;
  primaryVariant: string;
  secondary: string;
  success: string;
  success100: string;
  underBackground: string; // Background dropshadows
  underBackground100: string;
  underBackground200: string;
  warning: string;
}

export interface IPlatformThemeInterface {
  dark100?: IThemeColors;
  dark200?: IThemeColors;
  main?: IThemeColors;
}

const panels = {
  onPanelBackground100: '#0f2629',
  onPanelBackground200: '#a9a9a9',
  onPanelBackground300: '#888888',
  panelBackground100: '#fff',
  panelBackground200: '#d8d8d8',
  panelBackground300: '#cccccc',
};

export default {
  dark100: { // Blue bg
    background: '#284661',
    danger: '#d7263d',
    danger100: '#FBD7D9',
    default: '#00a97b',
    field: {
      background: '#fff',
      disabledBackground: '#dbdbdb',
      focus: '#00a5fd',
      focusBackground: '#00a5fd',
      onBackground: '#22545a',
      onDisabledBackground: '#888888',
      onFocusBackground: '#284661',
      placeholder: '#aaa',
      underBackground: '#ccc',
      underBackground100: '#f2f2f2',
    },
    info: '#56b4bf',
    info100: '#d4eef8',
    name: 'platform.dark100',
    onBackground: '#93A2B0',
    ...panels,
    primary: '#00a5fd',
    primary100: '#aee2fc',
    primaryVariant: '#dbf2ff',
    secondary: '#fff',
    success: '#00a97b',
    success100: '#dbf1d6',
    underBackground: '#333',
    underBackground100: '#222',
    underBackground200: '#111',
    warning: '#f9c80e',
  },
  dark200: { // Dark blue bg
    background: '#1c364f',
    danger: '#d7263d',
    default: '#00a97b',
    field: {
      background: '#fff',
      disabledBackground: '#dbdbdb',
      focus: '#00a5fd',
      focusBackground: '#00a5fd',
      onBackground: '#22545a',
      onDisabledBackground: '#888888',
      onFocusBackground: '#284661',
      placeholder: '#aaa',
      underBackground: '#cccccc',
      underBackground100: '#f2f2f2',
    },
    info: '#56b4bf',
    info100: '#d4eef8',
    name: 'platform.dark200',
    onBackground: '#93A2B0',
    ...panels,
    primary: '#00a5fd',
    primary100: '#aee2fc',
    primaryVariant: '#dbf2ff',
    secondary: '#fff',
    success: '#00a97b',
    success100: '#dbf1d6',
    underBackground: '#222',
    underBackground100: '#1f1f1f',
    underBackground200: '#111',
    warning: '#f9c80e',
  },
  main: {
    background: '#f2f2f2',
    danger: '#d7263d',
    default: '#00a97b',
    field: {
      background: 'transparent',
      disabledBackground: '#dbdbdb',
      focus: '#56b4bf',
      focusBackground: '#22545a',
      onBackground: '#22545a',
      onDisabledBackground: '#888888',
      onFocusBackground: '#fff',
      placeholder: '#aaa',
      underBackground: '#cccccc',
      underBackground100: '#f2f2f2',
    },
    info: '#56b4bf',
    info100: '#d4eef8',
    name: 'platform.main',
    onBackground: '#0f2629',
    underBackground100: '#a9a9a9',
    underBackground200: '#cccccc',
    ...panels,
    primary: '#00a5fd',
    primary100: '#aee2fc',
    primaryVariant: '#dbf2ff',
    secondary: '#a9a9a9',
    success: '#00a97b',
    success100: '#dbf1d6',
    underBackground: '#333',
    warning: '#f9c80e',
  },
} as IPlatformThemeInterface;

export type MyThemedProps<P> = ThemedStyledProps<P, IPlatformThemeInterface>;
